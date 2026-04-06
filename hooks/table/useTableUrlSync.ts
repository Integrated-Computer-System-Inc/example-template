import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ItemFilterValues } from '@/app/crud/components/ItemFilterPopover';

interface PaginationState {
    current: number;
    pageSize: number;
}

/**
 * Hook to synchronize table filters, search, and pagination with the URL query parameters.
 * Manages all table state and provides simple interface for components.
 */
export const useTableUrlSync = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. Initialize states from URL
    const [activeFilters, setActiveFilters] = useState<ItemFilterValues>(() => {
        const statusVal = searchParams.get('status');
        return {
            category: searchParams.get('category'),
            status: statusVal === 'true' ? true : statusVal === 'false' ? false : null,
        };
    });

    const [pagination, setPagination] = useState<PaginationState>(() => ({
        current: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('pageSize')) || 10,
    }));

    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
    const [appliedSearch, setAppliedSearch] = useState(searchParams.get('search') || '');

    // 2. Sync State -> URL
    useEffect(() => {
        const params = new URLSearchParams();

        if (activeFilters.category) params.set('category', activeFilters.category);
        if (activeFilters.status !== null) params.set('status', String(activeFilters.status));
        if (appliedSearch) params.set('search', appliedSearch);
        if (pagination.current > 1) params.set('page', String(pagination.current));
        if (pagination.pageSize !== 10) params.set('pageSize', String(pagination.pageSize));

        const query = params.toString();
        const url = `${pathname}${query ? `?${query}` : ''}`;

        // Use replace to avoid polluting history with every filter change
        router.replace(url, { scroll: false });
    }, [activeFilters, appliedSearch, pagination, pathname, router]);

    const handleReset = () => {
        setSearchValue('');
        setAppliedSearch('');
        setActiveFilters({ category: null, status: null });
        setPagination({ current: 1, pageSize: 10 });
    };

    const handleSearchChange = (val: string) => {
        setSearchValue(val);
        if (val === '') {
            setAppliedSearch('');
            setPagination(prev => ({ ...prev, current: 1 }));
        }
    };

    const handleSearchApply = () => {
        setAppliedSearch(searchValue);
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleFilterApply = (values: ItemFilterValues) => {
        setActiveFilters(values);
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleTableChange = (newPagination: Partial<PaginationState>) => {
        setPagination(prev => ({
            current: newPagination.current ?? prev.current,
            pageSize: newPagination.pageSize ?? prev.pageSize,
        }));
    };

    return {
        activeFilters,
        appliedSearch,
        pagination,
        searchValue,
        handleReset,
        handleSearchChange,
        handleSearchApply,
        handleFilterApply,
        handleTableChange,
        setSearchValue,
    };
};

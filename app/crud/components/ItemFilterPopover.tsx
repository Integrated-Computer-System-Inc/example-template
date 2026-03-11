'use client';

import React, { useState, useEffect } from 'react';
import { Popover, Button, Select } from 'antd';
import { Filter } from 'lucide-react';

export interface ItemFilterValues {
    category: string | null;
    status: boolean | null;
}

export interface ItemFilterPopoverProps {
    currentFilters: ItemFilterValues;
    onApply: (filters: ItemFilterValues) => void;
}

const categoryOptions = [
    { label: 'General', value: 'General' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Operations', value: 'Operations' },
];

export default function ItemFilterPopover({ currentFilters, onApply }: ItemFilterPopoverProps) {
    const [filters, setFilters] = useState<ItemFilterValues>(currentFilters);
    useEffect(() => {
        setFilters(currentFilters);
    }, [currentFilters]);

    const handleResetAll = () => {
        const resetValues: ItemFilterValues = {
            category: null,
            status: null,
        };
        setFilters(resetValues);
        onApply(resetValues);
    };

    const handleApply = () => {
        onApply(filters);
    };

    const filterContent = (
        <div className="w-[320px] p-2">
            <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-text">Filter</span>
            </div>

            {/* Category */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text">Category</span>
                    <button
                        onClick={() => setFilters({ ...filters, category: null })}
                        className="text-text-info text-xs font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <Select
                    className="w-full"
                    placeholder="Select category"
                    value={filters.category}
                    onChange={(val) => setFilters({ ...filters, category: val })}
                    options={categoryOptions}
                    allowClear
                />
            </div>

            {/* Status */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-text">Status</span>
                    <button
                        onClick={() => setFilters({ ...filters, status: null })}
                        className="text-text-info text-xs font-medium hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <Select
                    className="w-full"
                    placeholder="Select status"
                    value={filters.status}
                    onChange={(val) => setFilters({ ...filters, status: val })}
                    options={[
                        { label: 'Active', value: true },
                        { label: 'Inactive', value: false },
                    ]}
                    allowClear
                />
            </div>

            <div className="flex items-center gap-3">
                <Button
                    className="flex-1 rounded-lg h-10 border-border font-bold text-text-info"
                    onClick={handleResetAll}
                >
                    Reset all
                </Button>
                <Button
                    type="primary"
                    className="flex-1 rounded-lg h-10 bg-primary border-none font-bold"
                    onClick={handleApply}
                >
                    Apply now
                </Button>
            </div>
        </div>
    );

    const activeCount = [
        currentFilters.category,
        currentFilters.status !== null ? true : null
    ].filter(Boolean).length;

    return (
        <Popover
            content={filterContent}
            trigger="click"
            placement="bottomRight"
        >
            <Button
                icon={<Filter size={18} />}
                className="rounded-lg h-10 flex items-center gap-2 border-border font-medium text-text-info hover:text-primary hover:border-primary"
            >
                <span>Filters</span>
                {activeCount > 0 && (
                    <span className="flex items-center justify-center bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full -mr-1">
                        {activeCount}
                    </span>
                )}
            </Button>
        </Popover>
    );
}

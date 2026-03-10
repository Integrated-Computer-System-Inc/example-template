import { Suspense } from 'react';
import ItemTable from './components/ItemTable';

export default function CRUDPage() {
    return (
        <div className="max-w-full mx-auto">
            <div className="mb-8">
                <h1 className="text-xl font-bold text-foreground tracking-tight">CRUD</h1>
                <p className="text-foreground/60 mt-1 text-base">
                    Manage CRUD items here.
                </p>
            </div>

            <Suspense fallback={<div>Loading user data...</div>}>
                <ItemTable />
            </Suspense>
        </div>


    );
}

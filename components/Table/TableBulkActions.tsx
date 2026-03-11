'use client';

import React from 'react';
import { XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BulkAction {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
}

interface TableBulkActionsProps {
    selectedCount: number;
    actions: BulkAction[];
    onClearSelection: () => void;
    /** Optional custom label for the "selected" text */
    selectionLabel?: string;
}

const variantStyles = {
    success: 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20',
    danger: 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20',
    warning: 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20',
    info: 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20',
    neutral: 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50',
};

/**
 * A highly reusable floating action bar for bulk operations.
 * Pass an array of actions to dynamically render buttons with custom logic and styling.
 */
export default function TableBulkActions({
    selectedCount,
    actions,
    onClearSelection,
    selectionLabel = 'selected',
}: TableBulkActionsProps) {
    return (
        <AnimatePresence>
            {selectedCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 50, x: '-50%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-8 left-1/2 z-50 pointer-events-none"
                >
                    <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200 dark:border-zinc-800 shadow-2xl rounded-2xl px-6 py-3 flex items-center gap-4 transition-all duration-300 pointer-events-auto">
                        {/* Status Section */}
                        <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-zinc-800">
                            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm">
                                {selectedCount}
                            </span>
                            <span className="text-gray-600 dark:text-zinc-400 font-semibold text-sm whitespace-nowrap">
                                {selectionLabel}
                            </span>
                        </div>

                        {/* Dynamic Actions Section */}
                        <div className="flex items-center gap-1">
                            {actions.map((action, index) => (
                                <button
                                    key={`${action.label}-${index}`}
                                    onClick={action.onClick}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full transition-all font-bold text-sm group cursor-pointer",
                                        action.variant ? variantStyles[action.variant] : variantStyles.neutral,
                                        action.className
                                    )}
                                >
                                    <span className="transition-transform group-hover:scale-110">
                                        {action.icon}
                                    </span>
                                    <span>{action.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Close/Clear Button */}
                        <button
                            onClick={onClearSelection}
                            className="text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-all hover:scale-110 active:scale-95 ml-2 cursor-pointer"
                            title="Clear selection"
                        >
                            <XCircle size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

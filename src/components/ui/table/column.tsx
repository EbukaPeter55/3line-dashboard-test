'use client';

import {ColumnDef} from '@tanstack/react-table';
import {Badge} from '../badge';
import {ArrowUpDown} from 'lucide-react';
import {RoleTableData} from "@/components/ui/table/table-types";

const statusCell =
    <T extends { status: string }>() =>
        ({row}: { row: { getValue: (k: string) => string } }) => {
            const status = row.getValue('status') as string;
            const colors: Record<string, string> = {
                Active: 'bg-green-100 text-green-700',
                'In Active': 'bg-[#F2994A] text-white',
            };
            return (
                <Badge className={`${colors[status] || ''}`}>
                    {status}
                </Badge>
            );
        };

/* ───── Columns for the Role Users Table ───── */
export const roleColumns: ColumnDef<RoleTableData, unknown>[] = [
    {
        accessorKey: 'name',
        header: ({column}) => (
            <div className="flex items-center gap-1 cursor-pointer select-none"
                 onClick={column.getToggleSortingHandler()}>
                Name
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </div>
        ),
        cell: ({row}) => (
            <div className="text-left">
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: 'dateCreated',
        header: 'Date created',
        cell: ({row}) => (
            <div className="text-left">
                {row.original.dateCreated}
            </div>
        ),
    },
];

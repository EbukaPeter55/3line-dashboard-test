'use client';

import {ColumnDef} from '@tanstack/react-table';
import {Badge} from '../badge';
import {RoleTableData, UserAvatar} from "@/app/dashboard/shared/dashboard-types";
import {ArrowUpDown} from 'lucide-react';

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
        accessorKey: 'type',
        header: 'Type',
        cell: ({row}) => (
            <div className="text-left">
                {row.original.type}
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
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({row}) => (
            <div className="text-left">
                {statusCell<RoleTableData>()({row})}
            </div>
        ),
    },
    {
        accessorKey: 'roleUsers',
        header: 'Role users',
        cell: ({row}) => {
            const users = row.original.roleUsers as UserAvatar[];
            const displayedUsers = users.slice(0, 3);
            const remainingUsersCount = users.length - displayedUsers.length;

            return (
                <div className="flex items-center -space-x-2 overflow-hidden">
                    {displayedUsers.map((user, index) => (
                        <img
                            key={user.id}
                            src={user.avatarUrl}
                            alt={`User ${index + 1}`}
                            className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white"
                            style={{zIndex: users.length - index}}
                        />
                    ))}
                    {remainingUsersCount > 0 && (
                        <span
                            className="relative inline-block h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium ring-2 ring-white">
                            +{remainingUsersCount}
                        </span>
                    )}
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: '',
        cell: () => (
            <div className="flex justify-end pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-download text-gray-500 cursor-pointer hover:text-gray-700">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
            </div>
        ),
    },
];

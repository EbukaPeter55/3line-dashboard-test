'use client';

import {
    flexRender,
    getCoreRowModel,
    ColumnDef,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    SortingState,
    RowSelectionState,
} from '@tanstack/react-table';
import {useState, useMemo, useEffect, useRef} from 'react';
import {Button} from '../button';
import {ArrowUpDown} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../select';
import {Checkbox} from '../checkbox';
import {cn} from "@/lib/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination?: boolean;
    hasTableTitle?: boolean;
    tableTitle?: string;
    emptyTitle?: string;
    showUpAndDownArrows?: boolean;
    emptyDescription?: string;
    onRowClick?: (row: TData) => void;
    enableRowSelection?: boolean;
    onRowSelectionChange?: (selectedRows: TData[]) => void;
}

export function DataTable<TData extends object, TValue>({
                                                            columns,
                                                            data,
                                                            hasTableTitle,
                                                            tableTitle,
                                                            pagination = true,
                                                            emptyTitle,
                                                            emptyDescription,
                                                            showUpAndDownArrows,
                                                            enableRowSelection = false,
                                                            onRowSelectionChange,
                                                        }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const prevSelectedRef = useRef<any[]>([]);

    const allColumns = useMemo(() => {
        if (!enableRowSelection) {
            return columns;
        }

        return [
            {
                id: 'select',
                header: ({table}) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected()
                                ? true
                                : table.getIsSomePageRowsSelected()
                                    ? 'indeterminate'
                                    : false
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            ...columns,
        ];
    }, [columns, enableRowSelection]);

    const table = useReactTable({
        data,
        columns: allColumns,
        state: {
            sorting,
            rowSelection,
        },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        enableRowSelection: enableRowSelection,
    });

    useEffect(() => {
        const selectedRowsData = table.getSelectedRowModel().flatRows.map(row => row.original);
        const isSame =
            selectedRowsData.length === prevSelectedRef.current.length &&
            selectedRowsData.every((row, idx) => row === prevSelectedRef.current[idx]);

        if (!isSame) {
            prevSelectedRef.current = selectedRowsData;

            if (onRowSelectionChange) {
                onRowSelectionChange(selectedRowsData);
            }
        }
    }, [rowSelection, table, onRowSelectionChange]);

    return (
        <div className="border rounded-xl overflow-hidden bg-white">
            <div className="flex flex-wrap gap-2 items-center justify-between px-4 py-3 border-b bg-muted/20">
                {hasTableTitle ? (
                    <h4 className="text-[1rem] font-semibold text-[var(--primary-text)]">
                        {tableTitle}
                    </h4>
                ) : null}
                {enableRowSelection && table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                )}
            </div>

            {data.length ? (
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/40">
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id} className="border-b">
                                {hg.headers.map((header) => (
                                    <th key={header.id}
                                        className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={cn(
                                                    'flex items-center gap-1',
                                                    header.column.getCanSort() && 'cursor-pointer select-none',
                                                )}
                                                onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && showUpAndDownArrows && (
                                                    <ArrowUpDown
                                                        className="w-4 h-4 text-muted-foreground"/>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>

                        <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}
                                className="h-14 border-b hover:bg-muted/10 cursor-pointer">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}
                                        className="px-4 py-4 whitespace-nowrap text-gray-800">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div
                    className="py-20 text-center space-y-2 bg-white">
                    <img src="/assets/dashboard/empty-icon.png" alt="" width={40} height={40}
                         className="opacity-60 mx-auto"/>
                    <h3 className="font-semibold text-gray-800">{emptyTitle || 'No Data'}</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        {emptyDescription || 'Nothing has been added yet.'}
                    </p>
                </div>
            )}

            {pagination && (
                <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 gap-4 bg-muted/20">
                    <div
                        className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Show:</span>
                        <Select
                            value={table.getState().pagination.pageSize.toString()}
                            onValueChange={(v) => table.setPageSize(Number(v))}
                        >
                            <SelectTrigger
                                className="w-[90px] h-8 bg-white border-gray-600 text-gray-200">
                                <SelectValue placeholder="Items"/>
                            </SelectTrigger>
                            <SelectContent
                                className="bg-white border-gray-600 text-gray-200">
                                {[5, 10, 20, 50].map((n) => (
                                    <SelectItem key={n} value={n.toString()}
                                                className="hover:bg-muted/10">
                                        {n}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        {Array.from({length: table.getPageCount()}, (_, i) => (
                            <Button
                                key={i}
                                variant={table.getState().pagination.pageIndex === i ? 'default' : 'outline'}
                                size="sm"
                                className="w-8 h-8 p-0"
                                onClick={() => table.setPageIndex(i)}
                            >
                                {i + 1}
                            </Button>
                        )).slice(0, 5)}
                        {table.getPageCount() > 5 && <span
                            className="px-1 text-muted-foreground">…</span>}
                        <Button size="sm" variant="outline" onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className=""
                        >
                            Prev
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className=""
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

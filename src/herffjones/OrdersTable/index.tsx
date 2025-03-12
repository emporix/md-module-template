import { useState } from 'react'
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  VisibilityState,
  getGroupedRowModel,
  getExpandedRowModel,
  GroupingState,
  ExpandedState,
} from '@tanstack/react-table'
import { productColumns } from './columns'
import { TableComponent } from '../../components/table'

export function ProductTable({ data }: { data?: any }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [rowSelection, setRowSelection] = useState({})
  console.log({ data })
  const table = useReactTable({
    data,
    columns: productColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      grouping,
      expanded,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    groupedColumnMode: 'reorder',
  })

  return (
    <div className='flex flex-col gap-4 px-10 w-full bg-gray-50'>
      <div className="flex justify-between items-center">
        <h3 className='text-3xl font-medium text-gray-800'>Orders</h3>
        <button
          className="px-6 py-1.5 text-sm text-white border border-transparent transition-colors bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700">
          ADD PRODUCT
        </button>
      </div>
      <TableComponent
        className='bg-white border border-gray-300'
        showFilters
        table={table}
      />
    </div>
  )
}

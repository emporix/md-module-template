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
import { columns } from './columns'
import { TableComponent } from '../../ui/table'

export function Table({ data }: { data?: any }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [grouping, setGrouping] = useState<GroupingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      grouping,
      expanded,
      rowSelection,
    },
    // State change handlers
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    // Features configuration
    enableRowSelection: true,
    // Row models
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    groupedColumnMode: 'reorder',
  })

  return (
    <TableComponent
      className='bg-white border border-gray-300'
      showFilters
      table={table}
    />
  )
}

import { Table } from '@tanstack/react-table'
import { renderTableSection } from './Section'
import { renderCell } from './CellRenderer'
import { DebugPanel } from '../Debug'

interface TableComponentProps<TData> {
  table: Table<TData>
  showFilters: boolean
  className?: string
  debug?: boolean
}

export function TableComponent<TData>({
  table,
  showFilters,
  className,
  debug
}: TableComponentProps<TData>) {
  const selectedRowsCount = table.getSelectedRowModel().rows.length
  const isActive = selectedRowsCount > 0

  return (
    <>
      <div className="flex justify-start">
        <button
          className={`px-6 py-1.5 mb-4 text-sm text-gray-700 border border-gray-300 transition-colors ${isActive
            ? 'bg-white hover:bg-gray-50'
            : 'bg-gray-50 cursor-not-allowed'
            }`}
          onClick={() => {
            if (isActive) {
              console.log(`Deleting ${selectedRowsCount} selected rows`)
            }
          }}
          disabled={!isActive}>
          Delete {isActive ? `(${selectedRowsCount})` : ''}
        </button>
      </div>
      <table className={className}>
        {renderTableSection(table, 'header', showFilters)}
        <tbody className='divide-y divide-gray-200'>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 ${row.getIsGrouped() ? 'bg-gray-100' : ''}`}
                style={{ width: '100%' }}>
                {row.getVisibleCells().map(cell => renderCell<TData>(cell, row))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length} className='py-8 text-center'>
                <div className='flex flex-col justify-center items-center space-y-2'>
                  <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.172 16.828a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <p className='text-gray-500'>No results found</p>
                  <p className='text-sm text-gray-400'>Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
        {renderTableSection(table, 'footer')}
      </table>
      {debug && <DebugPanel table={table} />}
    </>
  )
}


import { flexRender } from '@tanstack/react-table'
import { Cell, Row } from '@tanstack/react-table'

export function renderCell<TData>(cell: Cell<TData, unknown>, row: Row<TData>) {
  switch (true) {
    case cell.getIsGrouped():
      return (
        <td
          key={cell.id}
          className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'
          style={{
            width: cell.column.getSize(),
          }}
        >
          <button
            onClick={row.getToggleExpandedHandler()}
            className='flex items-center'
            aria-expanded={row.getIsExpanded()}>
            {row.getIsExpanded() ? '👇' : '👉'}{' '}
            {flexRender(cell.column.columnDef.cell, cell.getContext())} (
            {row.subRows.length})
          </button>
        </td>
      );
    case cell.getIsAggregated():
      return (
        <td
          key={cell.id}
          className='px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap'
          style={{
            width: cell.column.getSize(),
          }}
        >
          {flexRender(
            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
            cell.getContext()
          )}
        </td>
      )
    case cell.getIsPlaceholder():
      return <td key={cell.id} style={{ width: cell.column.getSize() }} />
    default:
      return (
        <td
          key={cell.id}
          className='px-2 py-2 text-sm text-gray-500 whitespace-nowrap'
          style={{
            width: cell.column.getSize(),
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      )
  }
}

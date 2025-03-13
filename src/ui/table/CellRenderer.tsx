import { flexRender } from '@tanstack/react-table'
import { Cell, Row } from '@tanstack/react-table'

export function renderCell<TData>(cell: Cell<TData, unknown>, row: Row<TData>) {
  const textSize = 'text-sm'

  switch (true) {
    case cell.getIsGrouped():
      return (
        <td
          key={cell.id}
          className={`px-6 py-4 ${textSize} font-medium whitespace-nowrap`}
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
          className={`px-6 py-4 ${textSize} font-semibold whitespace-nowrap`}
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
          className={`px-2 py-2 ${textSize} whitespace-nowrap`}
          style={{
            width: cell.column.getSize(),
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      )
  }
}

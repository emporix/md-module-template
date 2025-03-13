import { Table } from '@tanstack/react-table'

interface GroupingControlsProps {
  table: Table<any>
}

export function GroupingControls({ table }: GroupingControlsProps) {
  return table.getAllLeafColumns().map((column) => {
    if (!column.getCanGroup()) return null

    const isGrouped = column.getIsGrouped()

    return (
      <button
        key={column.id}
        type='button'
        onClick={() => column.toggleGrouping()}
        className={`px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isGrouped
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        aria-pressed={isGrouped}>
        {typeof column.columnDef.header === 'function'
          // @ts-ignore @todo
          ? column.columnDef.header()
          : column.columnDef.header}
        {isGrouped && ' 🔍'}
      </button>
    )
  }
  )
}

import { Table } from '@tanstack/react-table'
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite'
import 'react-json-view-lite/dist/index.css'

interface DebugPanelProps {
  table: Table<any>
}

export function DebugPanel({ table }: DebugPanelProps) {
  const { columnFilters, columnVisibility, grouping, rowSelection } = table.getState()

  if (process.env.NODE_ENV === 'production') return null

  const debugData = {
    filters: columnFilters,
    visibility: columnVisibility,
    grouping: grouping,
    rowSelection: rowSelection,
  }

  return (
    <div className='fixed bottom-4 right-4 p-4 text-sm bg-white/80 backdrop-blur border border-gray-300 max-w-[300px] max-h-[200px] overflow-auto hover:scale-105 transition-transform'>
      <JsonView data={debugData} shouldExpandNode={allExpanded} style={defaultStyles} />
    </div>
  )
}

import { Dispatch, SetStateAction } from 'react'
import { Table } from '@tanstack/react-table'
import { ToggleButton } from '../ui/table/Button'

interface SettingsProps {
  className?: string
  table: Table<any>
  showFilters: boolean
  setShowFilters: Dispatch<SetStateAction<boolean>>
}

export function Settings({ className, table, showFilters, setShowFilters }: SettingsProps) {
  return (
    <>
      <div className={`flex items-center space-x-3 ${className || ''}`}>
        <ToggleButton
          isActive={showFilters}
          onClick={() => setShowFilters(prev => !prev)}
        />
        <span className='hover:text-gray-900 text-sm font-medium text-gray-500 cursor-pointer'>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </span>
      </div>
      {
        table.getAllLeafColumns().map((column) => {
          if (!column.getCanHide()) return null
          const isVisible = column.getIsVisible()
          const columnLabel = column.id

          return (
            <div key={column.id} className='flex gap-4 w-full'>
              <ToggleButton
                isActive={isVisible}
                onClick={() => column.toggleVisibility(!isVisible)} />
              <span className='hover:text-gray-900 text-sm font-medium text-gray-500 cursor-pointer'
                onClick={() => column.toggleVisibility(!isVisible)}>
                {columnLabel}
              </span>
            </div>
          )
        })
      }
    </>
  )
}

import { useCallback, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

export function DateFilter({
  header,
}: {
  header: any
}) {
  const [selected, setSelected] = useState<Date>()
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false)

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelected(date)
    header.column.setFilterValue(date ? date.toLocaleDateString('en-US') : '')
    setIsDayPickerVisible(false)
  }, [header])

  return (
    <div>
      <input
        value={(header.column.getFilterValue() ?? '') as string}
        onChange={e => header.column.setFilterValue(e.target.value)}
        onClick={() => setIsDayPickerVisible(true)}
        placeholder={`Filter ${header.column.columnDef.header}`}
        className='px-2 py-1 w-full text-sm border border-gray-300'
      />
      {isDayPickerVisible && (
        <>
          <div
            className='fixed inset-0 bg-black opacity-50'
            onClick={() => setIsDayPickerVisible(false)}
          />
          <div className='fixed top-1/2 left-1/2 p-4 bg-white shadow-lg transform -translate-x-1/2 -translate-y-1/2'>
            <DayPicker
              mode='single'
              selected={selected}
              onSelect={handleDateSelect}
              footer={
                selected
                  ? `Selected: ${selected.toLocaleDateString()}`
                  : 'Pick a day.'
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

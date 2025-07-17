import React from 'react'
import { Calendar } from 'primereact/calendar'

interface DateRangePickerProps {
  startDate: Date
  endDate: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="date-range-picker">
      <Calendar
        value={startDate}
        onChange={(e) => onStartDateChange(e.value as Date)}
        dateFormat="mm/dd/yy"
        showIcon
      />
      <span style={{ color: '#6c757d' }}>-</span>
      <Calendar
        value={endDate}
        onChange={(e) => onEndDateChange(e.value as Date)}
        dateFormat="mm/dd/yy"
        showIcon
      />
    </div>
  )
}

export default DateRangePicker 
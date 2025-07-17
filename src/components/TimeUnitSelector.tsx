import React from 'react'
import { useTranslation } from 'react-i18next'
import { TimeUnit } from '../models/Statistics.model'

interface TimeUnitSelectorProps {
  timeUnit: TimeUnit
  onTimeUnitChange: (unit: TimeUnit) => void
}

const TimeUnitSelector: React.FC<TimeUnitSelectorProps> = ({ timeUnit, onTimeUnitChange }) => {
  const { t } = useTranslation()

  return (
    <div className="time-unit-buttons">
      <button
        className={`time-unit-button ${timeUnit === 'day' ? 'active' : ''}`}
        onClick={() => onTimeUnitChange('day')}
      >
        {t('day')}
      </button>
      <button
        className={`time-unit-button ${timeUnit === 'week' ? 'active' : ''}`}
        onClick={() => onTimeUnitChange('week')}
      >
        {t('week')}
      </button>
      <button
        className={`time-unit-button ${timeUnit === 'month' ? 'active' : ''}`}
        onClick={() => onTimeUnitChange('month')}
      >
        {t('month')}
      </button>
    </div>
  )
}

export default TimeUnitSelector 
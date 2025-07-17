import React from 'react'
import { useTranslation } from 'react-i18next'
import SummaryCards from '../components/SummaryCards'
import StatisticsChart from '../components/StatisticsChart'
import TimeUnitSelector from '../components/TimeUnitSelector'
import DateRangePicker from '../components/DateRangePicker'
import { ApiCallsStatisticsResponse, StatisticsSummary, TimeUnit } from '../models/Statistics.model'

interface ApiCallsViewProps {
  data: ApiCallsStatisticsResponse | null
  summary: StatisticsSummary
  timeUnit: TimeUnit
  startDate: Date
  endDate: Date
  isLoading: boolean
  onTimeUnitChange: (unit: TimeUnit) => void
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

const ApiCallsView: React.FC<ApiCallsViewProps> = ({
  data,
  summary,
  timeUnit,
  startDate,
  endDate,
  isLoading,
  onTimeUnitChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  const { t } = useTranslation()

  const chartLegends = {
    agreement: t('agreedAnnualApiCallsLegend'),
    withinPeriod: t('apiCallsWithinPeriod'),
    total: t('totalApiCalls'),
  }

  return (
    <>
      <SummaryCards summary={summary} agreementLabel={t('agreedAnnualApiCalls')} />

      <div className="chart-container" style={{ margin: '0 1rem' }}>
        <div className="chart-controls">
          <TimeUnitSelector timeUnit={timeUnit} onTimeUnitChange={onTimeUnitChange} />
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />
        </div>

        <StatisticsChart
          data={data}
          summary={summary}
          timeUnit={timeUnit}
          chartLegends={chartLegends}
          isLoading={isLoading}
        />
      </div>
    </>
  )
}

export default ApiCallsView 
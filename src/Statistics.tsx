import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { useTranslation } from 'react-i18next'
import { useDashboardContext } from './context/Dashboard.context'
import { fetchStatistics, fetchMakeStatistics } from './api'
import { ApiCallsStatisticsResponse, MakeStatisticsResponse, StatisticsFilters, StatisticsSummary, TimeUnit } from './models/Statistics.model'
import ApiCallsView from './views/ApiCallsView'
import MakeView from './views/MakeView'
import AiView from './views/AiView'
import DatabaseView from './views/DatabaseView'
import CloudinaryView from './views/CloudinaryView'
import WebhooksView from './views/WebhooksView'
import TenantSelector from './components/TenantSelector'

const Statistics: React.FC = () => {
  const { t } = useTranslation()
  const { token, tenant } = useDashboardContext()
  const [selectedTenant, setSelectedTenant] = useState<string>(tenant)
  const [isLoading, setIsLoading] = useState(false)
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('day')
  const [startDate, setStartDate] = useState<Date>(new Date('2025-07-09'))
  const [endDate, setEndDate] = useState<Date>(new Date('2025-07-16'))
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [statisticsData, setStatisticsData] = useState<ApiCallsStatisticsResponse | null>(null)
  const [makeStatisticsData, setMakeStatisticsData] = useState<MakeStatisticsResponse | null>(null)
  const [summary, setSummary] = useState<StatisticsSummary>({
    yesterday: 0,
    thisWeek: 1240,
    thisMonth: 5647,
    thisYear: 75422,
    agreedAnnual: 240000,
  })
  const [makeSummary, setMakeSummary] = useState<StatisticsSummary>({
    yesterday: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0,
    agreedAnnual: 0,
  })
  const [loadedTabs, setLoadedTabs] = useState<Set<number>>(new Set([0]))

  const fetchApiCallsData = async (filters: StatisticsFilters) => {
    try {
      const apiData = await fetchStatistics(selectedTenant, token, filters)
      setStatisticsData(apiData)
      
      // Update summary with actual API data
      setSummary({
        yesterday: apiData?.tenantUsage?.summary?.lastDay || 0,
        thisWeek: apiData?.tenantUsage?.summary?.thisWeek || 0,
        thisMonth: apiData?.tenantUsage?.summary?.thisMonth || 0,
        thisYear: apiData?.tenantUsage?.summary?.thisYear || 0,
        agreedAnnual: apiData?.maxAllowedUsage || 0,
      })
    } catch (error) {
      console.error('Error fetching API statistics:', error)
    }
  }

  const fetchMakeData = async (filters: StatisticsFilters) => {
    try {
      const makeData = await fetchMakeStatistics(selectedTenant, token, filters)
      setMakeStatisticsData(makeData)
      
      // Update Make summary with actual data - Make uses different field names
      setMakeSummary({
        yesterday: makeData?.tenantUsage?.summary?.operationsLastDay || 0,
        thisWeek: makeData?.tenantUsage?.summary?.operationsThisWeek || 0,
        thisMonth: makeData?.tenantUsage?.summary?.operationsThisMonth || 0,
        thisYear: makeData?.tenantUsage?.summary?.operationsThisYear || 0,
        agreedAnnual: makeData?.maxAllowedUsage || 0,
      })
    } catch (error) {
      console.error('Error fetching Make statistics:', error)
    }
  }

  const fetchDataForTab = async (tabIndex: number) => {
    setIsLoading(true)
    
    const filters: StatisticsFilters = {
      timeUnit,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    }

    try {
      switch (tabIndex) {
        case 0: // API Calls
          await fetchApiCallsData(filters)
          break
        case 1: // Make
          await fetchMakeData(filters)
          break
        // Add more cases for other tabs when implemented
        default:
          console.log(`Tab ${tabIndex} not implemented yet`)
      }
    } catch (error) {
      console.error('Error fetching data for tab:', tabIndex, error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (e: { index: number }) => {
    const newTabIndex = e.index
    setActiveTabIndex(newTabIndex)
    
    // Only fetch data if this tab hasn't been loaded before
    if (!loadedTabs.has(newTabIndex)) {
      setLoadedTabs(prev => new Set([...prev, newTabIndex]))
      fetchDataForTab(newTabIndex)
    }
  }

  useEffect(() => {
    // Update selected tenant when context tenant changes
    setSelectedTenant(tenant)
  }, [tenant])

  useEffect(() => {
    // Only fetch data for the currently active tab when filters change
    if (loadedTabs.has(activeTabIndex)) {
      fetchDataForTab(activeTabIndex)
    }
  }, [timeUnit, startDate, endDate, selectedTenant, token])

  useEffect(() => {
    // Fetch data for the initial tab (API Calls) on component mount
    fetchDataForTab(0)
  }, [selectedTenant, token])

  const handleTimeUnitChange = (unit: TimeUnit) => {
    setTimeUnit(unit)
  }

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date) => {
    setEndDate(date)
  }

  const handleTenantChange = (newTenant: string) => {
    setSelectedTenant(newTenant)
    // Reset loaded tabs when tenant changes so data is refetched
    setLoadedTabs(new Set([activeTabIndex]))
  }

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 0.5rem 0' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0' }}>{t('statistics')}</h1>
          <TenantSelector 
            currentTenant={tenant}
            token={token}
            onTenantChange={handleTenantChange}
          />
        </div>
      </div>

      <div style={{ padding: '0 1rem' }}>
        <TabView activeIndex={activeTabIndex} onTabChange={handleTabChange}>
          <TabPanel header={t('apiCalls')}>
            {activeTabIndex === 0 && (
              <ApiCallsView
                data={statisticsData}
                summary={summary}
                timeUnit={timeUnit}
                startDate={startDate}
                endDate={endDate}
                isLoading={isLoading}
                onTimeUnitChange={handleTimeUnitChange}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
              />
            )}
          </TabPanel>
          <TabPanel header={t('make')}>
            {activeTabIndex === 1 && (
              <MakeView
                data={makeStatisticsData}
                summary={makeSummary}
                timeUnit={timeUnit}
                startDate={startDate}
                endDate={endDate}
                isLoading={isLoading}
                onTimeUnitChange={handleTimeUnitChange}
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
              />
            )}
          </TabPanel>
          <TabPanel header={t('ai')}>
            {activeTabIndex === 2 && <AiView />}
          </TabPanel>
          <TabPanel header={t('database')}>
            {activeTabIndex === 3 && <DatabaseView />}
          </TabPanel>
          <TabPanel header={t('cloudinary')}>
            {activeTabIndex === 4 && <CloudinaryView />}
          </TabPanel>
          <TabPanel header={t('webhooks')}>
            {activeTabIndex === 5 && <WebhooksView />}
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}

export default Statistics 
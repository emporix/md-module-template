import React from 'react'
import { Chart } from 'react-chartjs-2'
import { ApiCallsStatisticsResponse, MakeStatisticsResponse, StatisticsSummary, TimeUnit } from '../models/Statistics.model'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
)

interface StatisticsChartProps {
  data: ApiCallsStatisticsResponse | MakeStatisticsResponse | null
  summary: StatisticsSummary
  timeUnit: TimeUnit
  chartLegends: {
    agreement: string
    withinPeriod: string
    total: string
  }
  isLoading: boolean
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  data,
  summary,
  timeUnit,
  chartLegends,
  isLoading,
}) => {
  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  const createChartData = () => {
    // Handle case where data is null or undefined
    if (!data || !data.tenantUsage || !data.tenantUsage.range || !data.tenantUsage.range.values) {
      return {
        labels: [],
        datasets: [
          {
            type: 'line' as const,
            label: chartLegends.agreement,
            data: [],
            borderColor: '#9ca3af',
            backgroundColor: 'transparent',
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 2,
            borderDash: [5, 5],
          },
          {
            type: 'bar' as const,
            label: chartLegends.withinPeriod,
            data: [],
            backgroundColor: '#6b7280',
            borderColor: '#6b7280',
            borderWidth: 1,
          },
          {
            type: 'line' as const,
            label: chartLegends.total,
            data: [],
            borderColor: '#000000',
            backgroundColor: 'transparent',
            tension: 0.1,
          },
        ],
      }
    }

    // Helper function to get the value from either API calls or Make data
    const getValue = (item: any): number => {
      if ('value' in item) {
        return item.value || 0 // API calls data
      } else if ('operations' in item) {
        return item.operations || 0 // Make data
      }
      return 0
    }

    return {
      labels: data.tenantUsage.range.values
        .map((item: any) => {
          const date = new Date(item.date)
          if (timeUnit === 'day') {
            return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
          } else if (timeUnit === 'week') {
            return `Week ${getWeekNumber(date)}`
          } else {
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          }
        })
        .reverse(),
      datasets: [
        {
          type: 'line' as const,
          label: chartLegends.agreement,
          data: data.tenantUsage.range.values.map(() => summary.agreedAnnual || 0),
          borderColor: '#9ca3af',
          backgroundColor: 'transparent',
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 2,
          borderDash: [5, 5],
        },
        {
          type: 'bar' as const,
          label: chartLegends.withinPeriod,
          data: data.tenantUsage.range.values.map((item: any) => getValue(item)).reverse(),
          backgroundColor: '#6b7280',
          borderColor: '#6b7280',
          borderWidth: 1,
        },
        {
          type: 'line' as const,
          label: chartLegends.total,
          data: data.tenantUsage.range.values.map((_: any, index: number) => {
            // Calculate cumulative sum for the line chart (reverse order for chronological)
            const values = data.tenantUsage.range.values.slice().reverse()
            return values.slice(0, index + 1).reduce((sum: number, d: any) => sum + getValue(d), 0)
          }),
          borderColor: '#000000',
          backgroundColor: 'transparent',
          tension: 0.1,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
        },
      },
    },
  }

  return (
    <div className="chart-wrapper">
      {isLoading ? (
        <div className="loading-spinner">
          <div>Loading...</div>
        </div>
      ) : (
        <Chart type="bar" data={createChartData()} options={chartOptions} />
      )}
    </div>
  )
}

export default StatisticsChart 
// Base interface for common fields
export interface BaseStatisticsApiResponse {
  tenant: string
  maxAllowedUsage?: number
  tenantUsage: {
    summary: any // Will be more specific in derived interfaces
    range: {
      period: string
      startTime: string
      endTime: string
      values: Array<any> // Will be more specific in derived interfaces
    }
  }
}

// API Calls specific interface
export interface ApiCallsStatisticsResponse extends BaseStatisticsApiResponse {
  tenantUsage: {
    summary: {
      lastDay: number
      thisWeek: number
      thisMonth: number
      thisYear: number
    }
    range: {
      period: string
      startTime: string
      endTime: string
      values: Array<{
        date: string
        value: number
      }>
    }
  }
}

// Make specific interface
export interface MakeStatisticsResponse extends BaseStatisticsApiResponse {
  tenantUsage: {
    summary: {
      operationsLastDay: number
      operationsThisWeek: number
      operationsThisMonth: number
      operationsThisYear: number
      dataTransferBytesLastDay: number
      dataTransferBytesThisWeek: number
      dataTransferBytesThisMonth: number
      dataTransferBytesThisYear: number
    }
    range: {
      period: string
      startTime: string
      endTime: string
      values: Array<{
        date: string
        operations: number
        dataTransferBytes: number
      }>
    }
  }
}

// Union type for all statistics responses
export type StatisticsApiResponse = ApiCallsStatisticsResponse | MakeStatisticsResponse

export interface StatisticsSummary {
  yesterday: number
  thisWeek: number
  thisMonth: number
  thisYear: number
  agreedAnnual: number
}

export type TimeUnit = 'day' | 'week' | 'month'

export interface StatisticsFilters {
  timeUnit: TimeUnit
  startTime: string
  endTime: string
} 
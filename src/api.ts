import { ApiCallsStatisticsResponse, MakeStatisticsResponse, StatisticsFilters } from './models/Statistics.model'

export const callApi = async <T, R = undefined>(
  path: string,
  method: string,
  tenant: string,
  token: string,
  data?: R
) => {
  const response = fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'emporix-tenant': tenant,
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })

  return (await response).json() as Promise<T>
}

export const fetchAllTenants = async (tenant: string, token: string) => {
  const response = await callApi<{ tenants: string[] }>(
    `/statistics/emporix/allTenants`,
    'GET',
    tenant,
    token
  )
  return response
}

export const fetchStatistics = async (
  tenant: string,
  token: string,
  filters: StatisticsFilters
) => {
  const { timeUnit, startTime, endTime } = filters
  const params = new URLSearchParams({
    timeunit: timeUnit,
    startTime,
    endTime,
  })
  
  const statistics = await callApi<ApiCallsStatisticsResponse>(
    `/statistics/tenants/${tenant}/usage/apicalls?${params.toString()}`,
    'GET',
    tenant,
    token
  )
  return statistics
}

export const fetchMakeStatistics = async (
  tenant: string,
  token: string,
  filters: StatisticsFilters
) => {
  const { timeUnit, startTime, endTime } = filters
  const params = new URLSearchParams({
    timeunit: timeUnit,
    startTime,
    endTime,
  })
  
  const statistics = await callApi<MakeStatisticsResponse>(
    `/statistics/${tenant}/usages/make?${params.toString()}`,
    'GET',
    tenant,
    token
  )
  return statistics
}

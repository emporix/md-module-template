import { createApiClient } from '@emporix/api-calls'

let credentials = { tenant: '', token: '' }
let isInitialized = false

export const syncApiCredentials = (tenant: string, token: string): void => {
  credentials = { tenant, token }
}

export const ensureApiClient = (): void => {
  if (isInitialized) return

  const baseURL = import.meta.env.VITE_API_URL
  if (typeof baseURL !== 'string' || !baseURL) {
    throw new Error('VITE_API_URL is not configured')
  }

  createApiClient({
    baseURL,
    getAccessToken: () => credentials.token,
    getTenant: () => credentials.tenant,
  })
  isInitialized = true
}

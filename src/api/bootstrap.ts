import { createApiClient } from '@emporix/api-calls'
import { useRef } from 'react'

let credentials = { tenant: '', token: '' }
let isClientReady = false

const initApiClient = (): void => {
  if (isClientReady) return

  const baseURL = import.meta.env.VITE_API_URL
  if (typeof baseURL !== 'string' || !baseURL) {
    throw new Error('VITE_API_URL is not configured')
  }

  createApiClient({
    baseURL,
    getAccessToken: () => credentials.token,
    getTenant: () => credentials.tenant,
  })
  isClientReady = true
}

export const setApiCredentials = (tenant: string, token: string): void => {
  credentials = { tenant, token }
  initApiClient()
}

/**
 * Keeps the shared axios client in sync with host credentials.
 * Runs during render (not in useEffect) so credentials are set before child fetch effects.
 */
export const useApiCredentials = (tenant: string, token: string): void => {
  const previousRef = useRef({ tenant: '', token: '' })

  if (
    previousRef.current.tenant !== tenant ||
    previousRef.current.token !== token
  ) {
    previousRef.current = { tenant, token }
    setApiCredentials(tenant, token)
  }
}

initApiClient()

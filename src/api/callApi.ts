import { ApiError } from './ApiError'

// Timeout promise for fetch requests
const timeoutPromise = (timeout: number) => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(
        new ApiError(0, 'Request timed out', undefined, 'Request timed out')
      )
    }, timeout)
  })
}

export const callApi = async <T, R = undefined>(
  path: string,
  method: string,
  tenant: string,
  token: string,
  data?: R,
  options?: {
    timeout?: number
  }
) => {
  const timeout = options?.timeout || 30000 // Default 30s timeout

  try {
    const fetchPromise = fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'emporix-tenant': tenant,
        Authorization: `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise(timeout)])

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        // If response is not JSON, use text instead
        errorData = await response.text()
      }

      throw new ApiError(response.status, response.statusText, errorData)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`Error calling API at ${path}:`, error)

    // Rethrow ApiError or wrap other errors
    if (error instanceof ApiError) {
      throw error
    } else {
      throw new ApiError(
        500,
        'Internal Error',
        undefined,
        error instanceof Error ? error.message : 'Unknown error occurred'
      )
    }
  }
}
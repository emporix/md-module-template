// Custom API error class for better error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`)
    this.name = 'ApiError'
  }
}
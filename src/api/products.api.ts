import { Product } from '../models/Product.model'
import { ApiError } from '../models/ApiError.model'

const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_URL
  if (typeof url !== 'string' || !url) {
    throw new Error('VITE_API_URL is not configured')
  }
  return url
}

export const callApi = async <T, R = undefined>(
  path: string,
  method: string,
  tenant: string,
  token: string,
  data?: R
): Promise<T> => {
  try {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'emporix-tenant': tenant,
        Authorization: `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    const text = await response.text()
    if (!response.ok) {
      const error = new ApiError(
        response.status,
        `API error ${response.status}`,
        text
      )
      console.error(error.message, text)
      throw error
    }

    if (!text) return undefined as T
    return JSON.parse(text) as T
  } catch (err) {
    if (err instanceof ApiError) throw err
    console.error('API request failed', err)
    throw err
  }
}

export const fetchProducts = async (
  tenant: string,
  token: string
): Promise<Product[]> => {
  const products = await callApi<Product[]>(
    `/product/${tenant}/products`,
    'GET',
    tenant,
    token
  )
  return products
}

export const fetchProduct = async (
  tenant: string,
  token: string,
  id: string
): Promise<Product> => {
  const product = await callApi<Product>(
    `/product/${tenant}/products/${id}`,
    'GET',
    tenant,
    token
  )
  return product
}

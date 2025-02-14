import { Product } from './models/Product.model'

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

export const fetchProducts = async (tenant: string, token: string) => {
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
) => {
  const product = await callApi<Product>(
    `/product/${tenant}/products/${id}`,
    'GET',
    tenant,
    token
  )
  return product
}

import { Product } from '../models/Product.model'
import { callApi } from './callApi'

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

// New function to fetch price lists
export const fetchPriceLists = async (
  tenant: string,
  token: string,
  siteCode: string = 'main',
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const priceLists = await callApi(
    `/price/${tenant}/price-lists?siteCode=${siteCode}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    'GET',
    tenant,
    token
  )
  return priceLists
}

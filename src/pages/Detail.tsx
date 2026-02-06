import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { fetchProduct } from '../api'
import { useDashboardContext } from '../context/Dashboard.context'
import { Product } from '../models/Product.model'

const Detail = () => {
  const { productId } = useParams()
  const { token, tenant } = useDashboardContext()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!productId) {
      setIsLoading(false)
      return
    }
    setError(null)
    setIsLoading(true)
    const load = async () => {
      try {
        const data = await fetchProduct(tenant, token, productId)
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [productId, token, tenant])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="p-4">Error: {error.message}</div>
  if (!product) return null

  const imageUrl = product?.media?.[0]?.url ?? ''
  const imageAlt = product?.name ?? 'Product'

  return (
    <div className="p-4">
      <NavLink to="/" aria-label="Back to product list">
        Back
      </NavLink>
      <h1 className="my-8">{product.name}</h1>
      {imageUrl ? <img src={imageUrl} alt={imageAlt} className="w-6" /> : null}
      <p className="w-6 mt-8">{product?.description}</p>
    </div>
  )
}
export default Detail

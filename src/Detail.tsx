import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { fetchProduct } from './api'
import { useDashboardContext } from './context/Dashboard.context'
import { Product } from './models/Product.model'

const Detail = () => {
  const { productId } = useParams()
  const { token, tenant } = useDashboardContext()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    ;(async () => {
      if (!productId) return
      const product = await fetchProduct(tenant, token, productId)
      setProduct(product)
    })()
  }, [productId, token, tenant])
  if (!product) return <div>Loading...</div>

  return (
    <div className="p-4">
      <NavLink to="/">Back</NavLink>
      <h1 className="my-8">{product.name}</h1>
      <img src={product?.media[0].url} alt={product?.name} className="w-6" />
      <p className="w-6 mt-8">{product?.description}</p>
    </div>
  )
}
export default Detail

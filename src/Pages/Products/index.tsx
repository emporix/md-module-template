// import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDashboardContext } from '../../context/Dashboard.context'
import { Product } from '../../models/Product.model'
// import { useTranslation } from 'react-i18next'
import { fetchProducts } from '../../api'
import { Table } from '../../herffjones/ProductTable'

const PageProducts = () => {
  // const { t } = useTranslation()
  // const navigate = useNavigate()
  const { token, tenant } = useDashboardContext()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setIsLoading(true)
      const products = await fetchProducts(tenant, token)
      setProducts(products)
      setIsLoading(false)
    })()
  }, [token, tenant])

  return (
    <div className='flex flex-col gap-4 px-10 w-full bg-gray-50'>
      <img src='https://i.ibb.co/Gvhtthjy/image.png' />
      {/* <div className="flex justify-between items-center">
        <h3 className='text-3xl font-medium text-gray-800'>Prices</h3>
        <button
          className="px-6 py-1.5 text-sm text-white border border-transparent transition-colors bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700">
          ADD PRODUCT
        </button>
      </div> */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 rounded-full border-b-2 border-sky-500 animate-spin"></div>
        </div>
      ) : (
        <Table data={products} />
      )}
    </div>
  )
}

export default PageProducts

import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { Column, DataTable } from 'primereact'
import { useDashboardContext } from './context/Dashboard.context'
import { Product } from './models/Product.model'
import { useTranslation } from 'react-i18next'
import { fetchProducts } from './api'

const List = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { token, tenant } = useDashboardContext()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const products = await fetchProducts(tenant, token)
      setProducts(products)
      setIsLoading(false)
    })()
  }, [token, tenant])

  return (
    <div className="p-4">
      <h1 className="my-2">{t('products')}</h1>
      <DataTable
        value={products}
        loading={isLoading}
        onRowClick={(e) => {
          navigate(e.data.id)
        }}
      >
        <Column field="code" header={t('productCode')}></Column>
        <Column field="name" header={t('productName')}></Column>
        <Column field="description" header={t('productDescription')}></Column>
        <Column field="productType" header={t('productType')}></Column>
      </DataTable>
    </div>
  )
}

export default List

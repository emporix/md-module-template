import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Column, DataTable } from 'primereact'
import { useTranslation } from 'react-i18next'
import { useDashboardContext } from '../context/Dashboard.context'
import { Product } from '../models/Product.model'
import { fetchProducts } from '../api'

const List = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { token, tenant } = useDashboardContext()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setError(null)
    setIsLoading(true)
    const load = async () => {
      try {
        const data = await fetchProducts(tenant, token)
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [token, tenant])

  if (error) {
    return (
      <div className="p-4">
        <h1 className="my-2">{t('products')}</h1>
        <p>Error: {error.message}</p>
      </div>
    )
  }

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

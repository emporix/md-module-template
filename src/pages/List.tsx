import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Column, DataTable } from 'primereact'
import { useTranslation } from 'react-i18next'
import { fetchProducts } from '@emporix/api-calls'
import { useDashboardContext } from '../context/Dashboard.context'
import { getLocalizedText } from '../helpers/localized.helpers'
import { Product } from '../models/Product.model'

const PRODUCT_LIST_FIELDS = 'id,code,name,description,productType,media'

const List = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { token, tenant, language } = useDashboardContext()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setError(null)
    setIsLoading(true)
    const load = async () => {
      try {
        const data = await fetchProducts(tenant, '', PRODUCT_LIST_FIELDS)
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
        <Column
          header={t('productName')}
          body={(row: Product) => getLocalizedText(row.name, language)}
        ></Column>
        <Column
          header={t('productDescription')}
          body={(row: Product) => getLocalizedText(row.description, language)}
        ></Column>
        <Column field="productType" header={t('productType')}></Column>
      </DataTable>
    </div>
  )
}

export default List

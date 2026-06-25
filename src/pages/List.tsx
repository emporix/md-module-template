import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { DataTable } from '@emporix/component-library'
import { useTranslation } from 'react-i18next'
import { fetchProducts } from '@emporix/api-calls'
import { useDashboardContext } from '../context/Dashboard.context'
import { getLocalizedText } from '../helpers/localized.helpers'
import { Product } from '../models/Product.model'
import styles from './List.module.scss'

const PRODUCT_LIST_FIELDS = 'id,code,name,description,productType,media'

const List = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { token, tenant, language } = useDashboardContext()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const columns = useMemo(
    () => [
      {
        columnKey: 'code',
        field: 'code',
        header: t('productCode'),
      },
      {
        columnKey: 'name',
        header: t('productName'),
        body: (row: Product) => getLocalizedText(row.name, language),
      },
      {
        columnKey: 'description',
        header: t('productDescription'),
        body: (row: Product) => getLocalizedText(row.description, language),
      },
      {
        columnKey: 'productType',
        field: 'productType',
        header: t('productType'),
      },
    ],
    [language, t]
  )

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
      <div className={styles.page}>
        <h1 className={styles.title}>{t('products')}</h1>
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('products')}</h1>
      <DataTable
        value={products}
        dataKey="id"
        columns={columns}
        loading={isLoading}
        paginator={false}
        showFilter={false}
        onRowClick={(row) => {
          if (row.id) {
            navigate(row.id)
          }
        }}
      />
    </div>
  )
}

export default List

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import Intro from './Pages/Intro'
import Products from './Pages/Products'
import Prices from './Pages/Pricing'
import Detail from './components/Detail'
import { AppState } from './models/AppState.model'
import { DashboardProvider } from './context/Dashboard.context'
import './translations/i18n'

interface RemoteComponentProps {
  appState?: AppState
}

const RemoteComponent = ({
  appState = {
    tenant: 'default',
    language: 'default',
    token: 'default',
  },
}: RemoteComponentProps) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(appState.language)
  }, [appState.language, i18n])

  return (
    <DashboardProvider appState={appState}>
      <HashRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Intro />} />
            <Route path="/products" element={<Products />} />
            <Route path="/pricing" element={<Prices />} />
            <Route path="/:productId" element={<Detail />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </DashboardProvider>
  )
}

export default RemoteComponent



// import { useNavigate } from 'react-router'
// import { useEffect, useState } from 'react'
// import { Column } from 'primereact/column'
// import { DataTable } from 'primereact/datatable'
// import { useDashboardContext } from '../../context/Dashboard.context'
// import { Product } from '../../models/Product.model'
// import { useTranslation } from 'react-i18next'
// import { fetchProducts } from '../../api'

// const PageList = () => {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const { token, tenant } = useDashboardContext()
//   const [products, setProducts] = useState<Product[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     ; (async () => {
//       setIsLoading(true)
//       const products = await fetchProducts(tenant, token)
//       setProducts(products)
//       setIsLoading(false)
//     })()
//   }, [token, tenant])

//   return (
//     <div className="p-4">
//       <h1 className="my-2">{t('products')}</h1>
//       <DataTable
//         value={products}
//         loading={isLoading}
//         onRowClick={(e) => {
//           navigate(e.data.id)
//         }}
//       >
//         <Column field="code" header={t('productCode')}></Column>
//         <Column field="name" header={t('productName')}></Column>
//         <Column field="description" header={t('productDescription')}></Column>
//         <Column field="productType" header={t('productType')}></Column>
//       </DataTable>
//     </div>
//   )
// }

// export default PageList

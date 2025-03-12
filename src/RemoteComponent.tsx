import { HashRouter, Routes, Route } from 'react-router'
import Intro from './Intro'
import List from './List'
import Products from './Products'
import Prices from './Pricing'
import Detail from './Detail'
import { AppState } from './models/AppState.model'
import { DashboardProvider } from './context/Dashboard.context'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import './translations/i18n'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'

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
            <Route path="/list" element={<List />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </DashboardProvider>
  )
}

export default RemoteComponent

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import Intro from './Pages/Intro'
import Products from './Pages/Products'
import Prices from './Pages/Pricing'
// import Detail from './components/Detail'
import { AppState } from './models/AppState.model'
import { DashboardProvider } from './context/Dashboard.context'
import './translations/i18n'
import './App.css'

interface RemoteComponentProps {
  appState?: AppState
}

export const RemoteComponent = ({
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
            {/* <Route path="/:productId" element={<Detail />} /> */}
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </DashboardProvider>
  )
}

export default RemoteComponent

import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import { useTranslation } from 'react-i18next'
import List from './pages/List'
import Detail from './pages/Detail'
import { AppState } from './models/AppState.model'
import { DashboardProvider } from './context/Dashboard.context'
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
            <Route index element={<List />} />
            <Route path="/:productId" element={<Detail />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </DashboardProvider>
  )
}

export default RemoteComponent

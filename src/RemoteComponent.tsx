import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import { ToastProvider } from '@emporix/component-library'
import '@emporix/component-library/styles'
import { useTranslation } from 'react-i18next'
import List from './pages/List'
import Detail from './pages/Detail'
import { useApiCredentials } from './api/bootstrap'
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
  useApiCredentials(appState.tenant, appState.token)

  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(appState.language)
  }, [appState.language, i18n])

  return (
    <ToastProvider>
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
    </ToastProvider>
  )
}

export default RemoteComponent

import Statistics from './Statistics'
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
      <Statistics />
    </DashboardProvider>
  )
}

export default RemoteComponent

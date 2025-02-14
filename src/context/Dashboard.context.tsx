import { createContext, useContext } from 'react'
import { AppState } from '../models/AppState.model'

type DashboardContextType = AppState

const Context = createContext<DashboardContextType>({
  tenant: '',
  language: '',
  token: '',
})

export const useDashboardContext = () => useContext(Context)

export const DashboardProvider = ({
  children,
  appState,
}: {
  children: React.ReactNode
  appState: AppState
}) => {
  return <Context.Provider value={appState}>{children}</Context.Provider>
}

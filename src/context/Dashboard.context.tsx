import { createContext, useContext, type PropsWithChildren } from 'react'
import { AppState } from '../models/AppState.model'

type DashboardContextType = AppState

const Context = createContext<DashboardContextType>({
  tenant: '',
  language: '',
  token: '',
})

export const useDashboardContext = () => useContext(Context)

export type DashboardProviderProps = PropsWithChildren<{
  appState: AppState
}>

export const DashboardProvider = ({
  children,
  appState,
}: DashboardProviderProps) => {
  return <Context.Provider value={appState}>{children}</Context.Provider>
}

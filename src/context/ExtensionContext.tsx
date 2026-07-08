import { createContext, useContext, type PropsWithChildren } from 'react'
import { AppState } from '../models/AppState.model'

type ExtensionContextType = AppState

const Context = createContext<ExtensionContextType>({
  tenant: '',
  language: '',
  token: '',
})

export const useExtensionContext = () => useContext(Context)

export type ExtensionProviderProps = PropsWithChildren<{
  appState: AppState
}>

export const ExtensionProvider = ({
  children,
  appState,
}: ExtensionProviderProps) => {
  return <Context.Provider value={appState}>{children}</Context.Provider>
}

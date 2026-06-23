import { useState } from 'react'
import { Button, Card, InputText } from 'primereact'
import RemoteComponent from './RemoteComponent'
import {
  getStoredSettings,
  saveStoredSettings,
  shouldOpenDevSettingsDialog,
} from './helpers/settings.helpers'
import styles from './App.module.scss'
import '/node_modules/primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const isDev = import.meta.env.DEV

const App = () => {
  const initial = getStoredSettings()
  const [tenant, setTenant] = useState(initial.tenant)
  const [language, setLanguage] = useState(initial.language)
  const [token, setToken] = useState(initial.token)
  const [isDialogOpen, setIsDialogOpen] = useState(
    () => isDev && shouldOpenDevSettingsDialog()
  )

  const handleSave = () => {
    saveStoredSettings({ tenant, language, token })
    setIsDialogOpen(false)
  }

  if (isDev && isDialogOpen) {
    return (
      <div className="p-16">
        <Card>
          <div className="field mb-5">
            <label htmlFor="tenant" className="block mb-2">
              Tenant
            </label>
            <InputText
              id="tenant"
              className="w-full"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="token" className="block mb-2">
              Token
            </label>
            <InputText
              id="token"
              className="w-full"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="field mb-5">
            <label htmlFor="language" className="block mb-2">
              Language
            </label>
            <InputText
              id="language"
              className="w-full"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <Button label="Save" onClick={handleSave} />
        </Card>
      </div>
    )
  }
  return (
    <div className={styles.appShell}>
      {isDev && (
        <button
          className={styles.appFab}
          type="button"
          aria-label="Edit tenant/token values"
          title="Edit values"
          onClick={() => setIsDialogOpen(true)}
        >
          {'</>'}
        </button>
      )}
      <RemoteComponent
        appState={{
          tenant,
          language,
          token,
        }}
      />
    </div>
  )
}

export default App

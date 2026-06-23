import { useState } from 'react'
import { Button, Card, InputText } from 'primereact'
import RemoteComponent from './RemoteComponent'
import {
  getStoredSettings,
  saveStoredSettings,
  shouldOpenDevSettingsDialog,
} from './helpers/settings.helpers'
import './App.css'
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
          <span className="p-float-label mb-5">
            <InputText
              id="tenant"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
            />
            <label htmlFor="tenant">Tenant</label>
          </span>
          <span className="p-float-label mb-5">
            <InputText
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <label htmlFor="token">Token</label>
          </span>
          <span className="p-float-label mb-5">
            <InputText
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <label htmlFor="language">Language</label>
          </span>
          <Button label="Save" onClick={handleSave} />
        </Card>
      </div>
    )
  }
  return (
    <div className="appShell">
      {isDev && (
        <button
          className="appFab"
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

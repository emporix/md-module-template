import { useState } from 'react'
import { Button, Card, InputText } from 'primereact'
import RemoteComponent from './RemoteComponent'
import {
  getStoredSettings,
  saveStoredSettings,
} from './helpers/settings.helpers'
import './App.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const App = () => {
  const initial = getStoredSettings()
  const [tenant, setTenant] = useState(initial.tenant)
  const [language, setLanguage] = useState(initial.language)
  const [token, setToken] = useState(initial.token)
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  const handleSave = () => {
    saveStoredSettings({ tenant, language, token })
    setIsDialogOpen(false)
  }

  if (isDialogOpen) {
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
    <RemoteComponent
      appState={{
        tenant,
        language,
        token,
      }}
    />
  )
}

export default App

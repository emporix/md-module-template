import { useState } from 'react'
import { InputText, PrimaryButton } from '@emporix/component-library'
import '@emporix/component-library/styles'
import RemoteComponent from './RemoteComponent'
import {
  getStoredSettings,
  saveStoredSettings,
  shouldOpenDevSettingsDialog,
} from './helpers/settings.helpers'
import styles from './App.module.scss'

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
      <div className={styles.settingsPage}>
        <section className={styles.settingsCard}>
          <div className={styles.settingsField}>
            <InputText
              inputId="tenant"
              label="Tenant"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
            />
          </div>
          <div className={styles.settingsField}>
            <InputText
              inputId="token"
              label="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className={styles.settingsField}>
            <InputText
              inputId="language"
              label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        </section>
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

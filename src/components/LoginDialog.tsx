import { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'

interface LoginDialogProps {
  onSave: (tenant: string, language: string, token: string) => void
}

function LoginDialog({ onSave }: LoginDialogProps) {
  const [tenant, setTenant] = useState(localStorage.getItem('tenant') || '')
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'en'
  )
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const handleSave = () => {
    localStorage.setItem('tenant', tenant)
    localStorage.setItem('language', language)
    localStorage.setItem('token', token)
    onSave(tenant, language, token)
  }

  // TYMCZASOWE: Automatyczne wysyłanie formularza po odświeżeniu strony
  // Usuń ten kod po zakończeniu testów
  useEffect(() => {
    const autoSubmit = localStorage.getItem('autoSubmit')
    if (autoSubmit === 'true' && tenant && token) {
      handleSave()
    } else {
      localStorage.setItem('autoSubmit', 'true')
    }
  }, [tenant, token])

  return (
    <div className="p-16">
      <Card>
        <span className="p-float-label mb-5">
          <InputText
            id="tenant-input"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
          />
          <label htmlFor="tenant-input">Tenant</label>
        </span>
        <span className="p-float-label mb-5">
          <InputText
            id="token-input"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <label htmlFor="token-input">Token</label>
        </span>
        <span className="p-float-label mb-5">
          <InputText
            id="language-input"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <label htmlFor="language-input">Language</label>
        </span>
        <Button label="Save" onClick={handleSave} />
        {/* TYMCZASOWE: Informacja o automatycznym wysyłaniu */}
        <div className="mt-3 text-sm text-yellow-600">
          Formularz zostanie automatycznie wysłany po odświeżeniu strony (jeśli dane są wypełnione)
        </div>
      </Card>
    </div>
  )
}

export default LoginDialog
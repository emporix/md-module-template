import { useState, useEffect } from 'react'

interface LoginDialogProps {
  onSave: (tenant: string, language: string, token: string) => void
}

export function LoginDialog({ onSave }: LoginDialogProps) {
  const [tenant, setTenant] = useState('')
  const [language, setLanguage] = useState('en')
  const [token, setToken] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  // Load saved data on component mount
  useEffect(() => {
    const expirationTime = localStorage.getItem('tokenExpiration')
    const isValid = expirationTime && new Date().getTime() < parseInt(expirationTime)

    if (isValid) {
      setTenant(localStorage.getItem('tenant') || '')
      setLanguage(localStorage.getItem('language') || 'en')
      setToken(localStorage.getItem('token') || '')
    } else {
      // Clear expired data
      localStorage.removeItem('tenant')
      localStorage.removeItem('language')
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('tenant', tenant)
    localStorage.setItem('language', language)
    localStorage.setItem('token', token)

    if (rememberMe) {
      // Set expiration time to 3 hours from now
      const expirationTime = new Date().getTime() + (3 * 60 * 60 * 1000)
      localStorage.setItem('tokenExpiration', expirationTime.toString())
    } else {
      // Remove expiration if "Remember me" is unchecked
      localStorage.removeItem('tokenExpiration')
    }

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
    <div className="flex justify-center items-center p-4 min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="overflow-hidden w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="sm:p-6 lg:p-8 p-4">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-medium text-gray-900">Sign in to continue</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="tenant-input" className="block mb-2 text-sm font-medium text-gray-900">
                Tenant
              </label>
              <input
                id="tenant-input"
                type="text"
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                placeholder="Enter tenant name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label htmlFor="token-input" className="block mb-2 text-sm font-medium text-gray-900">
                Token
              </label>
              <input
                id="token-input"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your token"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div>
              <label htmlFor="language-input" className="block mb-2 text-sm font-medium text-gray-900">
                Language
              </label>
              <input
                id="language-input"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="en"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="focus:ring-3 focus:ring-blue-300 w-4 h-4 bg-gray-50 rounded border border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-900">
                  Remember me for 3 hours
                </label>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>

            <div className="p-4 text-sm text-amber-700 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 mr-2 w-5 h-5">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Formularz zostanie automatycznie wysłany po odświeżeniu strony (jeśli dane są wypełnione)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

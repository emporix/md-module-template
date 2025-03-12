import { useState } from 'react'
import './App.css'
import RemoteComponent from '../RemoteComponent'
import LoginDialog from '../components/LoginDialog'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const [appState, setAppState] = useState({
    tenant: localStorage.getItem('tenant') || '',
    language: localStorage.getItem('language') || 'en',
    token: localStorage.getItem('token') || ''
  })

  const handleSave = (tenant: string, language: string, token: string) => {
    setAppState({ tenant, language, token })
    setIsDialogOpen(false)
  }

  if (isDialogOpen) {
    return <LoginDialog onSave={handleSave} />
  }

  return (
    <div className='flex h-full' >
      <div style={{ minWidth: '307px', maxWidth: '307px' }}>
        <img className='' src='https://i.ibb.co/HDQRqxRT/image.png' />
      </div>

      <RemoteComponent appState={appState} />
    </div>
  )
}

export default App

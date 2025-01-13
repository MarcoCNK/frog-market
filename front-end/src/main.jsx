import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '/src/App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContenxt'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider >
        <App />
      </AuthProvider>
    </BrowserRouter>
  )

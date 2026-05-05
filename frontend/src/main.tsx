import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './state/AuthContext'
import { AppThemeProvider } from './ui/theme'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)

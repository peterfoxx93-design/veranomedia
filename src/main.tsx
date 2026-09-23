import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initSentry, ErrorBoundary } from './sentry.tsx'

// Arranca la vigilancia de errores ANTES de montar la app: así también se
// capturan los fallos del primer render.
initSentry()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

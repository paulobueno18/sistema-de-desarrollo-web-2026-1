import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'
import './firebase.js'
import './index.css'

function normalizeHash(hash) {
  const cleaned = hash.replace('#', '').replace('/', '')
  if (cleaned === 'cliente') return '#/cliente'
  if (cleaned === 'admin') return '#/admin'
  return '#/cliente'
}

function getRoute() {
  if (window.location.hash) {
    return normalizeHash(window.location.hash)
  }

  if (window.location.pathname === '/cliente') {
    return '#/cliente'
  }

  if (window.location.pathname === '/admin') {
    return '#/admin'
  }

  return '#/cliente'
}

function Router() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (route === '#/admin') {
    return <AdminApp />
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)

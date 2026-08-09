import { useState } from 'react'

export default function AdminModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Credenciales del Administrador (puedes cambiarlas aquí)
    if (username === 'admin' && password === 'patricio2026') {
      setError('')
      onLoginSuccess() // Avisa a App.jsx que el inicio de sesión fue correcto
      onClose()       // Cierra el modal
    } else {
      setError('Usuario o contraseña incorrectos. Inténtalo de nuevo.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-serif font-bold text-white">
            Control de <span className="text-accent">Administrador</span>
          </h3>
          <p className="text-stone-400 text-xs mt-1">Ingresa tus credenciales de acceso</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
              Usuario
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej. admin"
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-200 focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
              Contraseña
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-sm text-stone-200 focus:outline-none focus:border-accent transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center font-medium bg-red-500/10 p-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button 
            type="submit"
            className="w-full mt-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl transition-colors uppercase tracking-wider text-xs"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}
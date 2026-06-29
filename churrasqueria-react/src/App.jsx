import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartModal from './components/CartModal'
import DishModal from './components/DishModal'
import AdminPanel from './components/AdminPanel' // Asegúrate de que este archivo exista en components

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDishOpen, setIsDishOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)
  
  // Estado global para controlar si el administrador está logueado
  const [isAdmin, setIsAdmin] = useState(false)

  const handleOpenDish = (dish) => {
    setSelectedDish(dish)
    setIsDishOpen(true)
  }

  const handleCloseDish = () => {
    setIsDishOpen(false)
    setSelectedDish(null)
  }

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-stone-950 text-white">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            {/* 🏠 RUTA 1: Inicio / Carta Principal */}
            <Route path="/" element={
              <>
                <Hero />
                <Menu onDishClick={handleOpenDish} />
              </>
            } />

            {/* 📅 RUTA 2: Pestaña exclusiva para "Reserva tu Mesa" */}
            <Route path="/reservar" element={
              <div className="py-12 bg-stone-950 min-h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-4xl">
                  <Contact />
                </div>
              </div>
            } />

            {/* 🛠️ RUTA 3: Panel de Administración con Login Integrado */}
            <Route path="/admin" element={
              isAdmin ? (
                // Si ya inició sesión, ve el panel CRUD completo para gestionar el menú
                <div className="py-10 bg-stone-900 min-h-screen">
                  <div className="max-w-6xl mx-auto px-4 flex justify-end mb-4">
                    <button 
                      onClick={() => setIsAdmin(false)} 
                      className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold uppercase transition-all border border-red-500/30"
                    >
                      🔒 Cerrar Sesión Admin
                    </button>
                  </div>
                  <AdminPanel />
                </div>
              ) : (
                // Si NO ha iniciado sesión, se le muestra este formulario de acceso directo
                <div className="py-20 text-center bg-stone-900 min-h-[75vh] flex flex-col justify-center items-center px-4">
                  <span className="text-5xl mb-4">🛠️</span>
                  <h2 className="text-3xl font-serif text-amber-500 font-bold mb-3">
                    Panel de Control Administrativo
                  </h2>
                  <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const passwordInput = e.target.elements.adminPassword.value;
                      
                      // 🔑 Clave local de acceso. Puedes cambiar 'admin123' por la que prefieras
                      if (passwordInput === 'admin123') {
                        setIsAdmin(true);
                      } else {
                        alert('❌ Contraseña incorrecta. Inténtalo de nuevo.');
                      }
                    }}
                    className="bg-stone-950 p-6 border border-stone-800 rounded-xl w-full max-w-sm shadow-2xl space-y-4"
                  >
                    <p className="text-sm text-stone-300 font-medium">Ingresa la clave de acceso:</p>
                    <input 
                      type="password" 
                      name="adminPassword"
                      placeholder="Contraseña del Patricio" 
                      className="w-full p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-sm text-center text-stone-200 focus:border-amber-500 outline-none font-mono tracking-widest"
                      required
                      autoFocus
                    />
                    <button 
                      type="submit" 
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold uppercase rounded-lg text-xs tracking-wider transition-colors"
                    >
                      Ingresar al Sistema
                    </button>
                    <p className="text-[10px] text-stone-600 pt-1">Módulo de Seguridad Local – UNAMAD</p>
                  </form>
                </div>
              )
            } />
          </Routes>
        </main>

        <Footer />

        {/* Modales globales de interacción */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {selectedDish && (
          <DishModal 
            dish={selectedDish} 
            isOpen={isDishOpen} 
            onClose={handleCloseDish} 
          />
        )}
      </div>
    </CartProvider>
  )
}
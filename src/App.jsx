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
import AdminPanel from './components/AdminPanel'

// 1. Importación del menú estático inicial
import { MENU } from './data/menu' 

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDishOpen, setIsDishOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)
  
  // Estado para controlar si el administrador ha iniciado sesión
  const [isAdmin, setIsAdmin] = useState(false)

  // 2. 💾 Inicialización inteligente del Estado usando LocalStorage
  const [platos, setPlatos] = useState(() => {
    const platosGuardados = localStorage.getItem('menu_churrasqueria');
    // Si ya existen datos en el navegador, los usa; si no, carga el menú original
    return platosGuardados ? JSON.parse(platosGuardados) : MENU;
  });

  // 3. ➕ Función del CRUD: Agregar un nuevo plato
  const handleAgregarPlato = (nuevoPlato) => {
    const platoConId = { ...nuevoPlato, id: Date.now() }; // ID único basado en tiempo
    const listaActualizada = [...platos, platoConId];
    
    setPlatos(listaActualizada);
    localStorage.setItem('menu_churrasqueria', JSON.stringify(listaActualizada));
  };

  // 4. 📝 Función del CRUD: Editar un plato existente
  const handleEditarPlato = (idPlato, platoModificado) => {
    const listaActualizada = platos.map((p) => 
      p.id === idPlato ? { ...p, ...platoModificado } : p
    );
    
    setPlatos(listaActualizada);
    localStorage.setItem('menu_churrasqueria', JSON.stringify(listaActualizada));
  };

  // 5. ❌ Función del CRUD: Eliminar un plato
  const handleEliminarPlato = (idPlato) => {
    const listaActualizada = platos.filter((p) => p.id !== idPlato);
    
    setPlatos(listaActualizada);
    localStorage.setItem('menu_churrasqueria', JSON.stringify(listaActualizada));
  };

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
                {/* Enviamos los platos dinámicos al Menú */}
                <Menu platos={platos} onDishClick={handleOpenDish} />
              </>
            } />

            {/* 📅 RUTA 2: Sección exclusiva para "Reserva tu Mesa" */}
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
                // Vista 1: Si ya inició sesión, ve el panel CRUD de gestión
                <div className="py-10 bg-stone-900 min-h-screen">
                  <div className="max-w-6xl mx-auto px-4 flex justify-end mb-4">
                    <button 
                      onClick={() => setIsAdmin(false)} 
                      className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold uppercase transition-all border border-red-500/30"
                    >
                      🔒 Cerrar Sesión Admin
                    </button>
                  </div>
                  {/* Pasamos los platos y funciones CRUD al Panel de Administración */}
                  <AdminPanel 
                    platos={platos} 
                    onAgregar={handleAgregarPlato} 
                    onEditar={handleEditarPlato} 
                    onEliminar={handleEliminarPlato} 
                  />
                </div>
              ) : (
                // Vista 2: Formulario completo integrado en la pantalla /admin
                <div className="py-16 text-center bg-stone-900 min-h-[85vh] flex flex-col justify-center items-center px-4">
                  <span className="text-5xl mb-4">🛠️</span>
                  <h2 className="text-3xl font-serif text-amber-500 font-bold mb-3">
                    Control de <span className="text-white">Administrador</span>
                  </h2>
                  <div className="w-16 h-1 bg-amber-500 mb-6"></div>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      
                      const userInput = e.target.adminUser.value.trim();
                      const passwordInput = e.target.adminPassword.value.trim();
                      
                      // 🔑 Validación con las credenciales locales
                      if (userInput === 'admin' && passwordInput === 'patricio2026') {
                        setIsAdmin(true);
                      } else {
                        alert('❌ Usuario o contraseña incorrectos. Inténtalo de nuevo.');
                      }
                    }}
                    className="bg-stone-950 p-6 border border-stone-800 rounded-xl w-full max-w-sm shadow-2xl space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                        Usuario
                      </label>
                      <input 
                        type="text" 
                        name="adminUser"
                        placeholder="Ej. admin" 
                        className="w-full p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-sm text-stone-200 focus:border-amber-500 outline-none"
                        required
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                        Contraseña
                      </label>
                      <input 
                        type="password" 
                        name="adminPassword"
                        placeholder="••••••••" 
                        className="w-full p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-sm text-stone-200 focus:border-amber-500 outline-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase rounded-lg text-xs tracking-wider transition-colors pt-2"
                    >
                      Iniciar Sesión
                    </button>
                    <p className="text-[10px] text-stone-600 text-center pt-1">Módulo de Seguridad Local – UNAMAD</p>
                  </form>
                </div>
              )
            } />
          </Routes>
        </main>

        <Footer />

        {/* Modales globales */}
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
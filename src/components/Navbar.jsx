import { Link } from 'react-router-dom' // 👈 Cambiamos a Link de react-router-dom
import { useCart } from '../context/CartContext'

export default function Navbar({ onCartClick }) {
  const { getItemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-stone-950 border-b border-stone-800 shadow-xl text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        <Link to="/" className="text-2xl font-serif font-bold text-white tracking-wide">
          El Rinconcito <span className="text-accent">del Patricio</span>
        </Link>

        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-stone-300 hover:text-accent transition font-medium">Inicio</Link>
          </li>
          <li>
            {/* 📅 Abre Reserva tu mesa en una PESTAÑA NUEVA en tu localhost */}
            <Link to="/reservar"  className="text-stone-300 hover:text-accent transition font-medium">
              Reservar Mesa
            </Link>
          </li>
        </ul>

        <button onClick={onCartClick} className="px-6 py-2.5 bg-accent text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors relative text-sm">
          Mi pedido ({getItemCount()})
        </button>
      </nav>
    </header>
  )
}
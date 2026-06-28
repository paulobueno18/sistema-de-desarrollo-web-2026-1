import { useCart } from '../context/CartContext'

export default function Navbar({ onCartClick }) {
  const { getItemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="text-2xl font-serif font-bold text-primary-700">
          El Rinconcito <span className="text-accent">del Patricio</span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex space-x-8">
          <li><a href="#inicio" className="text-gray-700 hover:text-primary-700 transition">Inicio</a></li>
          <li><a href="#menu" className="text-gray-700 hover:text-primary-700 transition">Menú</a></li>
          <li><a href="#contacto" className="text-gray-700 hover:text-primary-700 transition">Contacto</a></li>
        </ul>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="btn-primary relative"
        >
          Mi pedido ({getItemCount()})
          {getItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold">
              {getItemCount()}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}

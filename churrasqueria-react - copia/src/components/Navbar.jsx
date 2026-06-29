import { useCart } from '../context/CartContext'

export default function Navbar({ onCartClick }) {
  const { getItemCount } = useCart()

  return (
    // Cambiado a bg-stone-950 (negro rústico) y texto general blanco
    <header className="sticky top-0 z-50 bg-stone-950 border-b border-stone-800 shadow-xl text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#inicio" className="text-2xl font-serif font-bold text-white tracking-wide">
          El Rinconcito <span className="text-accent">del Patricio</span>
        </a>

        {/* Links con colores claros adaptados al fondo oscuro */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <a href="#inicio" className="text-stone-300 hover:text-accent transition font-medium">
              Inicio
            </a>
          </li>
          <li>
            <a href="#menu" className="text-stone-300 hover:text-accent transition font-medium">
              Menú
            </a>
          </li>
          <li>
            <a href="#contacto" className="text-stone-300 hover:text-accent transition font-medium">
              Contacto
            </a>
          </li>
        </ul>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="btn-primary relative bg-accent hover:bg-accent-dark text-white border-none"
        >
          Mi pedido ({getItemCount()})
          {getItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold animate-pulse">
              {getItemCount()}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
};
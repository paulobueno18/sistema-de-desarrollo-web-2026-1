import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-amber-950 text-amber-50 px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50 border-b border-amber-900">
      <Link to="/" className="text-2xl font-black tracking-wider uppercase text-amber-400 flex items-center gap-2">
        🔥 La Estancia
      </Link>
      
      <div className="flex items-center gap-6 font-medium">
        <Link to="/" className="hover:text-amber-400 transition">Menú</Link>
        <Link to="/cart" className="relative hover:text-amber-400 transition">
          🛒 Pedido
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
              {totalItems}
            </span>
          )}
        </Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/admin" className="hover:text-amber-400 transition">Admin Panel</Link>
            <button 
              onClick={logout} 
              className="bg-red-700 hover:bg-red-800 text-white text-sm px-3 py-1.5 rounded-md font-semibold transition"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-1.5 rounded-md font-semibold transition"
          >
            Ingresar
          </Link>
        )}
      </div>
    </nav>
  );
};
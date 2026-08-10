import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';

export const Cart = () => {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-amber-950">Tu orden de parrillada está vacía 🥩</h2>
        <p className="text-gray-600 mt-2">Agrega tus cortes favoritos para realizar el pedido.</p>
        <Link to="/" className="mt-6 inline-block bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-2.5 rounded-lg transition shadow">
          Ver Menú
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-950 mb-6">Detalle de tu Pedido</h2>
      <div className="bg-white rounded-xl shadow-md border border-amber-100 overflow-hidden">
        {cart.map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-none">
            <div>
              <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
              {item.doneness && (
                <p className="text-xs text-amber-800 font-bold uppercase tracking-wider mt-0.5">
                  Término: {item.doneness}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Cantidad: {item.quantity} x {formatPrice(item.price)}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-black text-amber-900 text-lg">{formatPrice(item.price * item.quantity)}</span>
              <button
                onClick={() => removeFromCart(item.id, item.doneness)}
                className="text-red-500 hover:text-red-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        <div className="p-4 bg-amber-50/50 flex justify-between items-center border-t border-amber-100">
          <button onClick={clearCart} className="text-xs font-bold text-gray-500 hover:text-red-600 uppercase tracking-wide">
            Vaciar Pedido
          </button>
          <div className="text-right">
            <span className="text-sm font-bold text-gray-600 mr-2 uppercase">Total:</span>
            <span className="text-2xl font-black text-amber-950">{formatPrice(totalAmount)}</span>
          </div>
        </div>
      </div>

      <Link 
        to="/checkout" 
        className="block text-center w-full mt-6 bg-amber-800 hover:bg-amber-900 text-white font-bold py-3.5 rounded-xl shadow-lg transition"
      >
        Proceder al Pago
      </Link>
    </div>
  );
};
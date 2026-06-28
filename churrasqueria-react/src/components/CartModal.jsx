import { useCart } from '../context/CartContext'
import CartItem from './CartItem'

export default function CartModal({ isOpen, onClose }) {
  const { cart, getTotal, clearCart } = useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío')
      return
    }
    alert(`Pedido de S/ ${getTotal().toFixed(2)} procesado.\nGracias por su compra!`)
    clearCart()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-end sm:justify-center">
      <div className="bg-white w-full sm:w-96 max-h-screen sm:max-h-96 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-primary-800">Tu Pedido</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Tu carrito está vacío</p>
              <p className="text-sm">Agrega un plato para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <CartItem key={idx} item={item} index={idx} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-accent">S/ {getTotal().toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full btn-primary"
            >
              Confirmar Pedido
            </button>
            <button
              onClick={() => clearCart()}
              className="w-full px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Limpiar Carrito
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

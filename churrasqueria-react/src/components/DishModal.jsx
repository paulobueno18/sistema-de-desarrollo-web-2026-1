import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function DishModal({ dish, isOpen, onClose }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('regular')

  if (!isOpen || !dish) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(dish, size)
    }
    alert(`${quantity} ${dish.name} agregado${quantity > 1 ? 's' : ''} al carrito`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header con imagen */}
        <div className="relative">
          <img 
            src={dish.img} 
            alt={dish.name}
            className="w-full h-80 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-8">
          <h2 className="text-4xl font-serif font-bold text-primary-800 mb-2">
            {dish.name}
          </h2>
          <p className="text-gray-600 mb-6">{dish.desc}</p>

          {/* Descripción detallada */}
          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-primary-800 mb-3">Preparación</h3>
            <p className="text-gray-700 text-sm">{dish.detail}</p>
          </div>

          {/* Ingredientes */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">Ingredientes</h3>
            <p className="text-gray-700 text-sm">{dish.ingredients}</p>
          </div>

          {/* Opciones de compra */}
          <div className="space-y-6 mb-6">
            {/* Tamaño */}
            <div>
              <label className="block font-semibold text-gray-800 mb-3">
                Tamaño
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setSize('regular')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    size === 'regular'
                      ? 'bg-primary-700 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Regular
                  <br />
                  <span className="text-sm font-normal">S/ {dish.price.toFixed(2)}</span>
                </button>
                <button
                  onClick={() => setSize('grande')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    size === 'grande'
                      ? 'bg-primary-700 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Grande
                  <br />
                  <span className="text-sm font-normal">S/ {(dish.price + 8).toFixed(2)}</span>
                </button>
              </div>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block font-semibold text-gray-800 mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-xl transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-primary-700 hover:bg-primary-800 text-white rounded-lg font-bold text-xl transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Precio total */}
          <div className="bg-accent bg-opacity-20 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Subtotal por cantidad</p>
            <p className="text-3xl font-bold text-primary-800">
              S/ {(
                (dish.price + (size === 'grande' ? 8 : 0)) * quantity
              ).toFixed(2)}
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-primary"
            >
              Agregar al Pedido
            </button>
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

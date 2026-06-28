import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function MenuItem({ dish, onViewDetails }) {
  const { addToCart } = useCart()
  const [size, setSize] = useState('regular')

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(dish, size)
    // Feedback visual
    alert(`${dish.name} agregado al carrito`)
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={onViewDetails}
    >
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={dish.img} 
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-accent text-primary-800 px-3 py-1 rounded-full font-bold">
          S/ {dish.price.toFixed(2)}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-800 mb-2">
          {dish.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {dish.desc}
        </p>

        {/* Selector de tamaño */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-700 block mb-2">
            Tamaño
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary-700"
          >
            <option value="regular">Regular</option>
            <option value="grande">Grande (+S/ 8.00)</option>
          </select>
        </div>

        {/* Botón de agregar */}
        <button
          onClick={handleAddToCart}
          className="w-full btn-primary text-sm"
        >
          Agregar al Pedido
        </button>
      </div>
    </div>
  )
}

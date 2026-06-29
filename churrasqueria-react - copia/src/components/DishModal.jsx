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
    // Reemplazamos el alert genérico por algo más profesional
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header con imagen */}
        <div className="relative">
          <img 
            src={dish.img || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000"} 
            alt={dish.name}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent hover:text-white transition duration-200 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-3xl font-serif font-bold text-white tracking-wide">
              {dish.name}
            </h2>
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs uppercase font-semibold px-3 py-1 rounded-full">
              Brasas Premium
            </span>
          </div>
          
          <p className="text-stone-300 mb-6 text-sm md:text-base leading-relaxed">{dish.desc}</p>

          {/* Información y Contexto de la casa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-stone-800/60 border border-stone-800 rounded-xl p-4">
              <h3 className="font-bold text-accent mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                🥩 Acompañamiento Tradicional
              </h3>
              <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                {dish.detail || "Servido al auténtico estilo amazónico con porción generosa de yuca sancochada de la región y ensalada fresca de la casa."}
              </p>
            </div>

            <div className="bg-stone-800/60 border border-stone-800 rounded-xl p-4">
              <h3 className="font-bold text-stone-300 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                🌿 Ingredientes y Alérgenos
              </h3>
              <p className="text-stone-400 text-xs md:text-sm italic">
                {dish.ingredients || "Corte seleccionado, sal parrillera gruesa, carbón de leña natural, guarniciones regionales."}
              </p>
            </div>
          </div>

          {/* Opciones de compra */}
          <div className="space-y-5 mb-6">
            {/* Selección de Tamaño */}
            <div>
              <label className="block font-medium text-stone-300 mb-2 text-sm tracking-wide">
                Selecciona la Porción
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSize('regular')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all border ${
                    size === 'regular'
                      ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Regular
                  <span className="block text-xs font-normal opacity-80 mt-0.5">S/ {dish.price ? dish.price.toFixed(2) : "0.00"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSize('grande')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all border ${
                    size === 'grande'
                      ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20'
                      : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Grande (Familiar)
                  <span className="block text-xs font-normal opacity-80 mt-0.5">S/ {dish.price ? (dish.price + 8).toFixed(2) : "0.00"}</span>
                </button>
              </div>
            </div>

            {/* Ajuste de Cantidad */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
              <label className="font-medium text-stone-300 text-sm tracking-wide">
                Cantidad a pedir
              </label>
              <div className="flex items-center gap-4 bg-stone-800 p-1 rounded-xl border border-stone-700">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 hover:bg-stone-700 rounded-lg font-bold text-xl transition flex items-center justify-center text-stone-300"
                >
                  −
                </button>
                <span className="text-xl font-bold w-6 text-center text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold text-xl transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Precio Total y Acción */}
          <div className="bg-stone-800 border border-stone-700/60 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-400 mb-0.5">Subtotal estimado</p>
              <p className="text-3xl font-extrabold text-white">
                S/ {((dish.price || 0) + (size === 'grande' ? 8 : 0)) * quantity.toFixed(2)}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-medium text-sm transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-md"
              >
                Agregar al Pedido 🥩
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
};
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { DONENESS_OPTIONS } from '../utils/constants';
import { formatPrice } from '../utils/helpers';

export const ProductCard = ({ product }) => {
  const [doneness, setDoneness] = useState(DONENESS_OPTIONS[1]);
  const { addToCart } = useCart();

  const isMeat = product.category === 'cortes' || product.category === 'parrilladas';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 flex flex-col justify-between transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500'} 
          alt={product.name} 
          className="h-48 w-full object-cover" 
        />
        <span className="absolute top-2 right-2 bg-amber-950/80 text-amber-300 text-xs px-2 py-1 rounded font-bold uppercase backdrop-blur-xs">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-amber-950">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-4">
          {isMeat && (
            <div className="mb-3">
              <label className="block text-xs font-bold text-amber-900 mb-1 uppercase tracking-wide">
                Término de Cocción:
              </label>
              <select
                value={doneness}
                onChange={(e) => setDoneness(e.target.value)}
                className="w-full text-xs font-medium border border-amber-200 bg-amber-50/50 rounded-lg p-2 focus:outline-amber-600 text-gray-800"
              >
                {DONENESS_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-amber-50">
            <span className="text-xl font-black text-amber-900">{formatPrice(product.price)}</span>
            <button
              onClick={() => addToCart(product, isMeat ? doneness : null)}
              className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition"
            >
              + Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
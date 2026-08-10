import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';

export const Checkout = () => {
  const { totalAmount, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-xl shadow-xl text-center border border-amber-200">
        <h2 className="text-2xl font-black text-amber-950 mb-2">¡Pedido Confirmado! 🎉</h2>
        <p className="text-gray-600 text-sm">Tu parrilla ya está en fuego. En breve enviamos tu orden.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-950 mb-6">Finalizar Pedido</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-amber-100 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Nombre Completo</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:outline-amber-600"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Dirección de Entrega / Mesa</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:outline-amber-600"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Teléfono de Contacto</label>
          <input
            type="tel"
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:outline-amber-600"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        
        <div className="border-t border-amber-100 pt-4 flex justify-between items-center">
          <span className="font-bold text-gray-700">Total a pagar:</span>
          <span className="text-2xl font-black text-amber-950">{formatPrice(totalAmount)}</span>
        </div>

        <button 
          type="submit" 
          className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-xl shadow transition"
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { createProduct, deleteProduct } from '../service/productService';
import { uploadImage } from '../service/uploadService';
import { formatPrice } from '../utils/helpers';
import { CATEGORIES } from '../utils/constants';

export const AdminPanel = () => {
  const { products, fetchProducts } = useProducts();
  const [form, setForm] = useState({ name: '', price: '', category: 'cortes', description: '' });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let imageUrl = '';
      if (file) {
        imageUrl = await uploadImage(file);
      }
      await createProduct({ ...form, price: parseFloat(form.price), image: imageUrl });
      setForm({ name: '', price: '', category: 'cortes', description: '' });
      setFile(null);
      fetchProducts();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Deseas eliminar este plato/corte del menú?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-amber-950 mb-6">Panel de Administración - Gestión de Menú</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 border border-amber-100">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Nombre del Plato / Corte</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1 focus:outline-amber-600"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Precio</label>
          <input
            type="number"
            step="0.01"
            required
            className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1 focus:outline-amber-600"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Categoría</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1 focus:outline-amber-600"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase">Imagen de Referencia</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-sm mt-1 text-gray-600"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 uppercase">Descripción</label>
          <textarea
            rows="2"
            className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1 focus:outline-amber-600"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button 
          type="submit" 
          disabled={isUploading}
          className="md:col-span-2 bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-lg shadow transition disabled:opacity-50"
        >
          {isUploading ? 'Guardando...' : '+ Agregar al Menú'}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-950 text-amber-100 text-xs uppercase tracking-wider">
              <th className="p-4">Plato</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="text-sm hover:bg-amber-50/50 transition">
                <td className="p-4 font-semibold text-gray-800">{p.name}</td>
                <td className="p-4 capitalize text-gray-600">{p.category}</td>
                <td className="p-4 font-bold text-amber-900">{formatPrice(p.price)}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    className="text-red-600 font-bold hover:text-red-800 text-xs uppercase tracking-wide"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
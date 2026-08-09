import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';

export const Admin = () => {
  const { user, logout } = useContext(AuthContext);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  // Estado del formulario (para crear o editar)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    price: '',
    category: 'Cortes Finos',
    image: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos del producto en el formulario para editar
  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name || '',
      price: product.price || '',
      category: product.category || 'Cortes Finos',
      image: product.image || ''
    });
    setIsEditing(true);
  };

  // Limpiar el formulario
  const resetForm = () => {
    setFormData({ id: null, name: '', price: '', category: 'Cortes Finos', image: '' });
    setIsEditing(false);
  };

  // Guardar (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (isEditing) {
      updateProduct && updateProduct(formData);
    } else {
      addProduct && addProduct({ ...formData, id: Date.now() });
    }

    resetForm();
  };

  // Eliminar producto
  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      deleteProduct && deleteProduct(id);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center bg-stone-900 border border-stone-800 p-6 rounded-2xl mb-8 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-amber-500">Panel de Administración</h1>
          <p className="text-stone-400 text-sm">
            Sesión activa: <span className="text-amber-300 font-semibold">{user?.email || 'Admin'}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-900 hover:bg-red-800 text-red-200 px-4 py-2 rounded-lg font-semibold transition cursor-pointer text-sm"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulario de Agregar / Editar */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl h-fit">
          <h2 className="text-lg font-bold text-white mb-4">
            {isEditing ? '✏️ Editar Producto' : '➕ Agregar Producto'}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Nombre</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Bife de Chorizo"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Precio (S/)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="65.00"
                className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-500 text-sm"
              >
                <option value="Cortes Finos">Cortes Finos</option>
                <option value="Parrilladas Familiares">Parrilladas Familiares</option>
                <option value="Guarniciones">Guarniciones</option>
                <option value="Bebidas & Vinos">Bebidas & Vinos</option>
                <option value="Postres">Postres</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition text-sm cursor-pointer"
              >
                {isEditing ? 'Guardar Cambios' : 'Agregar al Menú'}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-stone-700 hover:bg-stone-600 text-stone-300 px-3 py-2.5 rounded-lg text-sm cursor-pointer"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de productos con botones Editar y Eliminar funcionando */}
        <div className="md:col-span-2 bg-stone-900 border border-stone-800 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Catálogo de Productos ({products?.length || 0})</h2>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {products && products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-stone-800 p-4 rounded-xl border border-stone-700 hover:border-amber-500/50 transition"
                >
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-xs text-amber-500">
                      {item.category} — <span className="font-semibold text-stone-300">S/ {Number(item.price).toFixed(2)}</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-amber-700/30 hover:bg-amber-600 text-amber-300 border border-amber-600/40 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-stone-500 text-sm text-center py-6">No hay productos registrados en el menú.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
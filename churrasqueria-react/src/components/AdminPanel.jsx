import { useState } from 'react'

export default function AdminPanel({ platos, onAgregar, onEditar, onEliminar }) {
  // Estado para controlar el formulario (creación/edición)
  const [isEditing, setIsEditing] = useState(false)
  const [currentDish, setCurrentDish] = useState({ name: '', price: '', desc: '', detail: '', ingredients: '', img: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentDish({
      ...currentDish,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    })
  }

  const handleEditClick = (dish) => {
    setCurrentDish(dish)
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Sube la pantalla al formulario
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentDish({ name: '', price: '', desc: '', detail: '', ingredients: '', img: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Si la imagen se deja vacía, le asignamos una por defecto de parrilla profesional
    const finalDish = {
      ...currentDish,
      img: currentDish.img.trim() || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600"
    }

    if (currentDish.id) {
      onEditar(currentDish.id, finalDish) // 📝 Editar existente a través de App.jsx
      alert("¡Plato actualizado correctamente!")
    } else {
      onAgregar(finalDish) // ➕ Crear nuevo plato a través de App.jsx
      alert("¡Nuevo plato registrado con éxito!")
    }
    handleCancel()
  }

  const handleEliminarClick = (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${name}" del menú?`)) {
      onEliminar(id) // ❌ Eliminar plato usando la función de App.jsx
    }
  }

  return (
    <div className="bg-stone-950 text-white p-6 rounded-2xl border border-stone-800 shadow-2xl max-w-6xl mx-auto my-8">
      <h3 className="text-2xl font-serif font-bold text-amber-500 mb-6 flex items-center gap-2">
        ⚙️ Panel de Gestión de Alimentos
      </h3>

      {/* FORMULARIO DE ACCIÓN (CREAR / EDITAR) */}
      <form onSubmit={handleSubmit} className="bg-stone-900/50 border border-stone-800 p-6 rounded-xl mb-10 space-y-4">
        <h4 className="text-lg font-bold text-white font-serif">
          {currentDish.id ? '📝 Editar Producto Seleccionado' : '➕ Añadir Nuevo Producto al Menú'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Nombre del Plato</label>
            <input type="text" name="name" value={currentDish.name} onChange={handleInputChange} className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 focus:border-amber-500 outline-none" required placeholder="Ej. Chorizo Amazónico" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Precio (S/)</label>
            <input type="number" step="0.1" name="price" value={currentDish.price} onChange={handleInputChange} className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-200 focus:border-amber-500 outline-none" required placeholder="35.00" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">URL de la Imagen (Opcional)</label>
            <input type="text" name="img" value={currentDish.img} onChange={handleInputChange} className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-300 focus:border-amber-500 outline-none" placeholder="https://enlace-imagen.com/foto.jpg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Descripción Corta</label>
            <input type="text" name="desc" value={currentDish.desc} onChange={handleInputChange} className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-300 focus:border-amber-500 outline-none" required placeholder="Corte jugoso acompañado de yucas fritas." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Ingredientes (Separados por coma)</label>
            <input type="text" name="ingredients" value={currentDish.ingredients} onChange={handleInputChange} className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-300 focus:border-amber-500 outline-none" required placeholder="Carne, yuca, ensalada fresca, chimichurri" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-400 uppercase mb-1">Detalle Ampliado (Se ve en el modal)</label>
          <textarea name="detail" rows="2" value={currentDish.detail} onChange={handleInputChange} className="w-full p-2.5 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-300 focus:border-amber-500 outline-none resize-none" required placeholder="Exquisito corte seleccionado de la mejor calidad, madurado y sellado al carbón caliente..."></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {(currentDish.id || currentDish.name) && (
            <button type="button" onClick={handleCancel} className="px-4 py-2 text-xs font-bold uppercase rounded-lg bg-stone-800 hover:bg-stone-700 transition">
              Cancelar
            </button>
          )}
          <button type="submit" className="px-6 py-2 text-xs font-bold uppercase rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white">
            {currentDish.id ? 'Guardar Cambios' : 'Registrar Plato'}
          </button>
        </div>
      </form>

      {/* TABLA DE PRODUCTOS ACTUALES */}
      <h4 className="text-lg font-serif font-bold mb-3 text-stone-300">Inventario Actual del Menú</h4>
      <div className="overflow-x-auto rounded-xl border border-stone-800">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-stone-900 text-stone-400 border-b border-stone-800 font-semibold uppercase text-xs">
              <th className="p-4">Vista</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Precio</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-900">
            {platos && platos.map((dish) => (
              <tr key={dish.id} className="hover:bg-stone-900/40 transition-colors">
                <td className="p-4">
                  <img src={dish.img} alt={dish.name} className="w-14 h-10 object-cover rounded-lg border border-stone-800 bg-stone-950" />
                </td>
                <td className="p-4 font-bold text-white">{dish.name}</td>
                <td className="p-4 text-stone-400 max-w-xs truncate">{dish.desc}</td>
                <td className="p-4 text-amber-500 font-mono font-bold">S/ {dish.price.toFixed(2)}</td>
                <td className="p-4 text-center flex justify-center gap-2">
                  <button onClick={() => handleEditClick(dish)} className="px-3 py-1.5 bg-amber-600/20 text-amber-400 hover:bg-amber-600 hover:text-white border border-amber-500/30 font-medium text-xs rounded-lg transition-all">
                    Editar ✏️
                  </button>
                  <button onClick={() => handleEliminarClick(dish.id, dish.name)} className="px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 font-medium text-xs rounded-lg transition-all">
                    Eliminar ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
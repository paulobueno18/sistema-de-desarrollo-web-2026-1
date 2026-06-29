export default function MenuItem({ dish, onDishClick }) {
  return (
    // 'w-full' asegura que ocupe todo el ancho disponible del grid
    // 'max-w-sm' evita que la tarjeta sea demasiado ancha en pantallas grandes
    // 'mx-auto' mantiene la tarjeta centrada en el espacio del grid
    <div className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full w-full max-w-sm mx-auto">
      
      {/* Imagen del plato: mantenemos aspect-video para que no se deforme */}
      <div className="relative cursor-pointer overflow-hidden aspect-video" onClick={() => onDishClick(dish)}>
        <img 
          src={dish.img} 
          alt={dish.name} 
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        <span className="absolute top-3 right-3 bg-amber-500/90 text-stone-950 font-bold px-3 py-1 rounded-lg text-sm">
          S/ {dish.price.toFixed(2)}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-serif font-bold text-white mb-2 break-words">
            {dish.name}
          </h3>
          <p className="text-stone-400 text-sm mb-4 line-clamp-3">
            {dish.desc}
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-2 border-t border-stone-900">
          <div>
            <label className="block text-xs text-stone-500 mb-1">Tamaño</label>
            <select className="w-full p-2 bg-stone-900 border border-stone-800 rounded-lg text-sm text-stone-300 focus:outline-none">
              <option>Regular</option>
              <option>Grande</option>
            </select>
          </div>

          <button 
            onClick={() => onDishClick(dish)}
            className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors uppercase tracking-wider"
          >
            Agregar al Pedido
          </button>
        </div>
        
      </div>
    </div>
  )
};
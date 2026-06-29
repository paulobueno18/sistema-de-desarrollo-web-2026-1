import { useCart } from '../context/CartContext'

export default function CartItem({ item, index }) {
  const { incrementItem, decrementItem, removeItem } = useCart()

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      
      {/* Detalle del plato */}
      <div className="flex-grow">
        <h4 className="font-serif font-bold text-white text-lg tracking-wide">{item.name}</h4>
        <p className="text-sm text-stone-400 mt-0.5 capitalize flex items-center gap-2">
          <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-xs border border-amber-500/20">
            {item.size}
          </span>
          • {item.qty} unidad{item.qty === 1 ? '' : 'es'}
        </p>
      </div>

      {/* Controles de Precio y Cantidad bien espaciados */}
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-800/50">
        
        {/* Bloque de Ajuste de Cantidad */}
        <div className="flex items-center bg-stone-800 p-1 rounded-lg border border-stone-700">
          <button
            onClick={() => decrementItem(index)}
            className="w-8 h-8 hover:bg-stone-700 rounded text-sm font-bold transition flex items-center justify-center text-stone-300"
          >
            −
          </button>
          <span className="w-8 flex items-center justify-center font-bold text-white text-sm">
            {item.qty}
          </span>
          <button
            onClick={() => incrementItem(index)}
            className="w-8 h-8 bg-accent hover:bg-accent/90 text-white rounded text-sm font-bold transition flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Desglose de Precios */}
        <div className="text-right min-w-[80px]">
          <p className="font-extrabold text-white text-base">
            S/ {(item.price * item.qty).toFixed(2)}
          </p>
          <p className="text-xs text-stone-500 mt-0.5">S/ {item.price.toFixed(2)} c/u</p>
        </div>

        {/* Botón de Eliminar */}
        <button
          onClick={() => removeItem(index)}
          className="text-stone-500 hover:text-red-500 p-1 rounded-lg hover:bg-red-500/10 transition duration-200 text-base"
          title="Eliminar del pedido"
        >
          ✕
        </button>
      </div>

    </div>
  )
};
import { useCart } from '../context/CartContext'

export default function CartItem({ item, index }) {
  const { incrementItem, decrementItem, removeItem } = useCart()

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
      <div className="flex-grow">
        <h4 className="font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-600">
          {item.size} • {item.qty} unidad{item.qty === 1 ? '' : 'es'}
        </p>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="text-right">
          <p className="font-bold text-primary-800">
            S/ {(item.price * item.qty).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">S/ {item.price.toFixed(2)} c/u</p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => decrementItem(index)}
            className="w-7 h-7 bg-gray-300 hover:bg-gray-400 rounded text-sm font-bold transition"
          >
            −
          </button>
          <span className="w-7 flex items-center justify-center font-semibold">
            {item.qty}
          </span>
          <button
            onClick={() => incrementItem(index)}
            className="w-7 h-7 bg-primary-700 hover:bg-primary-800 text-white rounded text-sm font-bold transition"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeItem(index)}
          className="text-red-500 hover:text-red-700 font-bold text-lg transition"
          title="Eliminar"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

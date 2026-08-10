import { useEffect, useState } from 'react'
import { getMenu, updateMenuPrice } from '../services/api'
import { MENU } from '../data/menu'

export default function AdminMenuEditor({ token }) {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [priceUpdates, setPriceUpdates] = useState({})

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await getMenu()
        setMenu(data)
      } catch (err) {
        setError('No se pudo cargar el menú administrativo. Cargando datos locales.')
        setMenu(MENU)
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  const handleChange = (id, value) => {
    setPriceUpdates((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async (item) => {
    const newPrice = Number(priceUpdates[item.id] ?? item.price)
    if (isNaN(newPrice) || newPrice <= 0) {
      setError('Ingresa un precio válido mayor a 0')
      return
    }

    try {
      setUpdatingId(item.id)
      const updated = await updateMenuPrice(item.id, newPrice, token)
      setMenu((prev) => prev.map((menuItem) => menuItem.id === item.id ? updated : menuItem))
      setError('')
      setUpdatingId(null)
    } catch (err) {
      setError(err.message)
      setUpdatingId(null)
    }
  }

  return (
    <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/20">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Menú administrativo</p>
          <h3 className="mt-2 text-2xl font-serif font-bold text-white">Precios y artículos</h3>
        </div>
        <p className="text-sm text-stone-400">Modifica precios en tiempo real y guarda los cambios en la base de datos.</p>
      </div>

      {loading ? (
        <p className="text-stone-300">Cargando menú...</p>
      ) : error ? (
        <p className="text-amber-300">{error}</p>
      ) : (
        <div className="space-y-4">
          {menu.map((item) => (
            <div key={item.id} className="rounded-3xl border border-stone-800 bg-stone-900/80 p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-stone-400">{item.desc}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={priceUpdates[item.id] ?? item.price}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    className="w-32 rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSave(item)}
                    disabled={updatingId === item.id}
                    className="rounded-2xl bg-accent px-4 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-stone-700"
                  >
                    {updatingId === item.id ? 'Guardando...' : 'Guardar precio'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

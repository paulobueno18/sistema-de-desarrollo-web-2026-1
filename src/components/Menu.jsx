import { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import { getMenu } from '../services/api'
import { MENU } from '../data/menu'

export default function Menu({ onDishClick }) {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await getMenu()
        setMenu(data)
      } catch (err) {
        setError('No fue posible cargar el menú desde el servidor. Usando menú local.')
        setMenu(MENU)
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  return (
    <section id="menu" className="border-t border-stone-800 bg-stone-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Lo mejor de la casa
          </div>
          <h2 className="text-3xl font-serif font-bold text-white sm:text-5xl">
            Especialidades <span className="text-accent">premium</span>
          </h2>
          <div className="mx-auto mt-4 mb-5 h-1 w-24 bg-accent"></div>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Cada plato combina tradición amazónica, presentación cuidada y un servicio pensado para destacar la experiencia del cliente.
          </p>
        </div>


        {loading && <p className="text-center text-stone-400">Cargando especialidades...</p>}

        {error && <p className="text-center text-amber-400">{error}</p>}

        {!loading && menu.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((dish) => (
              <MenuItem key={dish.id} dish={dish} onDishClick={onDishClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
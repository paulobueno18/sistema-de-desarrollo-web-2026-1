import MenuItem from './MenuItem'
import { MENU } from '../data/menu'

export default function Menu({ onDishClick }) {
  return (
    // Cambiado bg-white por bg-stone-900 y texto a blanco
    <section id="menu" className="py-20 bg-stone-900 border-t border-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="section-label text-accent font-semibold tracking-widest uppercase text-xs mb-2">
            Lo mejor de la casa
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Nuestras <span className="text-accent">Especialidades</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4 mb-4"></div>
          <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-base">
            Cinco platos únicos preparados a las brasas con ingredientes 
            seleccionados de la región amazónica.
          </p>
        </div>

        {/* Grid de platos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU.map(dish => (
            <MenuItem 
              key={dish.id} 
              dish={dish}
              onDishClick={onDishClick} 
            />
          ))}
        </div>
      </div>
    </section>
  )
};
import MenuItem from './MenuItem'
import { MENU } from '../data/menu'

export default function Menu({ onDishClick }) {
  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label">Lo mejor de la casa</div>
          <h2 className="section-title">
            Nuestras <span className="text-accent">Especialidades</span>
          </h2>
          <div className="divider"></div>
          <p className="section-sub">
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
              onViewDetails={() => onDishClick(dish)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Menu({ platos, onDishClick }) {
  return (
    <section className="py-16 bg-stone-950">
      <div className="max-w-6xl mx-auto px-4">
        <span className="section-label block text-center">Nuestra Especialidad</span>
        <h2 className="section-title">La Carta del Patricio</h2>
        <div className="divider"></div>
        
        {/* Grilla de platos dinámicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {platos.map((plato) => (
            <div 
              key={plato.id} 
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all cursor-pointer group"
              onClick={() => onDishClick(plato)}
            >
              {/* Imagen y Precio */}
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={plato.img} 
                  alt={plato.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-amber-500 text-stone-950 font-bold px-3 py-1 rounded-full text-sm shadow-md">
                  S/. {plato.price.toFixed(2)}
                </span>
              </div>
              
              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-serif">{plato.name}</h3>
                <p className="text-stone-400 text-sm line-clamp-2 mb-4">{plato.desc}</p>
                
                {/* Botón corregido a type="button" */}
                <button 
                  type="button" 
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold uppercase rounded-lg text-xs tracking-wider transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-950/30 flex items-center justify-center gap-2"
                >
                  <span className="text-sm"></span>
                  Ver más detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
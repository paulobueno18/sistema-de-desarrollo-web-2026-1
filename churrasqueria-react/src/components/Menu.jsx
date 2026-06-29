// 1. Ya NO necesitas importar el { MENU } de forma estática aquí adentro.
// 2. Modifica la función principal para que reciba "platos" y "onDishClick" por arriba:

export default function Menu({ platos, onDishClick }) {
  
  // ⚠️ IMPORTANTE: Si tenías una línea como: const [platos] = useState(MENU) bórrala.
  // Ahora "platos" llega directamente desde App.jsx listo para usar.

  return (
    <section className="py-16 bg-stone-950">
      <div className="max-w-6xl mx-auto px-4">
        <span className="section-label block text-center">Nuestra Especialidad</span>
        <h2 className="section-title">La Carta del Patricio</h2>
        <div className="divider"></div>
        
        {/* Aquí mapeas los platos dinámicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {platos.map((plato) => (
            <div 
              key={plato.id} 
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all cursor-pointer group"
              onClick={() => onDishClick(plato)}
            >
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
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-serif">{plato.name}</h3>
                <p className="text-stone-400 text-sm line-clamp-2">{plato.desc}</p>
                <div className="mt-4 text-xs text-amber-500/80 font-semibold tracking-wider uppercase">
                  ✨ Ver más detalles
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
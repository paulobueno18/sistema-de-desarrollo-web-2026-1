export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-100 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-700 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
          🔥 Puerto Maldonado, Madre de Dios
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
          Sabor y Tradición
          <br />
          <em className="text-accent">a la Parrilla</em>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Cortes seleccionados con el auténtico toque amazónico. Carbón, fuego y pasión en cada plato. 
          Pide ahora y paga con QR o banca online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="btn-primary">
            Ver Especialidades
          </a>
          <a href="#menu" className="btn-secondary">
            Mi Pedido
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary-700 text-sm font-semibold">
          ↓ Descubrir
        </div>
      </div>
    </section>
  )
}

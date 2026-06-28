export default function Hero() {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 text-white"
      style={{
        // Reemplaza esta URL si tienes una foto local en tu carpeta public (ej: '/img/hero-bg.jpg')
        backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Capa oscura superpuesta (Overlay) para que se lea bien el texto */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
          🔥 Puerto Maldonado, Madre de Dios
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-wide drop-shadow-md">
          Sabor y Tradición
          <br />
          <span className="text-accent block mt-2">a la Parrilla</span>
        </h1>

        <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto drop-shadow">
          Cortes seleccionados con el auténtico toque amazónico. Carbón, fuego y pasión en cada plato. 
          Pide ahora y paga con QR o banca online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#menu" className="btn-primary min-w-[180px] text-center">
            Ver Especialidades
          </a>
          <a href="#contacto" className="btn-secondary min-w-[180px] text-center bg-transparent border-white text-white hover:bg-white hover:text-black transition-all">
            Reservar Mesa
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-[-40px] md:bottom-[-60px] left-1/2 transform -translate-x-1/2 animate-bounce text-stone-400 text-sm font-semibold tracking-widest uppercase">
          <span className="block text-xs text-accent">↓</span> Descubrir
        </div>
      </div>
    </section>
  )
};
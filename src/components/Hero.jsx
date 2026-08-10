export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950 text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/75"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_50%)]"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <span className="mb-6 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 backdrop-blur-sm">
          🔥 Restaurante premium • Puerto Maldonado
        </span>

        <h1 className="mb-6 text-4xl font-serif font-bold tracking-wide text-white drop-shadow-md sm:text-5xl lg:text-7xl">
          Experiencia gastronómica
          <br />
          <span className="mt-2 block text-accent">de alto nivel para clientes y empresa</span>
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-stone-300 sm:text-xl">
          Desde reservas y pedidos hasta una atención cuidada, presentamos una propuesta elegante y funcional para ofrecer una experiencia memorable tanto al cliente como a la operación del negocio.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#menu" className="min-w-[220px] rounded-full bg-accent px-6 py-3 text-center font-semibold text-white transition hover:bg-amber-600">
            Ver especialidades
          </a>
          <a href="#contacto" className="min-w-[220px] rounded-full border border-white/40 bg-white/10 px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-stone-950">
            Reservar mesa
          </a>
        </div>

        <div className="mt-12 grid gap-4 text-left md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Servicio</p>
            <p className="mt-2 text-sm text-stone-300">Atención rápida, cálida y organizada para cada cliente.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Cocina</p>
            <p className="mt-2 text-sm text-stone-300">Platos preparados con tradición, calidad y sabor auténtico.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Gestión</p>
            <p className="mt-2 text-sm text-stone-300">Control sencillo de reservas y pedidos desde un panel profesional.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
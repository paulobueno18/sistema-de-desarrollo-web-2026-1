export default function SelectionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-4 text-white">
      <div className="max-w-3xl rounded-[2rem] border border-stone-800 bg-stone-900/90 p-10 shadow-2xl shadow-black/30">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-400">Elige tu acceso</p>
          <h1 className="mt-4 text-4xl font-serif font-bold text-white sm:text-5xl">
            Plataforma de cliente y administración
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone-400 sm:text-base">
            Selecciona la experiencia que necesitas: pedidos y reservas para clientes o gestión para el equipo administrativo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <a
            href="#/cliente"
            className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 text-center transition hover:border-amber-400 hover:bg-amber-500/15"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Acceso Cliente</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Reservas y pedidos</h2>
            <p className="mt-3 text-sm text-stone-300">
              Navega el menú, agrega productos, reserva mesa y envía el pedido vía WhatsApp.
            </p>
          </a>

          <a
            href="#/admin"
            className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center transition hover:border-emerald-400 hover:bg-emerald-500/15"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">Acceso Admin</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Gestión interna</h2>
            <p className="mt-3 text-sm text-stone-300">
              Administra pedidos y reservas desde un panel seguro y profesional.
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}

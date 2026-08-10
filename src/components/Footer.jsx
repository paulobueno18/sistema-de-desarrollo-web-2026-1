export default function Footer() {
  return (
    <footer className="bg-stone-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <div className="mb-3 font-serif text-2xl font-bold">
              El Rinconcito <span className="text-accent">del Patricio</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-400">
              Parrilla premium en Puerto Maldonado, con una propuesta moderna para el cliente y una operación profesional para la empresa.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-[0.25em] text-stone-200">Navegación</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="#inicio" className="transition hover:text-accent">Inicio</a></li>
              <li><a href="#menu" className="transition hover:text-accent">Menú</a></li>
              <li><a href="#contacto" className="transition hover:text-accent">Contacto</a></li>
              <li><span className="text-stone-500">Firebase Ready</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold uppercase tracking-[0.25em] text-stone-200">Información</h4>
            <p className="text-sm leading-relaxed text-stone-400">
              Teléfono: 993 018 321<br />
              Email: cesarbueno677@gmail.com<br />
              Puerto Maldonado, Madre de Dios
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
          <p>&copy; 2026 El Rinconcito del Patricio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

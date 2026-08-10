export default function Navbar({ onCartClick, route = 'client', cartCount = 0 }) {
  const brandLink = route === 'admin' ? '#/admin' : '#/cliente'
  const secondaryLink = route === 'admin' ? '#/cliente' : null
  const secondaryLabel = route === 'admin' ? 'Cliente' : null

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/90 bg-stone-950/95 backdrop-blur-xl text-white shadow-2xl shadow-black/20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-lg font-semibold text-amber-400">
            R
          </div>
          <div>
            <a href={brandLink} className="text-lg font-serif font-bold tracking-wide text-white sm:text-xl">
              El Rinconcito <span className="text-accent">del Patricio</span>
            </a>
            <p className="text-[11px] uppercase tracking-[0.35em] text-stone-400">
              Parrilla premium • Puerto Maldonado
            </p>
          </div>
        </div>

        <div className="hidden items-center space-x-2 md:flex">
          {secondaryLink && (
            <a
              href={secondaryLink}
              className="rounded-full bg-stone-900/80 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:bg-stone-800"
            >
              {secondaryLabel}
            </a>
          )}

        </div>

        {route === 'client' && (
          <button
            onClick={onCartClick}
            className="relative rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Mi pedido ({cartCount})
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </nav>
    </header>
  )
}
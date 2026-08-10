export default function MenuItem({ dish, onDishClick }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-amber-500/40">
      <div className="relative aspect-video cursor-pointer overflow-hidden" onClick={() => onDishClick(dish)}>
        <img
          src={dish.img}
          alt={dish.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-amber-500/95 px-3 py-1 text-sm font-bold text-stone-950">
          S/ {dish.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-grow flex-col justify-between p-5">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-300">
            Especialidad
          </div>
          <h3 className="mb-2 break-words font-serif text-xl font-bold text-white">
            {dish.name}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-stone-400 line-clamp-3">
            {dish.desc}
          </p>
        </div>

        <div className="mt-auto space-y-3 border-t border-stone-900 pt-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
              Tamaño
            </label>
            <select className="w-full rounded-xl border border-stone-800 bg-stone-900 p-2.5 text-sm text-stone-300 focus:outline-none focus:border-amber-500">
              <option>Regular</option>
              <option>Grande</option>
            </select>
          </div>

          <button
            onClick={() => onDishClick(dish)}
            className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-amber-600"
          >
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  )
}
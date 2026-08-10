import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('TODOS');

  const categories = [
    'TODOS',
    'CORTES FINOS',
    'PARRILLADAS FAMILIARES',
    'GUARNICIONES',
    'BEBIDAS & VINOS',
    'POSTRES'
  ];

  // Filtrado insensible a mayúsculas/minúsculas
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'TODOS') return true;
    
    return (
      product.category?.trim().toLowerCase() ===
      selectedCategory?.trim().toLowerCase()
    );
  });

  return (
    <div>
      {/* HERO / BANNER PRINCIPAL */}
      <section className="text-center py-12 px-4 bg-[#1a0c02] text-amber-500">
        <h1 className="text-5xl font-extrabold tracking-wide uppercase mb-4">
          LA ESTANCIA <br /> CHURRASQUERÍA
        </h1>
        <p className="text-lg text-amber-200 max-w-2xl mx-auto font-light">
          Cortes seleccionados, fuego de leña y la tradición artesanal del verdadero churrasco.
        </p>
      </section>

      {/* CONTENIDO PRINCIPAL: CATEGORÍAS Y PRODUCTOS */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Botones de Categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/40'
                  : 'bg-white text-stone-800 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-stone-400">
              No se encontraron productos disponibles en la categoría{' '}
              <span className="font-semibold text-amber-500">{selectedCategory}</span>.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
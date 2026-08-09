import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

// Productos iniciales por defecto
const defaultProducts = [
  { id: 1, name: 'Bife de Chorizo 400g', price: 65.00, category: 'Cortes Finos' },
  { id: 2, name: 'Parrillada La Estancia (4 personas)', price: 180.00, category: 'Parrilladas Familiares' },
  { id: 3, name: 'Papas al Horno con Romero', price: 18.00, category: 'Guarniciones' }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });

  // Guarda automáticamente en localStorage cada vez que la lista cambia
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Función para agregar
  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
  };

  // Función para editar / actualizar
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        String(item.id) === String(updatedProduct.id) ? { ...item, ...updatedProduct } : item
      )
    );
  };

  // Función para eliminar
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
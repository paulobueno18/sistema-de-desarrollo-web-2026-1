import React, { createContext, useState, useContext } from 'react';
import { MENU as INITIAL_MENU } from '../data/menu'; // 👈 Importamos el menú base

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  // 👈 Estado global para los productos (permitirá agregar y editar en tiempo real)
  const [products, setProducts] = useState(INITIAL_MENU);

  const addToCart = (item, size = 'regular') => {
    setCart((prevCart) => {
      const extra = size === 'grande' ? 8.00 : 0;
      const price = item.price + extra;
      const existingIndex = prevCart.findIndex((i) => i.id === item.id && i.size === size);
      
      if (existingIndex > -1) {
        return prevCart.map((cartItem, i) => 
          i === existingIndex ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      } else {
        return [...prevCart, { id: item.id, name: item.name, size, qty: 1, price }];
      }
    });
  };

  const incrementItem = (index) => {
    setCart((prevCart) => 
      prevCart.map((item, i) => 
        i === index ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementItem = (index) => {
    setCart((prevCart) => {
      if (prevCart[index]?.qty <= 1) {
        return prevCart.filter((_, i) => i !== index);
      }
      return prevCart.map((item, i) => 
        i === index ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  const removeItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const getTotal = () => cart.reduce((total, item) => total + (item.price * item.qty), 0);
  
  const getItemCount = () => cart.reduce((count, item) => count + item.qty, 0);

  // 🛠️ FUNCIÓN PARA EDITAR UN PRODUCTO EXISTENTE
  const updateProduct = (updatedDish) => {
    setProducts((prevProducts) =>
      prevProducts.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish))
    );
  };

  // 🛠️ FUNCIÓN PARA CREAR UN NUEVO PRODUCTO
  const addProduct = (newDish) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newDish, id: Date.now() } // Generamos un ID único usando los milisegundos actuales
    ]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      products, // 👈 Compartimos la lista dinámica de productos
      addToCart, 
      incrementItem, 
      decrementItem, 
      removeItem, 
      clearCart, 
      getTotal, 
      getItemCount,
      updateProduct, //  Pasamos la función de editar
      addProduct    // Pasamos la función de crear
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
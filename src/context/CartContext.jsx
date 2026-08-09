import { createContext, useState, useEffect } from 'react';
import { calculateTotal } from '../utils/helpers';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('churrasqueria_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('churrasqueria_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, doneness = 'Término medio', quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.doneness === doneness
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevCart, { ...product, doneness, quantity }];
    });
  };

  const removeFromCart = (id, doneness) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.doneness === doneness))
    );
  };

  const clearCart = () => setCart([]);

  const totalAmount = calculateTotal(cart);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

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

  return (
    <CartContext.Provider value={{ cart, addToCart, incrementItem, decrementItem, removeItem, clearCart, getTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
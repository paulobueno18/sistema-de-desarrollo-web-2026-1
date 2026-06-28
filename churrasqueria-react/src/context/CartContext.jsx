import React, { createContext, useState, useContext } from 'react'

// Crear el contexto
const CartContext = createContext()

// Proveedor del contexto
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Agregar item al carrito
  const addToCart = (item, size = 'regular') => {
    setCart(prevCart => {
      const extra = size === 'grande' ? 8.00 : 0
      const price = item.price + extra
      
      // Buscar si el item ya existe con el mismo tamaño
      const existingIndex = prevCart.findIndex(i => i.id === item.id && i.size === size)
      
      if (existingIndex > -1) {
        // Si existe, incrementar cantidad
        const updated = [...prevCart]
        updated[existingIndex].qty += 1
        return updated
      } else {
        // Si no existe, agregar nuevo
        return [...prevCart, {
          id: item.id,
          name: item.name,
          size,
          qty: 1,
          price
        }]
      }
    })
  }

  // Incrementar cantidad de un item
  const incrementItem = (index) => {
    setCart(prevCart => {
      const updated = [...prevCart]
      if (updated[index]) {
        updated[index].qty += 1
      }
      return updated
    })
  }

  // Decrementar cantidad de un item
  const decrementItem = (index) => {
    setCart(prevCart => {
      const updated = [...prevCart]
      if (updated[index]) {
        updated[index].qty -= 1
        if (updated[index].qty <= 0) {
          updated.splice(index, 1)
        }
      }
      return updated
    })
  }

  // Eliminar un item del carrito
  const removeItem = (index) => {
    setCart(prevCart => {
      const updated = [...prevCart]
      updated.splice(index, 1)
      return updated
    })
  }

  // Limpiar el carrito
  const clearCart = () => {
    setCart([])
  }

  // Calcular total
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0)
  }

  // Contar items
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      getTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}

# 📚 Mapeo de Conceptos de PDFs al Código React

Este documento muestra dónde se aplican los conceptos de cada PDF en el proyecto.

---

## 1. 📄 **FundamentosdeJS.pdf**

### Conceptos Principales:
- Variables (const, let, var)
- Tipos de datos
- Operadores
- Funciones básicas
- Condicionales y bucles

### Aplicación en el Código:

```javascript
// src/context/CartContext.jsx - Declaración de variables con const
const CartContext = createContext()

// Funciones flecha
const addToCart = (item, size = 'regular') => {
  // Lógica aquí
}

// Template literals (backticks)
`${item.name} - S/ ${item.price.toFixed(2)}`

// Operador ternario
{cart.length === 0 ? <p>Vacío</p> : <CartList />}

// Bucles y arrays
MENU.forEach(dish => {
  // Procesar cada plato
})
```

**Archivos relevantes:**
- `src/context/CartContext.jsx`
- `src/components/CartItem.jsx`
- `src/data/menu.js`

---

## 2. 🎯 **FuncionesJavaScript.pdf**

### Conceptos Principales:
- Declaración de funciones
- Parámetros y argumentos
- Return values
- Scope
- Closures
- Funciones de orden superior (HOF)

### Aplicación en el Código:

```javascript
// Función con parámetros por defecto
function addToCart(item, size = 'regular') { }

// Función de orden superior (HOF)
// useCart() es una función que retorna funciones
export function useCart() {
  const context = useContext(CartContext)
  return context
}

// Callback functions
const handleAddToCart = (e) => {
  e.stopPropagation()
  addToCart(dish, size)
}

// Métodos de array (funciones de orden superior)
state.cart.forEach(item => renderCart())
const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
const existing = cart.find(i => i.id === item.id)
```

**Archivos relevantes:**
- `src/context/CartContext.jsx` - Funciones principales
- `src/components/MenuItem.jsx` - Manejo de eventos
- `src/components/CartModal.jsx` - Funciones del carrito

---

## 3. 🔄 **Objetosdesestructuracion.pdf**

### Conceptos Principales:
- Objetos
- Propiedades
- Métodos
- Desestructuración de objetos
- Desestructuración de arrays
- Spread operator (...)

### Aplicación en el Código:

```javascript
// Desestructuración de objetos en parámetros
const MenuItem = ({ dish, onViewDetails }) => {
  // dish es desestructurado del objeto props
}

// Desestructuración del contexto
const { cart, addToCart, incrementItem, decrementItem } = useCart()

// Desestructuración en arrays
const [cart, setCart] = useState([])
const [size, setSize] = useState('regular')

// Objeto con propiedades
const dish = {
  id: 1,
  name: 'Picanha',
  price: 45.00,
  desc: '...',
  ingredients: '...'
}

// Spread operator para copiar arrays
setCart(prevCart => [...prevCart, newItem])

// Spread para actualizar objetos
const updated = { ...cart, qty: cart.qty + 1 }
```

**Archivos relevantes:**
- `src/context/CartContext.jsx` - Desestructuración
- `src/components/MenuItem.jsx` - Props desestructurados
- `src/data/menu.js` - Objetos de platos
- Todos los componentes usan desestructuración

---

## 4. 🌐 **FecthAPI.pdf**

### Conceptos Principales:
- Fetch API
- Promesas (Promise)
- Async/Await
- JSON
- Manejo de errores con .catch()

### Aplicación en el Código:

⚠️ **Nota**: El proyecto original usaba Fetch para comunicarse con el backend.  
En esta versión **SIN backend**, los datos están en memoria.

**Si necesitaras agregar backend:**

```javascript
// Ejemplo de cómo usarías Fetch
useEffect(() => {
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart, total })
  })
    .then(response => response.json())
    .then(data => console.log('Orden creada:', data))
    .catch(error => console.error('Error:', error))
}, [])

// Con Async/Await
async function confirmarPago(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}/confirm`, {
      method: 'POST'
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error confirmando pago:', error)
  }
}
```

**Archivos relevantes:**
- `src/components/CartModal.jsx` - Línea 27 (comentario sobre backend)
- Estructura disponible para integración futura

---

## 5. 🚀 **InicioReactVite.pdf**

### Conceptos Principales:
- ¿Qué es React?
- Componentes funcionales
- JSX
- Props
- Hooks (useState, useEffect)
- Virtual DOM

### Aplicación en el Código:

```javascript
// Componente funcional de React
export default function MenuItem({ dish, onViewDetails }) {
  // Hook de estado
  const [size, setSize] = useState('regular')

  return (
    // JSX - sintaxis HTML en JavaScript
    <div className="rounded-xl shadow-lg">
      <img src={dish.img} alt={dish.name} />
      <h3>{dish.name}</h3>
      <button onClick={handleAddToCart}>
        Agregar
      </button>
    </div>
  )
}
```

**Archivos relevantes:**
- `src/App.jsx` - Componente raíz
- `src/components/*.jsx` - Todos los componentes
- `src/context/CartContext.jsx` - Context con hooks

---

## 6. 🎨 **ConfiguracionTailwindReactVite.pdf**

### Conceptos Principales:
- Instalación de Tailwind
- Configuración (tailwind.config.js)
- Directivas de Tailwind (@tailwind, @layer)
- Utility classes
- Responsive design (sm:, md:, lg:)
- Temas personalizados

### Aplicación en el Código:

```javascript
// tailwind.config.js - Configuración de tema personalizado
export default {
  theme: {
    extend: {
      colors: {
        primary: { 50: '#faf5f0', 700: '#8b4513' },
        accent: '#d4af37'
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif']
      }
    }
  }
}

// src/index.css - Directivas de Tailwind
@tailwind base;
@tailwind components;
@tailwind utilities;

// En componentes - Clases Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <button className="btn-primary hover:bg-primary-800 transition">
    Agregar
  </button>
</div>
```

**Archivos relevantes:**
- `tailwind.config.js` - Configuración
- `src/index.css` - Directivas y componentes personalizados
- Todos los `.jsx` usan clases Tailwind

---

## 7. 💾 **SPAContext.pdf**

### Conceptos Principales:
- SPA (Single Page Application)
- Context API
- useContext Hook
- Evitar prop drilling
- Provider pattern

### Aplicación en el Código:

```javascript
// src/context/CartContext.jsx - Crear contexto
const CartContext = createContext()

// Provider que envuelve la app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  
  return (
    <CartContext.Provider value={{ cart, addToCart, ... }}>
      {children}
    </CartContext.Provider>
  )
}

// src/App.jsx - Usar el Provider
<CartProvider>
  <Navbar />
  <Menu />
  <CartModal />
</CartProvider>

// Componentes - Consumir contexto sin prop drilling
const { cart, addToCart } = useCart()
```

**Sin Context (prop drilling - ❌ ineficiente):**
```javascript
<App cart={cart} addToCart={addToCart}>
  <Layout cart={cart} addToCart={addToCart}>
    <Menu cart={cart} addToCart={addToCart}>
      <MenuItem cart={cart} addToCart={addToCart} />
    </Menu>
  </Layout>
</App>
```

**Con Context (✅ limpio):**
```javascript
// MenuItem accede directamente al contexto
const { cart, addToCart } = useCart()
```

**Archivos relevantes:**
- `src/context/CartContext.jsx` - Implementación completa de Context
- `src/App.jsx` - Provider
- Todos los componentes que usan `useCart()`

---

## 8. 🧪 **TestingReact.pdf**

### Conceptos Principales:
- Testing en React
- Jest
- React Testing Library
- Testing de componentes
- Testing de hooks

### Aplicación en el Código:

⚠️ **No está implementado en esta versión**, pero aquí hay ejemplos:

```javascript
// Ejemplo: Test para CartContext
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './context/CartContext'

test('addToCart agrega un item al carrito', () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  )
  
  const { result } = renderHook(() => useCart(), { wrapper })

  act(() => {
    result.current.addToCart(
      { id: 1, name: 'Picanha', price: 45 },
      'regular'
    )
  })

  expect(result.current.cart).toHaveLength(1)
  expect(result.current.cart[0].name).toBe('Picanha')
})

// Test de componente MenuItem
import { render, screen, fireEvent } from '@testing-library/react'
import MenuItem from './components/MenuItem'

test('botón de agregar al carrito funciona', () => {
  const mockDish = { id: 1, name: 'Test', price: 50 }
  const mockHandler = jest.fn()

  render(<MenuItem dish={mockDish} onViewDetails={mockHandler} />)

  fireEvent.click(screen.getByText('Agregar al Pedido'))

  expect(mockHandler).not.toHaveBeenCalled() // Click en el card
})
```

**Para implementar testing:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

---

## 📊 Resumen: Dónde Encontrar Cada Concepto

| PDF | Concepto | Archivo | Línea aprox |
|-----|----------|---------|-----------|
| Fundamentos JS | Variables | CartContext.jsx | 5-10 |
| Fundamentos JS | Template literals | MenuItem.jsx | 30-35 |
| Funciones | Arrow functions | CartContext.jsx | 8-12 |
| Funciones | Reduce | CartContext.jsx | 62-65 |
| Objetos | Desestructuración | MenuItem.jsx | 4-5 |
| Objetos | Spread operator | CartContext.jsx | 20-25 |
| Fetch API | Promesas | CartModal.jsx | ~35 |
| React Vite | Componentes | App.jsx | 1-30 |
| React Vite | JSX | Todos los .jsx | - |
| Tailwind | Clases | Todos los .jsx | - |
| Context | Provider | CartContext.jsx + App.jsx | - |
| Testing | (No implementado) | - | - |

---

## 🎓 Cómo Usar Este Documento

1. **Aprende un concepto** del PDF correspondiente
2. **Busca en la tabla** dónde se aplica en el código
3. **Abre el archivo** indicado
4. **Estudia el ejemplo** real en el proyecto
5. **Experimenta**: Modifica el código y ve qué pasa

¡Buen aprendizaje! 🚀

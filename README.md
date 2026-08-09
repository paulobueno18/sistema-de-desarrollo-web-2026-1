# Churrasquería El Rinconcito del Patricio - React + Vite + Tailwind

Migración moderna del proyecto original a **React 18** con **Vite** y **Tailwind CSS**.

## 🚀 Características

- ✅ **React 18** con Hooks (useState, useContext)
- ✅ **Vite** - Build tool ultra rápido
- ✅ **Tailwind CSS** - Utilidades de CSS moderno
- ✅ **Context API** - Gestión global de estado (carrito)
- ✅ **Componentes reutilizables** - Arquitectura limpia y modular
- ✅ **Responsive Design** - Mobile-first
- ✅ **SIN backend/server** - Todo se ejecuta en el navegador

## 📦 Estructura del Proyecto

```
churrasqueria-react/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Menu.jsx
│   │   ├── MenuItem.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── CartModal.jsx
│   │   ├── CartItem.jsx
│   │   └── DishModal.jsx
│   ├── context/
│   │   └── CartContext.jsx  # Context API para el carrito
│   ├── data/
│   │   └── menu.js          # Datos de los platos
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Tailwind + estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🛠️ Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar modo desarrollo

```bash
npm run dev
```

Se abrirá automáticamente en `http://localhost:5173`

### 3. Generar build para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### 4. Preview del build

```bash
npm run preview
```

## 📚 Conceptos de JavaScript y React Implementados

### 1. **Fundamentos de JavaScript**
- Variables (const, let)
- Funciones flecha (`=>`)
- Template literals (backticks)
- Operador ternario

### 2. **Objetos y Desestructuración**
```jsx
// Desestructuración de objetos
const { cart, addToCart } = useCart()

// Desestructuración en parámetros
const MenuItem = ({ dish, onViewDetails }) => {}
```

### 3. **Array Methods**
```javascript
// map(), filter(), reduce(), find()
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
const existing = cart.find(i => i.id === dish.id && i.size === size)
```

### 4. **React Hooks**
- `useState()` - Gestión de estado local
- `useContext()` - Consumir Context API
- `useCallback()` - Optimización de funciones

### 5. **Context API**
```jsx
// Crear un contexto global para el carrito
<CartProvider>
  <App />
</CartProvider>

// Usar en cualquier componente
const { cart, addToCart } = useCart()
```

### 6. **Componentes Funcionales**
Todos los componentes son funcionales usando hooks en lugar de clases.

### 7. **Props y Drilling**
```jsx
// Pasar datos entre componentes
<MenuItem dish={dish} onViewDetails={handleOpenDish} />
```

### 8. **Eventos y Forms**
```jsx
// Manejadores de eventos
onClick={() => addToCart(dish)}
onChange={(e) => setSize(e.target.value)}
```

### 9. **Condicionales en JSX**
```jsx
{cart.length === 0 ? (
  <p>Carrito vacío</p>
) : (
  <CartList />
)}
```

### 10. **Destructuración en Imports**
```javascript
import { useState } from 'react'
import { CartProvider } from './context/CartContext'
```

## 🎨 Tailwind CSS - Utilidades Usadas

- Grid system (`grid`, `grid-cols-*`)
- Flexbox (`flex`, `items-center`, `justify-between`)
- Responsive design (`sm:`, `md:`, `lg:`)
- Colors personalizados (tema de colores de la churrasquería)
- Transiciones y animaciones (`hover:`, `transition`)
- Espaciado (`p-*`, `m-*`, `gap-*`)

## 🔄 Flujo de Datos

```
Navbar (muestra contador)
    ↓
Menu → MenuItem → DishModal
    ↓
CartContext (estado global del carrito)
    ↓
CartModal → CartItem (mostrar y editar carrito)
```

## 💡 Mejoras vs Original

| Aspecto | Original (Vanilla JS) | React + Vite |
|--------|----------------------|-------------|
| Estado | Objeto simple | React Context API |
| Re-renders | Manual (DOM) | Automático |
| Componentes | Funciones | Componentes React |
| Estilos | CSS plano | Tailwind CSS |
| Build | HTML directo | Vite (optimizado) |
| Backend | Node.js (server.js) | Eliminado ✅ |
| Performance | Medio | Rápido ⚡ |

## 🚀 Próximos Pasos (Opcional)

1. **Persistencia de datos**: Guardar carrito en localStorage
   ```jsx
   useEffect(() => {
     localStorage.setItem('cart', JSON.stringify(cart))
   }, [cart])
   ```

2. **Filtros del menú**: Agregar categorías
3. **Sistema de autenticación**: Login/registro
4. **Backend real**: Conectar con API (Node.js/Express)
5. **Testing**: Jest + React Testing Library
6. **Animaciones**: Framer Motion

## 📄 Licencia

Proyecto educativo - UNAMAD Ingeniería de Sistemas

---

**Creado por**: Bueno Quiñones Paulo Cesar & Hurtado Quispe Mark Leonel  
**Año**: 2026

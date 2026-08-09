# 🚀 Inicio Rápido - Churrasquería React

## ⚡ En 3 pasos

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Ejecutar
```bash
npm run dev
```

### 3️⃣ Abrir navegador
```
http://localhost:5173
```

¡Listo! 🎉

---

## 📂 Archivos Principales

```
src/
├── components/          # Componentes React (interfaz)
├── context/
│   └── CartContext.jsx  # Gestión global del carrito
├── data/
│   └── menu.js          # Datos de los platos
├── App.jsx              # Componente principal
└── index.css            # Estilos con Tailwind
```

---

## 🎯 Prueba estas acciones

1. **Agregar al carrito**: Haz click en "Agregar al Pedido"
2. **Ver detalles**: Haz click en una tarjeta de plato
3. **Modificar cantidad**: Usa los botones + y -
4. **Ver carrito**: Click en "Mi pedido"
5. **Cambiar tamaño**: Selecciona Regular o Grande

---

## 📚 Conceptos Clave Usados

✅ **React Hooks** - useState, useContext  
✅ **Context API** - Carrito global sin prop drilling  
✅ **Desestructuración** - Props y objetos  
✅ **Array Methods** - map, filter, reduce, find  
✅ **Tailwind CSS** - Diseño responsivo  

---

## 🔗 Documentación

- `README.md` - Guía completa
- `CONCEPTOS_POR_ARCHIVO.md` - Mapeo de conceptos de PDFs
- `vite.config.js` - Configuración de Vite
- `tailwind.config.js` - Configuración de estilos

---

## 💡 Próximos Pasos

### Guardar carrito en localStorage
```javascript
// En CartContext.jsx
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

useEffect(() => {
  const saved = localStorage.getItem('cart')
  if (saved) setCart(JSON.parse(saved))
}, [])
```

### Agregar más categorías
```javascript
// Editar src/data/menu.js
// Agregar propiedad "categoria" a cada plato
```

### Conectar con backend
```javascript
// En CartModal.jsx, reemplazar el alert por:
const response = await fetch('/api/orders', {
  method: 'POST',
  body: JSON.stringify({ cart, total })
})
```

---

**¡Felicidades! Ya tienes una app React moderna funcionando 🎉**

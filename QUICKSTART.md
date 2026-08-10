# 🚀 Inicio Rápido - Churrasquería React

Este documento describe cómo iniciar el proyecto real, que incluye frontend en React y backend local con administración.

---

## ⚡ En 4 pasos

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Ejecutar frontend
```bash
npm run dev
```

### 3️⃣ Ejecutar backend
```bash
npm run dev:server
```

### 4️⃣ Abrir el navegador
```bash
http://localhost:5173
```

Si el backend se ejecuta en otro puerto, revisa la configuración de `server/server.js` y el código del frontend.

---

## 📂 Archivos principales importantes

```
churrasqueria-react/
├── public/                   # Archivos públicos, imágenes y menu.json
├── server/                   # Backend Express y rutas API
│   └── server.js
├── src/                      # Frontend React
│   ├── components/           # Componentes visuales
│   ├── context/              # Context API del carrito
│   ├── data/                 # Datos del menú
│   ├── App.jsx
│   └── main.jsx
├── package.json              # Scripts de frontend/backend
├── vite.config.js            # Configuración de Vite
└── README.md                 # Guía completa del proyecto
```

---

## 🎯 Qué puedes probar

1. **Abrir el menú** y ver los platos con imagen.
2. **Agregar productos al carrito** desde el menú.
3. **Ver y editar el carrito** en la interfaz.
4. **Hacer una reserva** desde el formulario de contacto.
5. **Ir al panel admin** si el backend está activo y editar precios.

---

## 🔌 Frontend y backend

- El frontend se sirve con **Vite** en `http://localhost:5173`.
- El backend se ejecuta con **Express** desde `server/server.js`.
- El backend administra:
  - menú dinámico
  - edición de precios
  - órdenes y reservas

---

## 📱 Acceso desde móvil o red local

Si quieres acceder desde tu móvil en la misma red Wi-Fi:

1. Inicia el frontend con `npm run dev`.
2. Encuentra la IP local de tu PC.
3. Usa en el móvil:
   - `http://<IP_PC>:5173`

Para exponerlo temporalmente por internet, puedes usar:

```bash
ngrok http 5173
```

> `ngrok` es seguro para pruebas: no modifica tu proyecto ni tus archivos. Solo crea una URL pública temporal hacia tu app local.

---

## 🛠️ Conceptos clave usados

- **React Hooks** (`useState`, `useContext`)
- **Context API** para el carrito global
- **Tailwind CSS** para estilos responsivos
- **Express** para el backend local
- **Prisma / SQLite** para datos persistentes
- **JWT** para administración segura

---

## 💡 Notas importantes

- El proyecto está pensado como un sistema local de desarrollo.
- El backend no está desplegado en producción.
- `ngrok` permite pruebas temporales desde otros dispositivos.

---

**¡Listo! Ya tienes el inicio rápido alineado con el proyecto real.**

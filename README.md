# Churrasquería El Rinconcito del Patricio - React + Vite + Tailwind

Este subproyecto contiene la versión moderna del sistema de la churrasquería, con frontend en React y soporte local para backend y administración.

---

## ✅ Qué se hizo

- Se migró la app original a **React 18** con **Vite** y **Tailwind CSS**.
- Se agregó un **backend local** en `server/server.js` para rutas de administración y datos persistentes.
- Se construyó una interfaz de cliente profesional con:
  - menú de platos
  - carrito de compra
  - sección de contacto y reservas
- Se añadió un **panel administrativo** para editar precios y revisar órdenes/reservas.
- Se ajustó el catálogo para usar imágenes reales en `public/images/`.
- Se preparó el proyecto para ejecutarse en local y para accederlo desde móvil o usar `ngrok`.

---

## 📂 Estructura principal

```
churrasqueria-react/
├── public/                 # Recursos públicos y assets (imágenes, menu.json)
├── server/                 # Backend Express, rutas API y servidor local
├── src/                    # Frontend React
│   ├── components/         # Componentes UI
│   ├── context/            # Context API
│   ├── data/               # Datos del menú
│   └── App.jsx
├── package.json            # Scripts y dependencias
├── vite.config.js          # Config Vite
└── README.md               # Documentación del subproyecto
```

---

## 🚀 Cómo ejecutar localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar frontend y backend

```bash
npm run dev
npm run dev:server
```

- `npm run dev` arranca Vite en `http://localhost:5173`
- `npm run dev:server` arranca el backend Express local

---

## 🌐 Acceso desde móvil o red local

Para ver la app desde el móvil:

1. Conecta PC y móvil a la misma red Wi-Fi.
2. Ejecuta `npm run dev`.
3. En el móvil usa la IP local del PC:
   - `http://<IP_PC>:5173`

Si necesitas compartirla temporalmente por internet con otro dispositivo, usa `ngrok`:

```bash
ngrok http 5173
```

---

## 🔧 Tecnologías usadas

- React 18
- Vite
- Tailwind CSS
- Express
- Prisma
- SQLite
- JSON Web Tokens (JWT)
- Fetch / API REST

---

## 🧩 Notas importantes

- La aplicación funciona principalmente como un proyecto local de desarrollo.
- El backend es local y no está desplegado en producción.
- `ngrok` solo debe usarse para pruebas temporales y no como despliegue final.

---

## 🚀 Mejora principal respecto al original

Se agregó soporte para administración local y persistencia de datos, haciendo la aplicación más cercana a un sistema real de restaurante.

---

**Autores**: Paulo Bueno & Mark Leonel  
**Año**: 2026

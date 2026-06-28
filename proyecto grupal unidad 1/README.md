# 📄 README – Churrasquería El Rinconcito del Patricio

**Proyecto Web – Unidad 1 | 2026**  
**UNAMAD – Escuela Profesional de Ingeniería de Sistemas**  
**Estudiantes:** Bueno Quiñones Paulo Cesar & Hurtado Quispe Mark Leonel

---

## 📁 Estructura de archivos

```
proyecto/
│
├── index.html       → Estructura principal del sitio web
└── style.css        → Todos los estilos visuales del sitio
```

Para que el sitio funcione correctamente, ambos archivos deben estar en la **misma carpeta**.

---

## 🌐 index.html — Explicación

### ¿Qué es el HTML?
HTML (HyperText Markup Language) es el lenguaje que define la **estructura** del sitio web. Es como el esqueleto: indica qué hay en la página y en qué orden aparece.

---

### `<head>` — Cabecera del documento
No se ve en pantalla, pero contiene información importante para el navegador.

```html
<meta charset="UTF-8">
```
Define que el sitio usa caracteres en español (tildes, ñ, etc.).

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Hace que el sitio se adapte correctamente a pantallas de celular y tablet (diseño responsivo).

```html
<meta name="description" content="...">
<meta name="keywords" content="...">
```
Información para los motores de búsqueda como Google (SEO).

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
```
Metadatos Open Graph: controlan cómo se ve el sitio cuando se comparte en redes sociales (título, descripción, tipo).

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display...">
```
Carga las fuentes tipográficas desde Google Fonts:
- **Playfair Display** → usada en títulos y logo (estilo elegante, serif)
- **Lato** → usada en textos normales (limpia y legible)

```html
<link rel="stylesheet" href="style.css">
```
Conecta el archivo de estilos CSS con el HTML.

---

### `<header>` — Barra de navegación

```html
<header>
    <nav class="navbar">
        <a href="#inicio" class="logo">El Rinconcito <span>del Patricio</span></a>
        <ul class="nav-links">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#menu">Menú</a></li>
            <li><a href="#contacto">Contacto</a></li>
        </ul>
    </nav>
</header>
```

- `<nav>` → etiqueta semántica que indica que es una barra de navegación
- `href="#inicio"` → al hacer clic, la página hace scroll hasta la sección con `id="inicio"`
- `<span>` → permite darle un color diferente a una parte del logo desde el CSS
- Los links `#menu` y `#contacto` funcionan como anclas internas, sin necesidad de JavaScript

---

### Sección HERO (`id="inicio"`)

```html
<section id="inicio" class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
        <span class="hero-badge">🔥 Puerto Maldonado, Madre de Dios</span>
        <h1>Sabor y Tradición<br><em>a la Parrilla</em></h1>
        <p>Cortes seleccionados...</p>
        <a href="#menu" class="btn-primary">Ver Especialidades</a>
    </div>
    <div class="scroll-hint">Descubrir</div>
</section>
```

- `<section>` → etiqueta semántica que agrupa una sección del contenido
- `hero-bg` → div vacío que sirve solo para mostrar la imagen de fondo mediante CSS
- `<h1>` → título principal de la página (el más importante)
- `<em>` → pone el texto en cursiva y permite darle color dorado desde CSS
- `btn-primary` → botón que lleva al menú al hacer clic (ancla interna)
- `scroll-hint` → texto decorativo "Descubrir" con animación bounce en CSS
- `<br>` → salto de línea dentro del título

---

### Sección MENÚ (`id="menu"`)

```html
<section id="menu">
    <div class="menu-header"> ... </div>
    <div class="menu-grid">
        <article class="menu-card"> ... </article>
    </div>
</section>
```

- `<article>` → etiqueta semántica para contenido independiente (cada plato es un artículo)
- `menu-grid` → contenedor que organiza las tarjetas en columnas usando CSS Grid
- Cada tarjeta tiene 3 partes:
  - `card-img` → contiene la imagen del plato
  - `card-body` → contiene el nombre, descripción y precio
  - `card-footer` → contiene la etiqueta y el precio resaltado

```html
<article class="menu-card card-featured">
```
La última tarjeta (Gran Mix) tiene la clase adicional `card-featured` que la hace ocupar todo el ancho y mostrar imagen al lado del texto.

---

### Sección CONTACTO (`id="contacto"`)

```html
<section id="contacto">
    <div class="contacto-inner">
        <div class="contacto-info"> ... </div>
        <div class="contacto-cards">
            <a href="tel:+51993018321" class="contacto-card"> ... </a>
            <a href="mailto:cesarbueno677@gmail.com" class="contacto-card"> ... </a>
            <div class="contacto-card"> ... </div>
        </div>
    </div>
</section>
```

- `href="tel:..."` → al hacer clic en celular, abre el marcador de llamadas directamente
- `href="mailto:..."` → al hacer clic, abre el correo electrónico del dispositivo
- La tarjeta de dirección es un `<div>` (no un `<a>`) porque no tiene link que abrir
- `contacto-inner` organiza el texto explicativo a la izquierda y las tarjetas a la derecha

---

### `<footer>` — Pie de página

```html
<footer>
    <div class="footer-logo">El Rinconcito <span>del Patricio</span></div>
    <div class="footer-info">
        <p>© 2026 El Rinconcito del Patricio</p>
        <p>UNAMAD – Ingeniería de Sistemas | ...</p>
    </div>
</footer>
```

- Muestra el logo a la izquierda y los créditos a la derecha
- `<span>` cambia el color de "del Patricio" a rojo mediante CSS

---

## 🎨 style.css — Explicación

### ¿Qué es el CSS?
CSS (Cascading Style Sheets) controla **cómo se ve** el sitio: colores, tamaños, espaciados, animaciones y distribución. Es como la ropa y decoración sobre el esqueleto HTML.

---

### Variables CSS (`:root`)

```css
:root {
    --carbon: #0f0d0b;
    --ember: #c0392b;
    --gold: #d4af37;
    --smoke: #1e1a17;
    --ash: #2e2925;
    --text-light: #e8ddd0;
    --text-muted: #a09080;
}
```

Las variables CSS permiten definir colores una sola vez y reutilizarlos en todo el archivo. Si se quiere cambiar el color rojo, solo se cambia `--ember` y se actualiza en todo el sitio automáticamente.

| Variable | Color | Uso |
|----------|-------|-----|
| `--carbon` | Negro carbón | Fondo general |
| `--ember` | Rojo brasas | Botones, acentos |
| `--gold` | Dorado | Logo, precios, títulos |
| `--smoke` | Gris oscuro | Fondo del menú |
| `--ash` | Gris ceniza | Fondo de tarjetas |
| `--text-light` | Beige claro | Texto principal |
| `--text-muted` | Beige apagado | Texto secundario |

---

### Reset general

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
```

- `*` → aplica a todos los elementos
- `margin: 0; padding: 0` → elimina espacios por defecto del navegador
- `box-sizing: border-box` → el tamaño de los elementos incluye el borde y el relleno
- `scroll-behavior: smooth` → hace que al hacer clic en los links del navbar, el scroll sea suave en vez de saltar

---

### Navbar

```css
.navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: rgba(15,13,11,0.97);
    border-bottom: 1px solid rgba(212,175,55,0.2);
}
```

- `position: fixed` → la barra se queda fija en la parte superior aunque el usuario haga scroll
- `z-index: 1000` → aparece encima de todo el resto del contenido
- `rgba(...)` → color con transparencia (el último número es la opacidad, de 0 a 1)

```css
.nav-links a::after {
    content: '';
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.3s;
}
.nav-links a:hover::after { width: 100%; }
```

- `::after` → crea una línea decorativa debajo de cada link
- Al hacer hover, la línea se expande de 0 a 100% con una transición de 0.3 segundos (efecto subrayado animado)

---

### Hero

```css
.hero {
    height: 100vh;
}
```
`100vh` significa el 100% de la altura visible de la pantalla, así el hero siempre ocupa toda la pantalla.

```css
.hero-bg {
    background:
        linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.95)),
        url('https://...') center/cover no-repeat;
}
```

- Se apilan dos fondos: primero un gradiente oscuro, luego la imagen de fondo
- El gradiente hace que el texto sea legible sobre la imagen
- `cover` → la imagen cubre todo el espacio sin deformarse

```css
.hero-content {
    animation: fadeUp 1s ease forwards;
}
```
Aplica una animación de entrada: el contenido aparece suavemente desde abajo.

```css
@keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
}
```
Define la animación: empieza invisible y 30px más abajo, termina visible en su posición normal.

---

### Botón principal

```css
.btn-primary {
    background: var(--ember);
    border: 2px solid var(--ember);
    transition: background 0.3s, transform 0.2s;
}
.btn-primary:hover {
    background: transparent;
    color: var(--ember);
    transform: translateY(-2px);
}
```

Al pasar el mouse por encima, el botón se vuelve transparente (solo el borde queda) y sube 2px, dando sensación de interactividad.

---

### Grid del Menú

```css
.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}
```

- `display: grid` → activa el sistema de cuadrícula CSS
- `auto-fit` → ajusta automáticamente la cantidad de columnas según el ancho disponible
- `minmax(280px, 1fr)` → cada columna mide mínimo 280px y máximo 1 fracción del espacio disponible
- `gap` → espacio entre tarjetas

```css
.card-featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
```

- `grid-column: 1 / -1` → la tarjeta del Gran Mix ocupa todas las columnas del grid (de la primera a la última)
- Internamente tiene su propio grid de 2 columnas iguales para imagen y texto lado a lado

---

### Animación bounce (scroll hint)

```css
@keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(6px); }
}
```

El texto "Descubrir" sube y baja 6px de forma continua, llamando la atención del usuario para hacer scroll.

---

### Responsive (móviles)

```css
@media (max-width: 768px) {
    .nav-links { display: none; }
    .card-featured { grid-template-columns: 1fr; }
    .contacto-inner { grid-template-columns: 1fr; gap: 3rem; }
    footer { flex-direction: column; text-align: center; }
}
```

- `@media (max-width: 768px)` → estas reglas solo se aplican cuando la pantalla es menor a 768px (celulares y tablets pequeñas)
- El navbar oculta los links (en una mejora futura se puede agregar un menú hamburguesa)
- El Gran Mix pasa de 2 columnas a 1 (imagen arriba, texto abajo)
- El contacto pasa a una sola columna vertical
- El footer se centra y apila verticalmente

---

## 🔗 Tecnologías usadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 | — | Estructura semántica del sitio |
| CSS3 | — | Estilos, animaciones y layout |
| Google Fonts | — | Tipografías Playfair Display y Lato |
| Open Graph | — | Metadatos para redes sociales |

---

## 📌 Notas importantes

- El sitio es **estático**: no tiene base de datos ni backend, solo HTML y CSS.
- Las imágenes son externas (cargadas desde URLs), no están guardadas localmente.
- Para ver el sitio, basta con abrir `index.html` en cualquier navegador web.
- El archivo `style.css` debe estar en la **misma carpeta** que `index.html`.

---

*© 2026 – UNAMAD, Ingeniería de Sistemas*

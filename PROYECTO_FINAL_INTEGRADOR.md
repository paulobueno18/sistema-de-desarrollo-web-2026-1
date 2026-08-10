# Proyecto Final Integrador - Churrasquería React

## Verificación del esquema de entrega

### Estado general

El proyecto ya está bien orientado al esquema solicitado y presenta una propuesta sólida de negocio, diseño técnico y desarrollo web. La parte visual y funcional del frontend está implementada, mientras que la base de datos y el backend real aún quedan en una segunda etapa de desarrollo para una versión más completa.

### Matriz de cumplimiento

- Análisis del negocio y planteamiento de la solución: Cumplido. Se documenta el contexto del restaurante, el problema identificado, la propuesta de valor y el modelo de negocio.
- Arquitectura de la solución y diseño del sistema: Cumplido. Se describe la arquitectura cliente-servidor y la estructura del proyecto en React.
- Diseño de base de datos: Cumplido de forma conceptual. Se presenta el modelo entidad-relación y el diccionario de datos, aunque aún no está implementado en una base real.
- Diseño de API: Cumplido de forma propuesta. Se definen endpoints principales y métodos HTTP, pero aún no existe un backend funcional conectado.
- Diseño UI/UX: Cumplido. La interfaz está desarrollada con React y Tailwind, con diseño responsivo y flujo claro para menú, carrito y reserva.
- Desarrollo e implementación técnica (frontend): Cumplido. El proyecto cuenta con componentes, contexto global, formularios, modales y navegación.
- Base de datos con Prisma: Parcial. La idea está planteada, pero no se ha implementado la conexión real con Prisma en este proyecto.
- Validación, pruebas y resultados: Cumplido. Se verificó la compilación del proyecto con Vite y funciona correctamente para presentación.
- Presentación ejecutiva: Cumplido. Se incluye un pitch de negocio y una conclusión ejecutiva.

### Herramientas y tecnologías que sí están siendo utilizadas

- React para la interfaz.
- Vite como herramienta de desarrollo y compilación.
- Tailwind CSS para el diseño visual.
- Context API para el manejo del carrito.
- Fetch para cargar el menú desde un archivo JSON local.
- Formulario de reserva integrado con WhatsApp.
- Modales interactivos para detalle del plato y pago.

### Qué falta para cerrar el 100% del esquema

- Implementar un backend real con Node.js o Express.
- Integrar una base de datos real con Prisma y migraciones.
- Guardar reservas, pedidos y pagos de forma persistente.
- Añadir autenticación para administración del negocio.
- Desplegar la solución en un servidor o plataforma en línea.

## 1. Análisis del Negocio y Planteamiento de la Solución

### 1.1 Contexto del negocio

- Tipo de empresa: empresa simulada de servicios gastronómicos.
- Sector económico: restauración y food service.
- Problema identificado: la experiencia de pedido y reserva en la churrasquería se realizaba de forma manual, principalmente por WhatsApp y llamadas telefónicas, generando demoras, desorden en la gestión y poca trazabilidad de las órdenes.
- Justificación de la solución digital: desarrollar una plataforma web que permita mostrar el menú, gestionar pedidos desde un carrito, reservar mesas y enviar confirmaciones mediante WhatsApp, ofreciendo una experiencia más rápida, ordenada y moderna para clientes y negocio.

### 1.2 Análisis del problema

- Dolor del cliente / necesidad del mercado: los clientes requieren una forma rápida y clara de visualizar los platos, elegir opciones y reservar sin depender exclusivamente de llamadas telefónicas.
- Impacto actual del problema: el proceso manual genera pérdida de tiempo, errores en la toma de pedidos y dificultad para organizar reservas en horarios concurridos.
- Análisis FODA resumido:
  - Fortalezas: propuesta visual atractiva, menú digital bien estructurado, integración con WhatsApp y carrito funcional.
  - Oportunidades: escalar a pedidos online, pagos digitales y fidelización.
  - Debilidades: el proyecto actual no cuenta con backend ni persistencia real de datos.
  - Amenazas: competencia de restaurantes con plataformas de delivery y reservas digitales más completas.
- Stakeholders involucrados:
  - Clientes del restaurante.
  - Dueño o administrador del negocio.
  - Personal de atención y cocina.
  - Equipo de desarrollo del proyecto.

### 1.3 Propuesta de valor

- ¿Qué solución web proponen? Una web interactiva para mostrar las especialidades de la churrasquería, permitir agregar platos al carrito, seleccionar tipo de entrega y reservar mesas.
- Diferenciación frente a soluciones existentes: enfoque en una experiencia visual orientada a gastronomía, con estética rústica y un proceso de reserva-pedido integrado a WhatsApp.
- Beneficios para el negocio:
  - Operativos: reducción de llamadas y errores manuales.
  - Financieros: mejora en la captación de pedidos y reservas.
  - Estratégicos: posicionamiento digital de la marca y base para futuras ampliaciones.

### 1.4 Modelado del negocio

- Business Model Canvas resumido:
  - Segmentos de clientes: personas que buscan comer en un ambiente tradicional, familias y grupos que desean reservar mesas.
  - Propuesta de valor: experiencia atractiva, rápida y cómoda para pedir y reservar.
  - Canales: web, WhatsApp, redes sociales y contacto telefónico.
  - Relación con clientes: atención directa, reserva digital y seguimiento de pedidos.
  - Fuentes de ingresos: ventas por platos, pedidos para llevar y reservas con adelanto.
- Procesos que serán digitalizados:
  - Visualización del menú.
  - Selección y personalización de platos.
  - Gestión del carrito.
  - Confirmación de reservas.
  - Envío de pedidos a WhatsApp.
- KPIs que mejorarán con el sistema:
  - Tiempo promedio de atención.
  - Número de reservas capturadas.
  - Cantidad de pedidos confirmados.
  - Ticket promedio por pedido.

---

## 2. Arquitectura de la Solución y Diseño del Sistema

### 2.1 Arquitectura general

- Arquitectura cliente-servidor: la interfaz se ejecuta en el navegador del cliente y se comunica con un futuro backend o con servicios externos como WhatsApp.
- Diagrama de arquitectura:

```text
Cliente (Navegador)
    |
    |-- React + Vite + Tailwind
    |       |
    |       +-- Componentes: Navbar, Hero, Menu, CartModal, DishModal, Contact
    |       |
    |       +-- Context API: CartContext
    |
    +--> WhatsApp / Mensajería
    |
    +--> Backend futuro (Node.js / Express)
              |
              +--> Base de Datos (Prisma / PostgreSQL)
```

- Justificación tecnológica:
  - React permite construir una interfaz modular y escalable.
  - Vite acelera el desarrollo y el rendimiento del proyecto.
  - Tailwind facilita un diseño moderno y responsivo.
  - Context API permite gestionar el carrito de forma simple para una primera versión.

### 2.2 Diseño de base de datos

- Modelo Entidad-Relación propuesto:
  - Cliente
  - Reserva
  - Pedido
  - DetallePedido
  - Plato
  - Categoría
  - Pago

- Diccionario de datos resumido:
  - Cliente: id, nombre, telefono, correo.
  - Reserva: id, cliente_id, fecha, hora, personas, estado.
  - Pedido: id, cliente_id, tipo_entrega, total, estado, fecha.
  - DetallePedido: id, pedido_id, plato_id, cantidad, precio_unitario.
  - Plato: id, nombre, descripcion, precio, categoria_id, estado.
  - Categoría: id, nombre.
  - Pago: id, pedido_id, metodo, numero_operacion, estado.

- Justificación de entidades principales:
  - Cliente: permite identificar a quienes realizan pedidos o reservas.
  - Pedido y DetallePedido: estructuran la compra de forma ordenada.
  - Reserva: centraliza la gestión de mesas y capacidad.
  - Plato: representa el catálogo del negocio.

### 2.3 Diseño de API

- Endpoints principales (propuestos para la siguiente fase):
  - GET /api/platos
  - GET /api/platos/:id
  - POST /api/pedidos
  - GET /api/pedidos/:id
  - POST /api/reservas
  - GET /api/reservas
  - POST /api/pagos

- Métodos HTTP:
  - GET para consultar datos.
  - POST para crear reservas, pedidos y pagos.
  - PUT/PATCH para actualizar estados.

- Estructura de request/response:
  - Request de pedido: cliente, tipoEntrega, platos, total, observaciones.
  - Response: mensaje de éxito, id del pedido, estado y total.

- Manejo de errores:
  - Validación de datos obligatorios.
  - Respuestas HTTP con códigos 400, 404 y 500.
  - Mensajes claros para errores de reserva, carrito vacío o datos inválidos.

### 2.4 Diseño UI/UX

- Wireframes o mockups:
  - Hero principal con llamado a la acción.
  - Sección de menú con tarjetas de platos.
  - Modal de detalle del plato con selección de tamaño y cantidad.
  - Modal de carrito con opción para local o para llevar.
  - Formulario de reserva con datos del cliente.

- Principios de usabilidad aplicados:
  - Diseño claro y visualmente coherente.
  - Flujos cortos para elegir platos y reservar.
  - Botones de acción visibles.
  - Información de precio y adelanto integrada en la experiencia.

- Responsividad:
  - Diseño adaptado para móvil, tablet y escritorio.
  - Uso de grid y flexbox con clases de Tailwind para una experiencia fluida.

---

## 3. Desarrollo e Implementación Técnica

### 3.1 Frontend

- Estructura del proyecto:
  - src/components: Navbar, Hero, Menu, MenuItem, Contact, Footer, CartModal, CartItem, DishModal.
  - src/context: CartContext.jsx para manejar el estado global del carrito.
  - src/data: menu.js con el catálogo de platos.
  - src/App.jsx: estructura principal de la aplicación.

- Manejo de estado:
  - Uso de React Hooks como useState y useContext.
  - El carrito se gestiona de forma global mediante Context API.

- Consumo de APIs:
  - Actualmente el proyecto no consume un backend real; los datos del menú se cargan localmente desde un archivo JS.
  - La arquitectura está preparada para integrar APIs en una futura etapa.

- Formularios con validaciones:
  - Formulario de reserva con validación de campos obligatorios.
  - Validación de número de operación para el flujo de pago en el carrito.

- Librerías usadas:
  - React
  - Vite
  - Tailwind CSS
  - PostCSS
  - Autoprefixer

### 3.2 Base de Datos

- Migraciones con Prisma:
  - Se propone usar Prisma para gestionar el esquema de la base de datos y las migraciones del backend futuro.
  - Modelos sugeridos: Usuario, Reserva, Pedido, DetallePedido, Plato, Categoria y Pago.

- Relaciones entre tablas:
  - Un cliente puede tener muchos pedidos y reservas.
  - Un pedido tiene muchos detalles.
  - Un plato pertenece a una categoría.
  - Un pedido puede tener un pago asociado.

- Integridad referencial:
  - Uso de claves foráneas para garantizar que los registros estén relacionados correctamente.
  - Restricciones para evitar pedidos sin cliente o detalles sin plato.

---

## 4. Validación, Pruebas y Resultados

### 4.1 Evaluación del impacto en el negocio

- ¿Cómo mejora el proceso?
  - Centraliza la experiencia de menú, carrito, reserva y confirmación en una sola web.
  - Reduce la dependencia de llamadas y mensajes manuales.
  - Mejora la percepción digital del negocio.

- Indicadores antes y después (simulados):
  - Antes: muchas reservas se perdían por llamadas aisladas y demora en confirmación.
  - Después: se puede captar más información en tiempo real, con mayor orden y seguimiento.

- Beneficios cuantificables:
  - Aumento potencial de reservas.
  - Menor tiempo de atención por pedido.
  - Mayor organización del flujo operativo.

### 4.2 Limitaciones y mejoras futuras

- Escalabilidad:
  - El proyecto actual funciona como una interfaz estática y puede crecer con backend, autenticación y base de datos.
- Seguridad avanzada:
  - Implementar autenticación para administradores.
  - Protección de formularios y manejo seguro de datos.
  - Integración de pagos con validación real.

### 4.3 Presentación ejecutiva (Pitch de negocio)

- Problema: los clientes necesitan una forma más rápida y moderna de pedir y reservar en la churrasquería, mientras que el negocio necesita una gestión más ordenada.
- Solución: una web interactiva con menú, carrito, reserva y flujo de pago/WhatsApp.
- Valor agregado: mejora la experiencia del cliente, organiza las ventas y fortalece la imagen digital del restaurante.
- Viabilidad: el proyecto ya cuenta con una base funcional en React que demuestra la idea y puede ampliarse a un sistema completo.
- Escalabilidad: la solución puede evolucionar hacia un sistema de pedidos online, pagos digitalizados y administración de reservas en tiempo real.

---

## Conclusión

El proyecto desarrollado para la churrasquería demuestra una solución web funcional y atractiva para la gestión digital de pedidos y reservas. Su enfoque está alineado con las necesidades del negocio y ofrece una base sólida para futuras ampliaciones hacia una plataforma más completa, escalable y orientada a resultados.

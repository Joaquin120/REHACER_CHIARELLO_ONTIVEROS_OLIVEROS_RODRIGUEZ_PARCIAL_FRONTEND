# Proposal

## Why

El proyecto TPI "Frontend de una librería" (UTN — Programación III) está vacío y el Ejercicio 1 (20 pts) exige la estructura HTML completa: 5 vistas navegables en una sola página, semántica accesible, formularios con etiquetas asociadas y estados de interfaz previstos. Sin esta base no es posible encarar el Ejercicio 2 (CSS) ni las pantallas dinámicas de los Ejercicios 3–6, ya que todos cuelgan de los IDs y contenedores definidos aquí. Se aprovecha para arrancar el README.md inicial (5 pts de entrega).

## What Changes

- Se crea `index.html` como entrada única del proyecto: encabezado, navegación y un único `<main id="contenido-principal">` con 5 secciones ancladas (`#vista-catalogo`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial`).
- Se define la vista **Catálogo**: título de la librería, buscador por título y listado de libros (tabla o tarjetas estáticos de ejemplo) con los campos título, ISBN, editorial, género («Sin clasificar» si no tiene), autores y precio.
- Se define la vista **Libros**: formulario de alta `#form-alta-libro` (título, ISBN, precio numérico, select de editorial, select de género con opción «Sin clasificar» por defecto, select múltiple de autores) y listado estático de libros.
- Se define la vista **Clientes**: formulario de alta `#form-alta-cliente` (nombre completo, email) y listado estático de clientes.
- Se define la vista **Ventas**: selección de cliente, controles para armar renglones (`#venta-libro`, `#venta-cantidad`), tabla de renglones (`#tabla-renglones`) y resumen con total (`#venta-total`).
- Se define la vista **Historial**: listado de ventas (`#tabla-historial`) con acceso al detalle inmutable de cada venta (`#tabla-historial-detalle`).
- Accesibilidad y semántica: un solo `<h1>`, navegación con `aria-current`, tablas con `thead`/`th` dentro de `.tabla-contenedor`, todo control asociado a su `<label for="...">` y botones con texto que describe la acción.
- Estados de interfaz: contenedores semánticos previstos para mensajes de lista vacía, búsqueda sin resultados y feedback de validación (éxito/rechazo), listos para que JavaScript los use en los ejercicios siguientes.
- Se crea `README.md` inicial: integrantes, instrucciones de apertura directa sin npm ni servidor (file://), arquitectura de IDs del HTML, estado de maqueta vs. dinámico y la tabla de los 8 casos de prueba manuales de la cátedra.

## Capabilities

### New Capabilities

- `app-shell`: arquitectura de página única — entrada `index.html`, encabezado y navegación accesibles, único `<main id="contenido-principal">` con las 5 vistas ancladas y un único `<h1>`.
- `catalogo`: vista de catálogo — buscador por título, listado de libros con título, ISBN, editorial, género («Sin clasificar» por defecto), autores y precio, y estados de lista vacía / búsqueda sin resultados.
- `gestion-libros`: vista de libros — formulario de alta `#form-alta-libro` con todos sus campos y controles asociados, y listado de libros registrados con estado vacío.
- `gestion-clientes`: vista de clientes — formulario de alta `#form-alta-cliente` (nombre completo y email) y listado de clientes registrados con estado vacío.
- `ventas-historial`: vistas de ventas e historial — composición de renglones de venta, tabla de renglones, total general, listado de ventas históricas y panel de detalle inmutable.
- `estados-feedback`: mensajes de interfaz reutilizables — contenedores semánticos para operaciones correctas y rechazadas junto a cada formulario/zona de acción, más los estados de listas vacías y búsquedas sin resultados ya cubiertos por sus vistas.
- `documentacion`: README inicial del proyecto — apertura sin servidor, arquitectura de IDs del HTML, estado de maqueta vs. dinámico y tabla de los 8 casos de prueba manuales de la cátedra.

### Modified Capabilities

(ninguna — el proyecto no tiene specs previas)

## Impact

- **Archivos nuevos**: `index.html` (raíz), `README.md`.
- **Directorios previstos** (vacíos o con placeholder hasta ejercicios posteriores): `css/`, `js/` — este cambio no agrega estilos ni lógica más allá de lo necesario para la presentación básica de la maqueta.
- **Sin dependencias**: sin npm, frameworks, CDNs ni servidor; el proyecto abre por doble clic (file://).
- **Contrato para cambios siguientes**: los IDs y contenedores definidos aquí (`#form-alta-libro`, `#form-alta-cliente`, `#venta-libro`, `#venta-cantidad`, `#tabla-renglones`, `#venta-total`, `#tabla-historial`, `#tabla-historial-detalle`, mensajes de estado) son el anclaje que usarán los Ejercicios 2–6 (CSS, datos, altas, ventas y persistencia). Cambiarlos rompería los ejercicios siguientes.

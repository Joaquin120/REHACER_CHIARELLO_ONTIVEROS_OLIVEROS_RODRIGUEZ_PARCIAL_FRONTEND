# Tasks

## 1. Esqueleto de página y navegación (app-shell)

- [x] 1.1 Crear `index.html` con doctype, `<html lang="es">`, metadatos, `<header>` con el nombre de la librería como único `<h1>` y `<footer>`, verificando que el documento abra por file:// y contenga exactamente un `<h1>`
- [x] 1.2 Agregar `<nav>` con los 5 enlaces `href="#vista-catalogo"`, `#vista-libros`, `#vista-clientes`, `#vista-ventas`, `#vista-historial` (texto descriptivo por enlace y nombre accesible en el `<nav>`), verificando que cada enlace apunte al id de su sección
- [x] 1.3 Crear `<main id="contenido-principal">` con las 5 `<section>` en orden (`vista-catalogo`, `vista-libros`, `vista-clientes`, `vista-ventas`, `vista-historial`), cada una con `<h2>` de título, verificando con inspección de DOM que existe un solo `<main>` y las 5 secciones con sus ids

## 2. Vista Catálogo

- [x] 2.1 Agregar en `#vista-catalogo` el buscador por título: campo de texto con `<label for>` y botón "Buscar" con texto descriptivo, verificando la asociación label-control
- [x] 2.2 Agregar el listado de libros del catálogo como tabla (`thead`/`th` por título, ISBN, editorial, género, autores, precio) dentro de `.tabla-contenedor`, con 2–3 filas de ejemplo estáticas incluyendo un libro cuyo género muestre «Sin clasificar», verificando la presencia del texto «Sin clasificar» en esa fila

## 3. Vista Libros

- [x] 3.1 Crear `#form-alta-libro` con campos título, ISBN, precio (`type="number"`), select de editorial y select de género con opciones de ejemplo estáticas; «Sin clasificar» como opción por defecto seleccionada; cada control con su `<label for>`, verificando que al cargar/resetear el formulario el género quede en «Sin clasificar»
- [x] 3.2 Agregar al formulario el select múltiple de autores con `<label for>`, el botón "Registrar libro" con texto descriptivo y el contenedor `#libros-feedback` para resultado de la operación, verificando que el botón y el contenedor estén junto al formulario
- [x] 3.3 Agregar el listado de libros registrados en `#vista-libros` como tabla con `thead`/`th` dentro de `.tabla-contenedor` y el contenedor `#libros-listado-vacio` para el mensaje de lista vacía, verificando la existencia de ambos

## 4. Vista Clientes

- [x] 4.1 Crear `#form-alta-cliente` con un único campo "Nombre completo" y campo email (`type="email"`), ambos con `<label for>`, sin campo de apellido, verificando la inspección del formulario
- [x] 4.2 Agregar el botón "Registrar cliente" con texto descriptivo y el contenedor `#clientes-feedback`, verificando su presencia junto al formulario
- [x] 4.3 Agregar el listado de clientes en `#vista-clientes` como tabla con `thead`/`th` dentro de `.tabla-contenedor` y el contenedor `#clientes-listado-vacio`, verificando ambos elementos

## 5. Vista Ventas

- [x] 5.1 Crear en `#vista-ventas` la selección de cliente (selector con id `#venta-cliente`, etiqueta y opciones de ejemplo estáticas), el selector `#venta-libro` y el campo entero `#venta-cantidad` (`type="number"` con step/entero), cada uno con su `<label for>`, verificando los tres ids en el DOM
- [x] 5.2 Agregar el botón "Agregar renglón" con texto descriptivo y la tabla `#tabla-renglones` con `thead`/`th` de libro, cantidad, precio unitario y subtotal dentro de `.tabla-contenedor`, con 1–2 filas de ejemplo, verificando la estructura de la tabla
- [x] 5.3 Agregar el resumen de venta con `#venta-total`, el botón "Confirmar venta" y el contenedor `#venta-feedback` para el resultado, verificando que los tres existan en `#vista-ventas`

## 6. Vista Historial

- [x] 6.1 Agregar en `#vista-historial` la tabla `#tabla-historial` con `thead`/`th` (identificador, fecha, cliente, total, detalle) dentro de `.tabla-contenedor`, con 1–2 ventas de ejemplo y un botón/enlace descriptivo de "Ver detalle" por fila, verificando la estructura
- [x] 6.2 Agregar el panel `#tabla-historial-detalle` para el detalle de la venta seleccionada (tabla de renglones de ejemplo con libro, cantidad, precio unitario, subtotal y total) sin ningún control de edición o eliminación, verificando la ausencia de botones de editar/eliminar en el detalle
- [x] 6.3 Agregar el contenedor `#historial-listado-vacio` para el mensaje de historial sin ventas, verificando su existencia

## 7. Estados de interfaz y accesibilidad

- [x] 7.1 Verificar/recorrer que todos los controles de las 5 vistas tienen `<label for>` apuntando a su id y que todos los botones tienen texto que describe su acción, corrigiendo los que falten (inspección manual o búsqueda de labels sin `for` válido)
- [x] 7.2 Verificar que todas las tablas de listado están dentro de `.tabla-contenedor`, tienen `thead` con `th`, y que los contenedores de feedback y estados vacíos existen por zona (catálogo, libros, clientes, ventas, historial); revisar que el estado se distinga también por texto, no solo color

## 8. README inicial

- [x] 8.1 Crear `README.md` con integrantes, materia/entrega (UTN — Programación III, TPI Frontend de una librería) e instrucciones de apertura sin servidor ni npm (doble clic en `index.html`, file://), verificando que siguiendo los pasos el proyecto abre
- [x] 8.2 Documentar en el README la arquitectura de vistas e IDs del HTML (5 anclas dentro de `#contenido-principal` y los IDs principales: formularios, tablas, controles y zonas de estado) y el estado maqueta vs. dinámico de cada parte, verificando contra el `index.html` real que los IDs documentados existan
- [x] 8.3 Agregar al README la tabla con los 8 casos de prueba manuales de `openspec/consignas.md` (acción y resultado esperado por caso), verificando que sean exactamente 8 y coincidan con la consigna

## 9. Verificación final de integración

- [x] 9.1 Abrir `index.html` por file:// y recorrer con teclado y mouse: navegar por los 5 enlaces, comprobar foco visible en controles y saltos correctos a cada vista, sin errores de consola
- [x] 9.2 Revisar el HTML contra los escenarios de las specs de `ejercicio-1` (`openspec validate --change "ejercicio-1"` y cotejo manual de cada Requirement/Scenario) y dejar el proyecto sin dependencias externas (sin CDN ni npm)

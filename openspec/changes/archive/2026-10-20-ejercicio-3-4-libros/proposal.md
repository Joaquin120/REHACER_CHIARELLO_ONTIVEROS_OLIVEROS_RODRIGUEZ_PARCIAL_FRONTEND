# Proposal

## Why

La maqueta (Ejercicio 1 + 2) es HTML/CSS estático: el catálogo, los selects del formulario de libros y las tablas muestran datos de ejemplo escritos a mano en `index.html`. Para aprobar el Ejercicio 3 (datos locales, catálogo y filtro) y la parte de libros del Ejercicio 4, hay que conectar el DOM a un modelo de datos en JavaScript nativo, renderizar todo dinámicamente y validar el alta de libros — sin romper el contrato de IDs documentado en `README.md`.

## What Changes

- Nuevo modelo de datos en `js/app.js`: arrays/objetos con IDs estables (mínimo 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios). Cada libro referencia una editorial existente y uno o más autores existentes; el género es opcional.
- Catálogo (`#tabla-catalogo`) se renderiza dinámicamente desde el array de libros, reemplazando las filas estáticas de la maqueta. Libros sin género muestran «Sin clasificar».
- Buscador por título (`#catalogo-busqueda`) funcional: insensible a mayúsculas/minúsculas, coincidencias parciales, `trim()` en los extremos; búsqueda vacía muestra todo; sin coincidencias activa `#catalogo-sin-resultados`.
- Selectores de `#form-alta-libro` (`#libro-editorial`, `#libro-genero` con «Sin clasificar» por defecto, y el select múltiple `#libro-autores`) se cargan dinámicamente desde el modelo de datos, reemplazando las opciones estáticas.
- Alta de libros con `preventDefault()`: título e ISBN obligatorios, ISBN único comparado sin espacios ni guiones, precio numérico > 0, editorial existente y al menos un autor existente. Mensajes «OK —» / «Error —» en `#libros-feedback`.
- Tras un alta correcta, el catálogo (`#tabla-catalogo`), la tabla de libros (`#tabla-libros`) y el selector `#venta-libro` se actualizan en vivo sin recargar la página.
- `index.html` conecta `js/app.js` (script defer) — única edición al HTML, sin tocar ningún ID existente.

**Notas de alcance**: los datos de ejemplo estáticos dentro de `index.html` se dejan como están en el HTML fuente (el JS los reemplaza al ejecutar); la parte de Clientes del Ejercicio 4, las Ventas (Ejercicio 5) y la persistencia (Ejercicio 6) quedan fuera de este change.

## Capabilities

### New Capabilities

- `datos-locales`: modelo de datos inicial del sistema (libros, editoriales, géneros, autores y clientes) representado en arrays/objetos JavaScript con identificadores estables y datos ficticios que cumplen los mínimos de la consigna.

### Modified Capabilities

- `catalogo`: requisitos de renderizado dinámico del listado desde el modelo de datos y de comportamiento del filtro por título (insensible a mayúsculas, parcial, trim) con sus estados vacío/sin resultados, que antes solo preveían la estructura HTML estática.
- `gestion-libros`: requisitos de carga dinámica de las opciones de los selectores desde el modelo de datos, de validación del alta de libros con `preventDefault()` y de actualización en vivo del catálogo, el listado de libros y los selectores relacionados, con feedback textual «OK —» / «Error —».

## Impact

- `js/app.js`: única fuente de lógica; pasa de comentario vacío a modelo de datos + render + eventos (Vanilla JS, sin fetch ni dependencias).
- `index.html`: se agrega únicamente `<script src="js/app.js" defer></script>` antes de `</body>`; ningún ID ni estructura existente se modifica.
- Contrato de IDs de `README.md`: se respetan `tabla-catalogo`, `catalogo-busqueda`, `catalogo-sin-resultados`, `catalogo-listado-vacio`, `form-alta-libro`, `libro-titulo`, `libro-isbn`, `libro-precio`, `libro-editorial`, `libro-genero`, `libro-autores`, `libros-feedback`, `libros-listado-vacio`, `tabla-libros`, `venta-libro`.
- Ejercicios posteriores (Clientes del Ej. 4, Ventas del Ej. 5, persistencia del Ej. 6) se apoyan en el modelo de datos creado aquí.

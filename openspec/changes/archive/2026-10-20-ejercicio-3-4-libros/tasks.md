# Tasks

## 1. Conexión del script y modelo de datos

- [x] 1.1 Agregar `<script src="js/app.js" defer></script>` antes de `</body>` en `index.html`, sin tocar ningún ID existente, y verificar que la página sigue abriendo igual por `file://` con la consola sin errores de 404 sobre el script.
- [x] 1.2 Definir en `js/app.js` los arrays `const` con IDs estables y mínimos de la consigna (≥6 libros, ≥2 editoriales, ≥2 géneros, ≥3 autores, ≥3 clientes ficticios; al menos un libro sin género y referencias válidas editorial/autores), y verificar la integridad referencial con un chequeo rápido en consola (`node --check js/app.js` para sintaxis + inspección manual de referencias).

## 2. Catálogo dinámico y filtro (Ejercicio 3)

- [x] 2.1 Implementar `formatearPrecio` y el renderizado dinámico de `#tabla-catalogo` desde el array de libros (título, ISBN, editorial, género con «Sin clasificar» si `idGenero` es null, autores, precio), insertando solo con `textContent`/`createElement`, y verificar que al abrir la página la tabla muestra los ≥6 libros y ningún ejemplo estático duplicado.
- [x] 2.2 Implementar el filtro por título (submit del formulario `#catalogo-busqueda` + evento `input`): `trim().toLowerCase()`, coincidencia parcial con `includes`, búsqueda vacía muestra todo; verificar manualmente con «EL PRIN» (mayúsculas), «  principito  » (espacios), búsqueda vacía y texto inexistente.
- [x] 2.3 Implementar la alternancia de estados: `#catalogo-sin-resultados` visible y tabla sin filas cuando no hay coincidencias; `#catalogo-listado-vacio` visible y tabla oculta cuando el array de libros está vacío; verificar los tres escenarios en el navegador.

## 3. Selectores dinámicos y alta de libros (Ejercicio 4 — parte libros)

- [x] 3.1 Implementar la carga dinámica de `#libro-editorial` (editoriales existentes), `#libro-genero` («Sin clasificar» con valor vacío seleccionado por defecto + géneros existentes) y `#libro-autores` (select múltiple con autores existentes), reemplazando las opciones estáticas al cargar, y verificar que las opciones coinciden con el modelo de datos y que «Sin clasificar» queda seleccionada por defecto.
- [x] 3.2 Implementar `manejarAltaLibro` con `preventDefault()` y validaciones: título e ISBN no vacíos, ISBN único vía `normalizarIsbn` (quita espacios y guiones, mayúsculas), precio `Number > 0`, editorial existente, ≥1 autor existente seleccionado; verificar cada rechazo mostrando «Error — …» en `#libros-feedback` sin agregar el libro (incluido un ISBN duplicado solo distinto en guiones/espacios).
- [x] 3.3 Implementar el alta válida: agregar el libro con ID nuevo derivado de `Math.max`, mostrar «OK — …» en `#libros-feedback`, limpiar el formulario y re-seleccionar «Sin clasificar»; verificar que el libro nuevo aparece en `#tabla-libros`, en `#tabla-catalogo` y como opción nueva en `#venta-libro` sin recargar la página.

## 4. Listado de libros y verificación de integración

- [x] 4.1 Implementar el renderizado dinámico de `#tabla-libros` (mismas 6 columnas que el catálogo) y la alternancia con `#libros-listado-vacio`; verificar con el array vacío (temporalmente) que el mensaje se muestra y la tabla se oculta.
- [x] 4.2 Verificación de integración final: abrir `index.html` por `file://` y recorrer los casos manuales 1 y 2 del README (búsqueda en mayúsculas/vacía/inexistente; alta con ISBN duplicado y luego ISBN nuevo), confirmar que los IDs documentados en `README.md` siguen intactos en el DOM y que `node --check js/app.js` pasa sin errores. (Verificado con `node --check` + prueba de humo de la lógica con stub de DOM: 33/33 checks; el recorrido visual en el navegador queda para la revisión del equipo.)
- [x] 4.3 Actualizar la fila «Etapa actual» y la tabla «Estado de la maqueta vs. dinámico» en `README.md` para reflejar que Catálogo (listado + filtro) y Libros (selectores + alta + listado) ya son dinámicos; verificar que la tabla de IDs del README no cambió.

## Workflow follow-up

- Ejecutar `/opsx:archive ejercicio-3-4-libros` tras la revisión, para sincronizar los deltas a `openspec/specs/` y archivar el change.

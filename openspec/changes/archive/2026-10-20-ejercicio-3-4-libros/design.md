# Design

## Context

El proyecto es un TPI académico Vanilla: `index.html` + `css/estilos.css` + `js/app.js`, abierto por `file://`, sin npm, fetch, frameworks ni librerías. El Ejercicio 1 dejó las 5 vistas con IDs estables (contrato público en `README.md`) y datos estáticos de ejemplo escritos a mano dentro del HTML. `js/app.js` está vacío (solo comentarios) y `index.html` aún no lo incluye. Este change implementa el modelo de datos + catálogo dinámico + filtro (Ej. 3) y la parte de libros del Ej. 4. Ver `proposal.md` para la motivación y `specs/` para los requisitos.

## Goals / Non-Goals

**Goals:**

- Un modelo de datos en `js/app.js` con IDs estables y los mínimos de la consigna (6 libros, 2 editoriales, 2 géneros, 3 autores, 3 clientes).
- Renderizado dinámico de `#tabla-catalogo` y `#tabla-libros`, carga dinámica de `#libro-editorial` / `#libro-genero` / `#libro-autores` y actualización del `#venta-libro`.
- Filtro por título y validación del alta de libros con `preventDefault()`, con feedback textual «OK —» / «Error —» en `#libros-feedback`.
- Reemplazo total de los datos de ejemplo del HTML al ejecutar JavaScript (el HTML maqueta queda intacto como fallback de lectura).

**Non-Goals:**

- Alta de clientes (otro integrante), ventas/historial (Ej. 5), persistencia con localStorage (Ej. 6).
- Editar ni eliminar registros.
- Modificar `css/estilos.css` o renombrar/agregar IDs en `index.html` (salvo el `<script>` de conexión).
- Tests automatizados con frameworks: la restricción dura del TPI prohíbe npm/librerías, incluso para desarrollo; la verificación es manual según los casos del README.

## Decisions

1. **Organización del JS en un solo archivo `js/app.js` con IIFE + orden de init** — Restricción del TPI (un solo archivo conectado en `index.html`). Se usará `'use strict'` y un único disparador `DOMContentLoaded` (o script con `defer`) que llama a `inicializar()`; las funciones quedan con nombres reconocibles por responsabilidad (`renderCatalogo`, `renderLibros`, `cargarSelectores`, `manejarAltaLibro`, `normalizarIsbn`, `formatearPrecio`, etc.). *Alternativa descartada:* módulos ES (`type="module"`) — fallan con `file://` por CORS en algunos navegadores.
2. **Datos como literales `const` al inicio del archivo, con IDs numéricos estables** — Los arrays `editoriales`, `generos`, `autores`, `libros` y `clientes` son `const` (la identidad del array no cambia; sí se usa `push` para altas). Cada libro guarda `{ id, titulo, isbn, precio, idEditorial, idGenero (nullable), autores: [ids] }`. El próximo ID de libro se deriva con un contador que arranca en `Math.max(...ids) + 1` para no chocar con los seeds (facilita el Ej. 6). *Alternativa descartada:* estructuras `Map` — menos legibles para el corrector y sin beneficio real.
3. **ISBN único comparado con `normalizeIsbn`** — función que quita espacios (`\s`) y guiones (`-`) y pasa a mayúsculas, aplicada tanto al ISBN nuevo como a cada existente al comparar (`some`). No se valida dígito de control (no lo pide la consigna).
4. **Seguridad DOM: solo `textContent`/`createElement`** — todos los datos de usuario (títulos, ISBN, nombres) se insertan con `textContent`, nunca `innerHTML` con datos. Para los `<option>` de los selects se usa `new Option(texto, valor)`. *Alternativa descartada:* `innerHTML` con template strings — vulnerable a XSS y la consigna lo prohibe implícitamente ("los datos escritos por usuarios se insertan como texto").
5. **Precios como número con formato de la maqueta al renderizar** — se guardan como `Number` y se muestran con `formatearPrecio` (dos decimales con coma, sin separador de miles, ej. `$1500,00` / `$3250,50`) para coincidir exactamente con el HTML maqueta. Corregido tras prueba de humo: una versión con separador de miles (`$1.500,00`) contradecía los ejemplos del HTML.
6. **Estado del filtro como fuente única** — `aplicarFiltroCatalogo()` lee `#catalogo-busqueda`, normaliza (`trim().toLowerCase()`), filtra el array completo y renderiza; se invoca en `submit` del formulario buscador y en `input` del campo (actualización en vivo). Los mensajes `#catalogo-sin-resultados` / `#catalogo-listado-vacio` se alternan con la propiedad `hidden`.
7. **Validación en capas con mensajes acumulables, priorizando claridad** — `manejarAltaLibro` hace `preventDefault()`, recolecta errores en un array y muestra el primero (o todos concatenados) con prefijo «Error —»; con errores no se muta el estado. Con éxito: `push` al array de libros, re-render de catálogo/libros/selectores, feedback «OK —», `form.reset()` + re-selección de «Sin clasificar».
8. **Conexión del script con `defer`** — se agrega `<script src="js/app.js" defer></script>` antes de `</body>`; `defer` garantiza DOM parseado sin necesidad de `DOMContentLoaded` y respeta el orden de lectura. Es la única edición de `index.html`.

## Risks / Trade-offs

- [Los datos estáticos del HTML y los del JS conviven en el archivo fuente] → Al cargar, el JS limpia los `tbody` de `#tabla-catalogo` y `#tabla-libros` antes de renderizar; el HTML maqueta queda como fallback si JS falla. Se documenta en el caption/README.
- [Colisión de IDs de libro al hacer altas] → Contador derivado de `Math.max` de los IDs existentes; suficiente hasta el Ej. 6 (persistencia), donde se ajustará al recuperar datos.
- [`#venta-libro` es responsabilidad del change de Ventas] → Este change solo actualiza sus `<option>` (manteniendo el placeholder «Seleccione un libro»); la lógica de ventas queda intacta para el Ej. 5.
- [Sin tests automatizados] → Verificación manual con los casos del README (caso 1 y 2) + `node --check js/app.js` para chequeo de sintaxis.

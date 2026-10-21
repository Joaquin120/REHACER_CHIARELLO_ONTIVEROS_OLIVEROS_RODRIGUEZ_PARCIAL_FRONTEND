# TPI Frontend de una librería — Librería El Faro de los Libros

Trabajo Práctico Integrador de la materia **Programación III** de la **UTN — Universidad Tecnológica Nacional** (Tecnicatura Universitaria en Programación a Distancia), unidad *HTML, CSS y JavaScript — Repaso para el Parcial 1*.

- **Materia:** Programación III
- **Entrega:** TPI — Frontend de una librería
- **Revisor de la unidad:** Prof. Matías Torres
- **Estado del proyecto:** TPI Finalizado — Versión completa (Ejercicios 1 a 6 implementados)

## Integrantes del equipo

- Joaquín Chiarello, Legajo: 54144

- Santiago Ontivero, Legajo: 54013

- Cristian Rodríguez, Legajo: 54004

- Joseph Oliveros, Legajo: 53969

## Cómo abrir el proyecto

El proyecto no necesita servidor, npm, frameworks, CDNs ni conexión a internet. Se entrega como carpeta con `index.html`, `css/` y `js/`.

1. Descargar o clonar la carpeta del proyecto.
2. Hacer **doble clic en `index.html`**.
3. El navegador abre el archivo con el protocolo `file://` y muestra la aplicación completa.

No hay pasos de instalación ni de compilación: solo HTML5, CSS3 y JavaScript nativo incluidos en el proyecto.

## Arquitectura de vistas e IDs del HTML

`index.html` es la entrada única. Dentro del único `<main id="contenido-principal">` hay 5 secciones ancladas, navegadas por los enlaces del `<nav>`:

| Vista | Ancla | Contenido principal |
|---|---|---|
| Catálogo | `#vista-catalogo` | Buscador por título y listado de libros |
| Libros | `#vista-libros` | Formulario de alta y listado de libros registrados |
| Clientes | `#vista-clientes` | Formulario de alta y listado de clientes registrados |
| Ventas | `#vista-ventas` | Selección de cliente, composición de renglones y resumen |
| Historial | `#vista-historial` | Listado de ventas y detalle de cada venta |

### IDs principales del HTML

| Elemento | ID | Uso |
|---|---|---|
| Contenido principal | `contenido-principal` | Único `<main>` con las 5 vistas |
| Buscador del catálogo | `catalogo-busqueda` | Campo de búsqueda por título |
| Búsqueda sin resultados | `catalogo-sin-resultados` | Mensaje cuando no hay coincidencias |
| Catálogo vacío | `catalogo-listado-vacio` | Mensaje cuando el catálogo no tiene libros |
| Tabla del catálogo | `tabla-catalogo` | Listado de libros del catálogo |
| Formulario de libros | `form-alta-libro` | Alta de libros (título, ISBN, precio, editorial, género, autores) |
| Campos del formulario de libros | `libro-titulo`, `libro-isbn`, `libro-precio`, `libro-editorial`, `libro-genero`, `libro-autores` | Controles del alta de libros |
| Feedback de libros | `libros-feedback` | Resultado correcto o rechazado del alta |
| Libros vacío | `libros-listado-vacio` | Mensaje de lista vacía |
| Tabla de libros registrados | `tabla-libros` | Listado de libros registrados |
| Formulario de clientes | `form-alta-cliente` | Alta de clientes (nombre completo y email) |
| Campos del formulario de clientes | `cliente-nombre`, `cliente-email` | Controles del alta de clientes |
| Feedback de clientes | `clientes-feedback` | Resultado correcto o rechazado del alta |
| Clientes vacío | `clientes-listado-vacio` | Mensaje de lista vacía |
| Tabla de clientes registrados | `tabla-clientes` | Listado de clientes registrados |
| Selección de cliente en venta | `venta-cliente` | Selector de cliente de la venta |
| Selección de libro en venta | `venta-libro` | Selector de libro del renglón |
| Cantidad del renglón | `venta-cantidad` | Campo entero de cantidad |
| Botón agregar renglón | `venta-agregar` | Agrega el renglón a la venta |
| Tabla de renglones | `tabla-renglones` | Renglones de la venta en composición |
| Renglones vacío | `renglones-listado-vacio` | Mensaje cuando la venta no tiene renglones |
| Total de la venta | `venta-total` | Resumen con el total general |
| Botón confirmar venta | `venta-confirmar` | Confirma la venta |
| Feedback de venta | `venta-feedback` | Resultado de confirmar la venta |
| Tabla del historial | `tabla-historial` | Listado de ventas confirmadas |
| Detalle de venta | `tabla-historial-detalle` | Panel de detalle inmutable de la venta elegida |
| Historial vacío | `historial-listado-vacio` | Mensaje cuando no hay ventas |

Convenciones: todas las tablas de listado están dentro de un `<div class="tabla-contenedor">` (futuro desplazamiento propio con `overflow-x: auto`), y los mensajes de estado usan las clases `.mensaje` y `.listado-vacio`.

Estos IDs son un contrato público: los ejercicios siguientes (CSS, datos, altas, ventas y persistencia) los usan sin renombrarlos.

## Estado de la maqueta vs. dinámico

| Parte | Estado actual |
|---|---|
| Navegación por anclas entre las 5 vistas | Funcional (HTML nativo y `aria-current`) |
| Catálogo: listado, datos de ejemplo y buscador | Funcional (JS) — generado y filtrado desde datos locales (Ejercicio 3) |
| Libros: formulario de alta y listado | Funcional (JS) — selectores dinámicos, validaciones y renderizado (Ejercicio 4) |
| Clientes: formulario de alta y listado | Funcional (JS) — validaciones, altas y renderizado dinámico (Ejercicio 4) |
| Ventas: composición, renglones y confirmación | Funcional (JS) — cálculo de subtotales, totales y registro de ventas (Ejercicio 5) |
| Historial: listado y detalle | Funcional (JS) — detalle inmutable desde valores históricos (Ejercicio 5) |
| Mensajes de estado y selects dinámicos | Funcional (JS) — activados dinámicamente en todas las vistas |
| Estilos y Accesibilidad visual | CSS completo (`css/estilos.css`) con foco visible, Flexbox/Grid y adaptabilidad 320 px / 1280 px (Ejercicio 2) |
| Persistencia | Funcional — sincronización completa con `localStorage` (Ejercicio 6) |

## Casos de prueba manuales

Los 8 casos obligatorios de la consigna (`openspec/consignas.md`):

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Búsqueda con una parte del título en mayúsculas; luego búsqueda vacía y texto inexistente | Coincidencias sin distinguir mayúsculas; catálogo completo; mensaje sin resultados |
| 2 | Alta de libro con ISBN existente y luego con ISBN nuevo | El duplicado se rechaza; el válido aparece en catálogo y selección de venta |
| 3 | Alta de cliente con email inválido, email existente en mayúsculas y email nuevo | Se rechazan los dos primeros; el nuevo aparece en listado y selección |
| 4 | Venta sin cliente, cantidad cero, negativa o decimal; libro repetido | No se confirma; el duplicado no crea otro renglón |
| 5 | Venta válida: dos unidades a 1500 y una a 2000 | Subtotales 3000 y 2000; total 5000; detalle conservado en el historial |
| 6 | Venta confirmada y cambio exclusivo del precio de catálogo guardado, en una copia de prueba del proyecto | Al consultar nuevamente el historial después de recargar, el precio unitario, los subtotales y el total de esa venta conservan los valores confirmados |
| 7 | Recarga después de altas y venta | Se recuperan datos sin duplicar ejemplos ni ventas |
| 8 | Navegación por teclado y anchos de 320 px y 1280 px | Foco visible, controles utilizables y tabla con desplazamiento propio si lo necesita |

### Registro de verificación — caso 8 (Ejercicio 2)

Verificación realizada el 20/10/2026 abriendo `index.html` por `file://` en Microsoft Edge (motor Chromium), con navegación por teclado y anchos de viewport de 320 px y 1280 px.

| Comprobación | Resultado observado |
|---|---|
| Scroll horizontal de página | Ausente en 320 px y en 1280 px: `html` y `body` no provocan desplazamiento horizontal |
| Tablas anchas | Se desplazan únicamente dentro de `.tabla-contenedor` (`overflow-x: auto`); la página permanece fija |
| Navegación por teclado | Tab recorre en orden los 5 enlaces, el buscador, todos los campos, selectores y botones |
| Foco visible | `:focus-visible` con `outline` de 3 px y `offset` de 2 px en todos los controles; en la cabecera se usa un tono claro de alto contraste |
| Mensajes de estado | Éxito (✓), error (✕) y listas vacías (—) se distinguen por borde e ícono además del color; los 9 elementos `[hidden]` permanecen ocultos |
| Formularios y controles | Legibles y utilizables en 320 px (una columna, botones a ancho completo) y en 1280 px (grilla de varias columnas con contenido centrado) |

## Estructura del proyecto

```
index.html        ← entrada única (doble clic)
css/estilos.css   ← identidad visual, layout adaptable y accesibilidad (Ejercicio 2)
js/app.js         ← JavaScript nativo (Ejercicio 3 y parte de libros del Ejercicio 4 implementados)
openspec/         ← especificaciones del trabajo (consignas.md y changes/)
README.md         ← este archivo
```

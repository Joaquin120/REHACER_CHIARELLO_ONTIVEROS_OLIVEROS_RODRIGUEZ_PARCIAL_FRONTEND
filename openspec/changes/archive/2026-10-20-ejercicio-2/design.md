## Context

Ver `proposal.md — Why`. El estado actual es una maqueta HTML ya cerrada (Ejercicio 1 archivado) con un contrato público de IDs, clases y contenedores, y un `css/estilos.css` de 9 líneas que solo aplica `box-sizing` y `overflow-x` al `.tabla-contenedor`. Restricciones que condicionan el diseño:

- No se puede tocar `index.html` más allá de verificar el `<link>` a la hoja de estilos.
- Todo debe funcionar por `file://`, sin recursos remotos ni build.
- El HTML no tiene imágenes: la accesibilidad se concentra en foco, contraste y estados textuales.
- Las 5 vistas conviven en una sola página larga, por lo que el anclaje y el foco al navegar importan.
- Los mensajes `.mensaje` / `.listado-vacio` se activan con `hidden` desde JavaScript en los Ejercicios 3–6, y el HTML ya incluye prefijos textuales «OK —» / «Error —» en el contenido de ejemplo.

## Goals / Non-Goals

**Goals:**

- Identidad visual propia y coherente, centralizada en tokens `:root`.
- Componentes reutilizables con clases ya presentes en el HTML (`.cabecera`, `.navegacion`, `.pie`, `.tabla-contenedor`, `.mensaje`, `.listado-vacio`, `.buscador`, `.resumen-venta`).
- Layout Mobile First con Flexbox y Grid, verificado a 320 px y 1280 px sin scroll horizontal de página.
- Foco visible de alto contraste y estados que no dependan solo del color.
- Dejar la base visual estable para los Ejercicios 3–6 sin tocar el contrato del HTML.

**Non-Goals:**

- No se agregan imágenes, íconos externos ni fuentes descargadas.
- No se modifica la semántica, los IDs ni las clases del HTML.
- No se implementa JavaScript, estados dinámicos ni persistencia.
- No se persigue pixel-perfect ni soporte de navegadores antiguos; se apunta a navegadores actuales con soporte de variables CSS, Grid y `:focus-visible`.

## Decisions

### 1. Tokens en `:root` con nomenclatura por rol

Se definen variables por rol (`--color-fondo`, `--color-superficie`, `--color-texto`, `--color-texto-suave`, `--color-primario`, `--color-primario-oscuro`, `--color-borde`, `--color-error`, `--color-exito`, `--color-foco`, `--espacio-*`, `--radio-*`, `--sombra-*`, `--tipografia-base`, `--tamano-*`, `--ancho-contenido`), no por valor (`--azul-500`). Motivo: permite ajustar la paleta sin recorrer la hoja; los componentes consumen roles.

Alternativa descartada: valores literales repetidos. Genera inconsistencias y dificulta el ajuste de contraste.

### 2. Paleta de alto contraste con acento cálido

Base papel claro (`#f7f5f0`), superficies blancas, texto tinta (`#1c2430`), primario verde petróleo oscuro (`#10514f`) y acento ámbar para detalles no críticos. Texto principal sobre superficie supera ampliamente AA; el primario se usa para encabezados de tabla y botones con texto blanco. El estado de foco usa un color distinto (`#b45309` / ámbar oscuro) con `outline` de 3 px y `offset` de 2 px para no confundirse con el borde de los controles.

Alternativa descartada: acento rojo/naranja como color primario. Se reserva la familia roja para error y evita ambigüedad semántica.

### 3. Tipografía del sistema y escala modular simple

`font-family` con pila del sistema (`system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) y escala de tamaños con `clamp()` para títulos, sin descargar fuentes. Motivo: funciona offline por `file://`, respeta preferencias del sistema y evita FOUT.

### 4. Layout: una columna en móvil, contenedor centrado en escritorio

- `body`: columna Flexbox (`min-height: 100vh`, `display: flex; flex-direction: column`) con `main` en `flex: 1`.
- `.cabecera`: Flexbox en columna en móvil y fila con `space-between` desde 768 px.
- `.navegacion ul`: Flexbox con `flex-wrap: wrap` y `gap`, pensado para 320 px sin desbordar.
- `main`: Grid de una columna con `gap` y `max-width: var(--ancho-contenido)` centrado con `margin-inline: auto`; a partir de 1024 px se agrega padding lateral mayor.
- Cada `<section>` se presenta como tarjeta (superficie, borde, radio, sombra suave) con `scroll-margin-top` para que el ancla no quede tapada por la cabecera.
- Formularios: `fieldset` en Grid con `grid-template-columns: 1fr` en móvil y `repeat(auto-fit, minmax(16rem, 1fr))` en pantallas amplias; el botón de envío ocupa el ancho en móvil.
- Tablas: `width: 100%`, `border-collapse: collapse`, `min-width` por tabla (por ejemplo `44rem`) para conservar legibilidad, confinado por `.tabla-contenedor { overflow-x: auto; max-width: 100%; }`.
- Puntos de corte solo con `min-width` (Mobile First): 640 px, 768 px y 1024 px. 320 px y 1280 px se validan como extremos.

Alternativa descartada: `display: grid` en `body` con áreas nombradas. Aporta complejidad sin beneficio para una estructura de cabecera/contenido/pie.

### 5. Contención del scroll horizontal

`html, body { max-width: 100%; overflow-x: hidden; }` se evita como solución principal porque oculta síntomas y puede romper `position: sticky`. En su lugar: `* { box-sizing: border-box; }`, `min-width: 0` en hijos Flex/Grid que contienen tablas, `overflow-wrap: anywhere` en celdas y `min-width` de tabla confinado al contenedor con `overflow-x: auto`. `overflow-x: hidden` queda solo como red de seguridad en `body` si la verificación lo exige.

### 6. Foco visible sin excepciones

Regla global `:focus-visible { outline: 3px solid var(--color-foco); outline-offset: 2px; }` para enlaces, `button`, `input`, `select` y elementos dentro de tablas. No se usa `outline: none` en ningún selector; los estados `:hover`/`:focus` de botones usan `box-shadow` adicional, nunca en reemplazo del outline. En celdas con botones, el foco se marca sobre el botón, no sobre el `<td>`.

### 7. Mensajes diferenciados por estructura, no solo color

- `.mensaje`: bloque con borde izquierdo grueso, fondo tenue y prefijo textual generado con `::before`. Como el HTML ya trae «OK —» / «Error —» cuando JavaScript escribe el texto, el prefijo CSS es refuerzo decorativo (no esencial) y los lectores de pantalla obtienen el significado del texto real.
- Estados: `.mensaje` base neutro; `.mensaje.exito` / `.mensaje.error` (o selectores por `[data-estado]` si el JS futuro los agrega) con borde, fondo y prefijo distintos. Se documenta que el color nunca es el único portador.
- `.listado-vacio`: borde discontinuo, fondo rayado sutil y prefijo «—» decorativo; el texto del HTML comunica el estado.
- `[hidden] { display: none !important; }` para que las reglas de `display` de los mensajes no reactiven elementos ocultos.

Alternativa descartada: depender solo de `color`/`background`. Incumple el requisito de accesibilidad de la consigna.

### 8. Sin cambios en el HTML

Los estilos se apoyan en selectores existentes (elementos, clases e IDs ya definidos). Si un ajuste exigiera una clase nueva, se resuelve con selectores estructurales (`section > h2`, `form fieldset > div`, `table tbody tr:nth-child(even)`) antes que editar `index.html`. Solo se verifica el `<link rel="stylesheet" href="css/estilos.css">`.

### 9. README como evidencia de verificación

Se actualiza la etapa a «Ejercicio 2», se ajusta la fila de estilos de la tabla de estado y se amplía la tabla de casos manuales con la columna/registro de verificación del caso 8, describiendo foco con Tab, anchos 320/1280 y desplazamiento de tablas dentro de `.tabla-contenedor`.

## Risks / Trade-offs

- **`min-width` de tablas genera scroll interno en 320 px** → Es el comportamiento buscado; se verifica que el scroll quede dentro de `.tabla-contenedor` y que la página no se desplace.
- **Contenido generado con `::before` no siempre lo anuncian los lectores de pantalla** → Los prefijos CSS son refuerzo visual; el texto del HTML y los mensajes escritos por JavaScript conservan el significado.
- **`overflow-x: hidden` en `body` puede enmascarar desbordes reales** → Se usa solo como último recurso y se valida con capturas/inspección a 320 px y 1280 px.
- **`:focus-visible` no se activa con clic de mouse** → Es el comportamiento deseado; el foco por teclado es el caso que exige la consigna.
- **Reglas de autor sobre `[hidden]`** → Se resuelve con `display: none !important` acotado al atributo.
- **Contraste insuficiente en textos sobre fondos tenues** → Se eligen combinaciones con margen sobre AA y se verifica manualmente en los estados de error, éxito y vacío.
- **Cambios futuros de JavaScript que agreguen clases de estado** → El diseño deja `.mensaje` como base neutra y documenta las clases de estado previstas (`.exito`, `.error`) para que los Ejercicios 3–6 solo las apliquen.

## Migration Plan

1. Reemplazar el contenido de `css/estilos.css` por la hoja completa.
2. Verificar que `index.html` mantenga el `<link>` a `css/estilos.css` y que no cambien IDs ni clases.
3. Abrir por `file://` y validar a 320 px y 1280 px: sin scroll horizontal, foco visible con Tab, tablas con scroll interno.
4. Actualizar `README.md` (etapa, estado de estilos, caso 8, estructura del proyecto).
5. Rollback: `git checkout -- css/estilos.css README.md` restaura el estado del Ejercicio 1.

## Open Questions

Ninguna que afecte el alcance; el registro del caso 8 se completa con el resultado observado durante la implementación.

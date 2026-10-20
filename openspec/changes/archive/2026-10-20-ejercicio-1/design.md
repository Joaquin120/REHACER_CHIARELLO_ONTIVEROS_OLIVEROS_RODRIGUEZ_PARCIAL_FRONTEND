# Design

## Context

El proyecto está vacío (solo existe `openspec/`); no hay `index.html`, `css/` ni `js/`. El Ejercicio 1 de la consigna pide la estructura HTML completa del frontend de la librería, y los Ejercicios 2–6 cuelgarán de los IDs y contenedores que se definan ahora. Ver `proposal.md` — Why. La consigna completa y la fuente única de requisitos es `openspec/consignas.md`.

Restricciones duras: solo HTML5 semántico, CSS3 y JavaScript nativo; sin frameworks, librerías, CDNs ni npm; ejecución por file://; persistencia exclusivamente en localStorage (ejercicio 6). Este cambio NO agrega lógica de JavaScript ni estilos propios del Ejercicio 2: solo la estructura y la presentación mínima de la maqueta.

## Goals / Non-Goals

**Goals:**
- Producir `index.html` con las 5 vistas navegables, semántica y accesibilidad exigidas, todos los IDs que la consigna nombra explícitamente y los contenedores de estado previstos.
- Producir un `README.md` inicial completo (apertura, IDs, maqueta vs. dinámico, 8 casos manuales).
- Dejar un contrato de estructura estable (IDs, clases `.tabla-contenedor`, zonas de feedback) que los cambios siguientes puedan consumir sin refactorizar el HTML.

**Non-Goals:**
- Estilos del Ejercicio 2 (identidad visual, Flexbox/Grid, responsive 320 px/1280 px) — se agrega como mínimo un CSS propio opcional para que la maqueta sea legible, sin abordar la evaluación de ese ejercicio.
- Cualquier JavaScript de datos, filtro, validación, altas, ventas o persistencia (Ejercicios 3–6).
- Poblar los listados con datos reales: en esta etapa son datos estáticos de ejemplo o listados vacíos con sus estados.

## Decisions

1. **Página única con anclas vs. múltiples páginas**: se elige una sola página con `<main id="contenido-principal">` y 5 secciones ancladas, navegadas por `href="#vista-..."`. Alternativa descartada: varias páginas HTML, que duplicaría encabezado/navegación y complicaría la futura interacción entre vistas (una venta referenciando catálogo y clientes).

2. **Tablas de datos dentro de `.tabla-contenedor`**: todas las tablas de listado (`thead`/`th` incluidos) se envuelven en un `<div class="tabla-contenedor">`. Esto responde directamente al requisito del Ejercicio 2 de que "si una tabla necesita más espacio, se desplaza dentro de su propio contenedor": el JS/CSS futuro solo necesita aplicar `overflow-x: auto` a esa clase. Alternativa descartada: listas `<ul>`, que perderían los encabezados de columna exigidos.

3. **IDs como contrato público**: se respetan literalmente los IDs que la consigna nombra (`#form-alta-libro`, `#form-alta-cliente`, `#venta-libro`, `#venta-cantidad`, `#tabla-renglones`, `#venta-total`, `#tabla-historial`, `#tabla-historial-detalle`, `#contenido-principal` y las 5 `#vista-*`), y para el resto se adopta una convención kebab-case descriptiva (`#catalogo-busqueda`, `#catalogo-listado`, `#libros-listado`, `#clientes-listado`, `#venta-cliente`, `#venta-agregar`, `#venta-confirmar`, mensajes `#*-feedback`, `#*-vacio`, `#catalogo-sin-resultados`). Los nombres quedan documentados en el README para que los cambios siguientes no inventen IDs divergentes.

4. **Contenedores de estado con contenido oculto por defecto**: los mensajes de lista vacía, búsqueda sin resultados y feedback se incluyen en el HTML con texto inicial y una clase/atributo que permita ocultarlos (por ejemplo, `hidden` o clase `.oculto`), dejando la activación al JS futuro. Alternativa descartada: no incluirlos y crearlos desde JS, que rompería el requisito de que "la estructura contempla los estados que luego utiliza JavaScript".

5. **Selects de editorial/género/autores con opciones de ejemplo estáticas**: como el Ejercicio 1 no carga datos con JS, los selectores del formulario de libros se pre-cargan con opciones de ejemplo fijas (editoriales, géneros con «Sin clasificar» primera y autores), marcando en el README que serán generados por JS en el Ejercicio 4. Esto permite validar la semántica y la accesibilidad de la maqueta sin lógica.

6. **Documentación en español**: README y artefactos en español, coherentes con la consigna y con la corrección académica.

## Risks / Trade-offs

- [Los ejercicios siguientes modifiquen el HTML y rompan el contrato de IDs] → El README documenta los IDs y este cambio los deja completos; los cambios siguientes deben tratarlos como API pública.
- [La maqueta sin CSS resulte poco presentable] → Se agrega un CSS mínimo propio (sin frameworks) solo para legibilidad; la identidad visual completa queda para el Ejercicio 2.
- [Los selects con opciones estáticas confundan al revisor sobre el estado del proyecto] → El README deja explícito qué es maqueta estática y qué se hará dinámico después.
- [Los mensajes de estado ocultos pasen desapercibidos en la revisión del Ejercicio 1] → Se incluyen con texto visible en al menos un ejemplo o se explica su presencia en el README.

## Open Questions

- Cantidad de datos estáticos de ejemplo en listados y tablas: se definen 2–3 registros ficticios por listado (suficiente para la revisión de Etapa 1) — no afecta a los requisitos ni al desglose de tareas.

# Design

## Context

El proyecto es un TPI Vanilla abierto por `file://`: `index.html`, `css/estilos.css` y un único `js/app.js` ya funcional para catálogo, filtro y alta de libros (Ejercicio 3 y parte de libros del Ejercicio 4). El HTML de las cinco vistas ya expone los IDs del contrato público, incluidos los formularios y tablas de clientes, ventas e historial, con datos estáticos de ejemplo que el JavaScript reemplaza. No hay npm, frameworks, fetch, backend ni tests automatizados. Ver `proposal.md` para la motivación y `specs/` para los requisitos.

## Goals / Non-Goals

**Goals:**

- Completar clientes, ventas e historial en el mismo `js/app.js`, reutilizando el modelo y los helpers existentes.
- Persistir libros, clientes y ventas en `localStorage` con una única clave versionada, cargando ejemplos solo la primera vez.
- Garantizar que el detalle histórico use copias de precio y datos descriptivos tomadas al agregar/confirmar la venta.
- Mantener la inserción de datos de usuario con `textContent`/`createElement` y sin dependencias.

**Non-Goals:**

- No se reimplementa el alta de libros ni el catálogo (ya funcionan); solo se integran con el guardado.
- No se editan ni eliminan ventas confirmadas, ni se administra stock, cobros o facturación.
- No se persisten editoriales, géneros ni autores: son catálogos fijos de la aplicación.
- No se agregan tests con frameworks ni se modifica la arquitectura de una sola página.

## Decisions

1. **Continuar con un único `js/app.js` organizado por secciones** — Se mantiene el patrón existente (`'use strict'`, datos al inicio, helpers, renderizado, eventos, `inicializar()`). Se agregan secciones de clientes, ventas, historial y persistencia. *Alternativa descartada:* módulos ES o archivos separados — `file://` y el requisito de carpeta sin build favorecen el archivo único.
2. **Clave única versionada `libreriaElFaro.v1`** — Se guarda un objeto `{ version: 1, libros, clientes, ventas }`. No se guardan editoriales, géneros ni autores porque son datos fijos del código. Al iniciar: si no hay clave, se usan los ejemplos y se guardan; si hay clave válida, se reemplaza el contenido de los arrays con `splice` para conservar las referencias `const`; si el JSON es inválido, la versión no coincide o faltan colecciones, se descarta y se vuelve a los ejemplos. *Alternativa descartada:* guardar cada colección en una clave separada — más operaciones y riesgo de estados parciales.
3. **Persistir después de cada operación confirmada** — `guardarDatos()` se invoca después de un alta válida de libro, un alta válida de cliente y una venta confirmada. Se envuelve en `try/catch` y se detecta `localStorage` disponible; si falla, la aplicación sigue en memoria y el feedback no se rompe. *Alternativa descartada:* guardar en cada `input` — escrituras innecesarias y estados intermedios inválidos.
4. **Clientes: formulario con `novalidate` y validación propia** — Se agrega `novalidate` a `#form-alta-cliente` para que el envío siempre llegue al manejador, se ejecute `preventDefault()` y los errores se muestren en `#clientes-feedback` en lugar de depender solo de los globos nativos. Se valida nombre no vacío, email con expresión regular simple y unicidad con `email.trim().toLowerCase()`. *Alternativa descartada:* confiar solo en `type="email" required` — impide mostrar el feedback textual exigido y no cubre duplicados.
5. **Composición de la venta en un array en memoria `renglonesVenta`** — Cada renglón es `{ idLibro, titulo, cantidad, precioUnitario, subtotal }`. Al agregar se busca el libro en el catálogo y se copia su `precio` y `titulo`; el subtotal se calcula con `cantidad * precioUnitario`. La tabla `#tabla-renglones` se re-renderiza desde ese array. *Alternativa descartada:* leer precios del catálogo al confirmar — rompería el requisito de precio histórico si el catálogo cambia.
6. **Duplicados: rechazo con instrucción de editar el renglón existente** — Si el libro ya está en `renglonesVenta`, no se agrega otro renglón y `#venta-feedback` muestra un `Error —` que indica modificar la cantidad del renglón ya presente. La tabla de renglones incluye un `input` numérico por fila para cambiar la cantidad y un botón para quitar el renglón; se agrega una columna de acciones al `thead`. *Alternativa descartada:* sumar cantidades automáticamente — oculta el duplicado en lugar de informarlo y complica la validación.
7. **Cantidad validada como entero positivo** — Se usa `Number(valor)` y `Number.isInteger(valor) && valor > 0`; se rechazan cero, negativos, decimales y texto vacío. El `input` se configura con `min="1"` y `step="1"`, pero la validación real queda en JavaScript.
8. **Confirmación con snapshot profundo y limpieza total** — Al confirmar se valida cliente existente y renglones válidos, se calcula el total, se crea `{ id: 'V-0001', fecha: new Date().toISOString(), idCliente, nombreCliente, renglones: copia, total }` y se agrega a `ventas`. Los renglones se copian uno a uno para que el historial no comparta referencias con la composición. Luego se vacía `renglonesVenta`, se resetean los controles, se renderiza el historial y se guarda. El identificador se deriva del mayor sufijo numérico existente más uno.
9. **Historial y detalle renderizados solo desde datos guardados** — `#tabla-historial` se genera con una fila por venta y un botón `Ver detalle de la venta V-####`; al activarlo se construye una tabla dentro de `#tabla-historial-detalle` con los renglones históricos y un `tfoot` con el total. No se agregan controles de edición ni eliminación. La fecha se muestra en formato local legible (dd/mm/aaaa).
10. **Formato de importes reutilizado** — Se mantiene `formatearPrecio` (`$` + dos decimales con coma y sin separador de miles) para catálogo, renglones, total e historial, coherente con la maqueta y los casos manuales.
11. **Actualización en vivo de selectores** — `cargarSelectoresVenta()` llena `#venta-cliente` con clientes y `#venta-libro` con libros; se invoca al iniciar y después de altas o de recuperar datos. Al confirmar una venta no se eliminan libros ni clientes, por lo que los selectores conservan sus opciones.

## Risks / Trade-offs

- [`localStorage` no disponible o bloqueado en algunos navegadores/perfiles] → Se detecta con `try/catch`; la aplicación funciona en memoria y el README advierte la limitación.
- [Datos guardados de una versión anterior o corruptos] → Clave versionada y validación mínima de forma; ante cualquier inconsistencia se descartan y se recargan los ejemplos.
- [El precio del catálogo cambia antes de confirmar una venta en composición] → El renglón conserva el precio copiado al agregarlo; es el comportamiento histórico esperado y se documenta.
- [Cantidad editable con valores inválidos en la tabla] → Cada cambio se valida antes de recalcular; si es inválido se revierte al valor anterior y se informa en `#venta-feedback`.
- [Sin tests automatizados por la restricción de npm] → Verificación con `node --check js/app.js`, inspección de `localStorage` desde DevTools y recorrido manual de los 8 casos del README.
- [Agregar una columna de acciones a `#tabla-renglones`] → Es un cambio de HTML presentacional; no altera IDs del contrato ni la semántica de la tabla.

## Migration Plan

No existe una clave de almacenamiento previa en la versión actual. En el primer inicio con esta versión se crea `libreriaElFaro.v1` con los ejemplos. Para reiniciar los datos de prueba, se borra esa clave desde DevTools o se ejecuta `localStorage.removeItem('libreriaElFaro.v1')` y se recarga. Un cambio futuro de esquema debe subir la versión de la clave y decidir explícitamente si migra o descarta los datos anteriores.

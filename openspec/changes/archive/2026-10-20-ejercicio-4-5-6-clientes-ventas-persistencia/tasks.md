# Tasks

## 1. Persistencia local y carga inicial

- [x] 1.1 Implementar en `js/app.js` la clave versionada `libreriaElFaro.v1`, `cargarDatos()` y `guardarDatos()` con validación de forma, `try/catch` y reemplazo de los arrays mediante `splice`; verificar en DevTools que el primer inicio crea la clave con libros, clientes y ventas, y que una recarga conserva los mismos datos sin duplicar ejemplos (caso 7 parcial).
- [x] 1.2 Integrar `cargarDatos()` antes del primer renderizado y `guardarDatos()` después de un alta válida de libro; verificar que un libro registrado sigue presente tras recargar y que los ejemplos iniciales no se duplican.
- [x] 1.3 Documentar en `README.md` el uso de `localStorage`, su dependencia del navegador, perfil y ubicación de apertura, y cómo reiniciar los datos borrando `libreriaElFaro.v1`; verificar que el texto coincide con el comportamiento observado y que no afirma compartir datos entre usuarios.

## 2. Alta y listado de clientes (Ejercicio 4)

- [x] 2.1 Agregar `novalidate` a `#form-alta-cliente` e implementar el renderizado dinámico de `#tabla-clientes` (nombre completo y email, solo con `textContent`), la alternancia con `#clientes-listado-vacio` y la carga de `#venta-cliente`; verificar que los 3 clientes de ejemplo se muestran, que el selector tiene sus opciones y que el mensaje de lista vacía aparece al vaciar temporalmente el array.
- [x] 2.2 Implementar `manejarAltaCliente` con `preventDefault()`, validación de nombre no vacío, formato de email y unicidad por `trim().toLowerCase()`, feedback `OK —`/`Error —` en `#clientes-feedback`, `proximoIdCliente`, alta en el modelo y actualización en vivo de `#tabla-clientes` y `#venta-cliente`; verificar el caso 3 (email inválido, email existente en mayúsculas y email nuevo).
- [x] 2.3 Guardar los datos tras un alta válida de cliente y verificar que el cliente nuevo se recupera al recargar sin duplicar los ejemplos (caso 7 parcial).
- [x] 2.4 Actualizar la sección de estado del `README.md` para clientes (formulario, listado y selector dinámicos) y verificar que la tabla de IDs no cambió.

## 3. Composición y cálculo de la venta (Ejercicio 5)

- [x] 3.1 Implementar el array `renglonesVenta`, el renderizado de `#tabla-renglones` (libro, cantidad, precio unitario y subtotal) con `#renglones-listado-vacio`, y el cálculo de `#venta-total` con `formatearPrecio`; verificar que al iniciar no quedan filas estáticas ni total de ejemplo.
- [x] 3.2 Implementar el agregado de renglones con libro existente y cantidad entera positiva, copiando título y precio unitario desde el catálogo, rechazando cantidades cero/negativas/decimales y libros repetidos con mensajes en `#venta-feedback`; verificar el caso 4 y que un duplicado no crea un segundo renglón.
- [x] 3.3 Agregar la columna de acciones al `thead` de `#tabla-renglones`, un `input` de cantidad por fila y un botón para quitar el renglón; validar cada cambio de cantidad, recalcular subtotal y total, y verificar que un valor inválido no modifica el renglón y que quitar filas actualiza `#venta-total`.
- [x] 3.4 Actualizar el estado del `README.md` para composición de ventas y verificar que la descripción coincide con las operaciones disponibles.

## 4. Confirmación, historial y detalle inmutable (Ejercicios 5 y 6)

- [x] 4.1 Implementar la confirmación de venta: validar cliente existente y renglones, calcular total, registrar identificador `V-####`, fecha, cliente y copia profunda de renglones, mostrar `OK —` en `#venta-feedback`, limpiar el formulario y la composición; verificar el caso 5 (2 × 1500 + 1 × 2000 = subtotales 3000 y 2000, total 5000) y que una venta sin cliente o sin renglones no se registra.
- [x] 4.2 Implementar el renderizado de `#tabla-historial` (identificador, fecha legible, cliente, total y botón de detalle) con `#historial-listado-vacio`, y el detalle en `#tabla-historial-detalle` desde los renglones guardados, sin controles de edición ni eliminación; verificar que el detalle muestra libro, cantidad, precio unitario, subtotal y total de la venta elegida.
- [x] 4.3 Guardar los datos al confirmar una venta y verificar el caso 6 en una copia de prueba: confirmar una venta, cambiar el precio del libro en el catálogo, recargar y comprobar que el detalle histórico conserva precio unitario, subtotales y total originales; verificar también el caso 7 (recarga sin duplicar ventas).
- [x] 4.4 Actualizar el estado del `README.md` para venta confirmada, historial y detalle inmutable, y verificar que se explica que las ventas no se editan ni eliminan.

## 5. Verificación integral y cierre (Ejercicio 6)

- [x] 5.1 Ejecutar `node --check js/app.js` y abrir `index.html` por `file://`; verificar que la consola no muestra errores, que no hay referencias a IDs inexistentes y que los IDs documentados en `README.md` siguen presentes en el DOM.
- [x] 5.2 Recorrer manualmente los 8 casos del README (búsqueda, ISBN duplicado, email inválido/duplicado/nuevo, venta inválida, venta válida, precio histórico tras recarga, recarga sin duplicados y navegación por teclado/320 px/1280 px con el CSS existente) y registrar el resultado de cada caso en el README; verificar que la guía indica que los 8 casos son ejecutables.
- [x] 5.3 Revisar el `README.md` completo (etapa actual, arquitectura, tabla maqueta vs. dinámico, casos manuales y estructura del proyecto) y verificar que ya no describe clientes, ventas, historial ni persistencia como pendientes.
- [x] 5.4 Verificar que no se agregaron npm, frameworks, CDNs, fetch ni dependencias, y que `js/app.js` mantiene `'use strict'`, `preventDefault()` e inserción de datos de usuario con `textContent`/`createElement`.

## Workflow follow-up

- Ejecutar `/opsx-archive ejercicio-4-5-6-clientes-ventas-persistencia` tras la revisión, para sincronizar los deltas a `openspec/specs/` y archivar el change.

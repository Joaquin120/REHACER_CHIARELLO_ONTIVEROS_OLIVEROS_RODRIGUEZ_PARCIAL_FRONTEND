# Proposal

## Why

El proyecto ya tiene catálogo, filtro y alta de libros funcionales (Ejercicio 3 y parte de libros del Ejercicio 4), pero Clientes sigue siendo maqueta estática y Ventas/Historial no ejecutan ninguna operación. Para completar el TPI faltan el alta validada de clientes, la venta simulada con precio histórico inmutable y la persistencia en `localStorage` documentada en el README, sin romper el contrato de IDs ya publicado.

## What Changes

- Alta de clientes en `#form-alta-cliente` con `preventDefault()`: nombre completo y email obligatorios, formato de email válido y email único comparado sin espacios exteriores y sin distinguir mayúsculas/minúsculas. Feedback `OK —` / `Error —` en `#clientes-feedback` y listado dinámico en `#tabla-clientes` (con `#clientes-listado-vacio`).
- Actualización en vivo del selector `#venta-cliente` al registrar un cliente, sin recargar la página.
- Venta simulada: selección de cliente existente, agregado de renglones con libro existente y cantidad entera mayor que cero, rechazo de libros repetidos (se modifica la cantidad del renglón existente o se informa el duplicado), edición de cantidades y eliminación de renglones antes de confirmar.
- Cálculos por renglón (subtotal = cantidad × precio unitario) y total general en `#venta-total`, con importes a dos decimales; confirmación bloqueada sin cliente, sin renglones o con cantidades inválidas.
- Confirmación de venta: se registra identificador, fecha, cliente, renglones y total. Cada renglón copia y conserva su precio unitario y datos descriptivos como valores históricos, de modo que el detalle en `#tabla-historial-detalle` nunca se recalcula desde el catálogo actual.
- Historial dinámico en `#tabla-historial` (identificador, fecha, cliente, total y acceso al detalle) con `#historial-listado-vacio`; las ventas confirmadas no se editan ni eliminan desde la interfaz.
- Persistencia con `localStorage` para libros, clientes y ventas: carga de ejemplos en el primer inicio, recuperación de datos guardados en aperturas posteriores sin duplicar ejemplos ni ventas, y guardado tras cada alta o venta confirmada.
- Actualización de `README.md`: estado final de la aplicación, funcionamiento y límites de `localStorage` (depende del navegador, el perfil y la ubicación de apertura; no comparte información entre usuarios), y guía de los 8 casos manuales ya ejecutables.

**Notas de alcance**: la parte de alta de libros del Ejercicio 4 ya está implementada y no se rehace; solo se integra con la persistencia. No se agregan edición ni baja de registros, stock, cobros ni facturación. No se modifican los IDs existentes del HTML salvo que la implementación lo requiera; el contrato documentado en `README.md` se mantiene.

## Capabilities

### New Capabilities

- `persistencia-local`: conservación en `localStorage` de libros, clientes y ventas, con carga inicial de ejemplos, recuperación sin duplicados y guardado tras cada operación confirmada.

### Modified Capabilities

- `gestion-clientes`: se agregan requisitos de alta validada con `preventDefault()`, unicidad de email y listado dinámico con actualización en vivo de los selectores relacionados.
- `ventas-historial`: se agregan requisitos de composición interactiva de renglones, cálculos de subtotal y total, validaciones de confirmación, registro de la venta e historial con detalle inmutable basado en valores históricos.
- `documentacion`: el README debe reflejar el estado final del TPI, el comportamiento y las limitaciones de `localStorage`, y los casos manuales ejecutables.

## Impact

- `js/app.js`: se amplía el modelo con ventas y persistencia; se agregan funciones de renderizado, validación, composición de venta, confirmación e historial, manteniendo Vanilla JS, `'use strict'`, inserción con `textContent`/`createElement` y sin fetch ni dependencias.
- `index.html`: el HTML actual ya expone todos los IDs necesarios (`#form-alta-cliente`, `#clientes-feedback`, `#tabla-clientes`, `#venta-cliente`, `#venta-libro`, `#venta-cantidad`, `#venta-agregar`, `#tabla-renglones`, `#venta-total`, `#venta-confirmar`, `#venta-feedback`, `#tabla-historial`, `#tabla-historial-detalle`, `#historial-listado-vacio`); en principio no requiere cambios estructurales.
- `README.md`: actualización de estado, persistencia, estructura del proyecto y guía de casos manuales.
- `localStorage` del navegador: nueva clave de almacenamiento versionada; los datos quedan ligados al navegador, perfil y origen de apertura.
- Sin cambios en `css/estilos.css`, sin npm, frameworks, CDNs ni backend.

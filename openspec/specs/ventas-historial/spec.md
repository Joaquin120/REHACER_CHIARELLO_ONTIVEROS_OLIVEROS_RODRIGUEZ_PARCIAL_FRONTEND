# ventas-historial Specification

## Purpose

Define la estructura de las vistas de ventas e historial: composición de renglones de venta, tabla de renglones y total general, más el listado de ventas históricas y el panel de detalle inmutable de cada venta.

## Requirements

### Requirement: Selección de cliente y composición de renglones
La vista `#vista-ventas` SHALL permitir seleccionar un cliente (selector con etiqueta asociada) y armar renglones de venta mediante un selector de libro con id `#venta-libro` y un campo numérico entero de cantidad con id `#venta-cantidad`, más un botón con texto descriptivo para agregar el renglón.

#### Scenario: Controles de renglón con los ids exigidos
- **WHEN** se inspecciona la composición de la venta
- **THEN** existen el selector `#venta-libro` y el campo entero `#venta-cantidad`, cada uno con su `<label for>`

#### Scenario: Acción descriptiva
- **WHEN** se lee el botón de agregar renglón
- **THEN** su texto describe la acción de agregar el renglón a la venta

### Requirement: Tabla de renglones de la venta
La vista SHALL mostrar los renglones de la venta en una tabla con id `#tabla-renglones`, con encabezados (`thead`/`th`) para libro, cantidad, precio unitario y subtotal, envuelta en `.tabla-contenedor`.

#### Scenario: Tabla con encabezados
- **WHEN** se inspecciona la tabla de renglones
- **THEN** tiene `thead` con las columnas libro, cantidad, precio unitario y subtotal, dentro de un `.tabla-contenedor`

### Requirement: Resumen con total general
La vista SHALL mostrar el resumen de la venta con el total general en un elemento con id `#venta-total`, junto con un botón con texto descriptivo para confirmar la venta y un contenedor de feedback de la operación.

#### Scenario: Total visible
- **WHEN** se revisa el resumen de la venta
- **THEN** existe el elemento `#venta-total` destinado a mostrar el importe total

### Requirement: Historial de ventas
La vista `#vista-historial` SHALL listar las ventas registradas en una tabla con id `#tabla-historial` con encabezados (por ejemplo, identificador, fecha, cliente y total) dentro de `.tabla-contenedor`, y un botón o enlace con texto descriptivo por cada venta para consultar su detalle.

#### Scenario: Listado histórico
- **WHEN** se inspecciona la vista de historial
- **THEN** existe la tabla `#tabla-historial` con encabezados y controles de acceso al detalle por venta

### Requirement: Detalle inmutable de la venta
La vista SHALL incluir un panel con id `#tabla-historial-detalle` para mostrar el detalle de una venta (sus renglones con libro, cantidad, precio unitario y subtotal, y el total). Las ventas confirmadas no SHALL disponer de controles de edición o eliminación en la interfaz, y el detalle se SHALL componer desde los valores históricos registrados en la venta, no desde el catálogo actual.

#### Scenario: Sin controles de edición
- **WHEN** se revisa el detalle de una venta
- **THEN** no hay botones ni enlaces para editar o eliminar la venta

#### Scenario: Panel de detalle presente
- **WHEN** se inspecciona la vista de historial
- **THEN** existe el contenedor `#tabla-historial-detalle` destinado a renderizar el detalle de la venta seleccionada

### Requirement: Estados vacíos e insumos para JavaScript
Las vistas de ventas e historial SHALL prever contenedores semánticos para mensajes de operación correcta o rechazada (cerca del formulario de venta) y para la lista vacía del historial, de modo que el JavaScript de los ejercicios siguientes pueda activarlos sin tocar la estructura.

#### Scenario: Feedback de venta
- **WHEN** se revisa el formulario de venta
- **THEN** existe un contenedor identificable para el resultado de confirmar la venta

#### Scenario: Historial vacío
- **WHEN** se revisa la vista de historial
- **THEN** existe el contenedor para el mensaje de historial sin ventas

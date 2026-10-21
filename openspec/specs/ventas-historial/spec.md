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

La vista `#vista-historial` SHALL listar las ventas registradas en una tabla con id `#tabla-historial` con encabezados (por ejemplo, identificador, fecha, cliente y total) dentro de `.tabla-contenedor`, y un botón o enlace con texto descriptivo por cada venta para consultar su detalle. El listado SHALL renderizarse dinámicamente desde las ventas registradas y SHALL mostrar `#historial-listado-vacio` cuando no existan ventas.

#### Scenario: Listado histórico

- **WHEN** se inspecciona la vista de historial
- **THEN** existe la tabla `#tabla-historial` con encabezados y controles de acceso al detalle por venta

#### Scenario: Ventas listadas

- **WHEN** existen ventas registradas
- **THEN** `#tabla-historial` muestra una fila por venta con identificador, fecha, cliente y total

#### Scenario: Historial vacío

- **WHEN** no existen ventas registradas
- **THEN** `#historial-listado-vacio` es visible y la tabla no muestra filas de datos

#### Scenario: Acceso al detalle

- **WHEN** se activa el control de detalle de una venta del historial
- **THEN** `#tabla-historial-detalle` muestra los renglones y el total de esa venta

### Requirement: Detalle inmutable de la venta

La vista SHALL incluir un panel con id `#tabla-historial-detalle` para mostrar el detalle de una venta (sus renglones con libro, cantidad, precio unitario y subtotal, y el total). Las ventas confirmadas no SHALL disponer de controles de edición o eliminación en la interfaz, y el detalle se SHALL componer desde los valores históricos registrados en la venta, no desde el catálogo actual.

#### Scenario: Sin controles de edición

- **WHEN** se revisa el detalle de una venta
- **THEN** no hay botones ni enlaces para editar o eliminar la venta

#### Scenario: Panel de detalle presente

- **WHEN** se inspecciona la vista de historial
- **THEN** existe el contenedor `#tabla-historial-detalle` destinado a renderizar el detalle de la venta seleccionada

#### Scenario: Precio histórico conservado tras cambiar el catálogo

- **WHEN** se confirma una venta, luego cambia el precio del libro en el catálogo y se recarga la página
- **THEN** el detalle de esa venta conserva el precio unitario, los subtotales y el total confirmados originalmente

#### Scenario: Detalle desde valores registrados

- **WHEN** se consulta el detalle de una venta
- **THEN** los importes se leen de los valores guardados en la venta y no se recalculan con el precio actual del catálogo

### Requirement: Estados vacíos e insumos para JavaScript
Las vistas de ventas e historial SHALL prever contenedores semánticos para mensajes de operación correcta o rechazada (cerca del formulario de venta) y para la lista vacía del historial, de modo que el JavaScript de los ejercicios siguientes pueda activarlos sin tocar la estructura.

#### Scenario: Feedback de venta
- **WHEN** se revisa el formulario de venta
- **THEN** existe un contenedor identificable para el resultado de confirmar la venta

#### Scenario: Historial vacío
- **WHEN** se revisa la vista de historial
- **THEN** existe el contenedor para el mensaje de historial sin ventas

### Requirement: Composición interactiva de renglones

La vista de ventas SHALL permitir agregar renglones con un libro existente y una cantidad entera mayor que cero, modificar la cantidad de un renglón y quitarlo antes de confirmar. No SHALL admitir dos renglones del mismo libro en una misma venta.

#### Scenario: Agregar renglón válido

- **WHEN** se elige un libro existente y una cantidad entera mayor que cero y se activa el botón de agregar
- **THEN** el renglón se incorpora a `#tabla-renglones` con libro, cantidad, precio unitario y subtotal

#### Scenario: Cantidad inválida rechazada

- **WHEN** se intenta agregar un renglón con cantidad cero, negativa, decimal o vacía
- **THEN** el renglón no se agrega y `#venta-feedback` muestra un mensaje `Error —` que explica el motivo

#### Scenario: Libro repetido rechazado

- **WHEN** se intenta agregar un libro que ya está en la venta
- **THEN** no se crea un segundo renglón para ese libro y `#venta-feedback` informa el duplicado o se modifica la cantidad del renglón existente

#### Scenario: Modificar cantidad y quitar renglón

- **WHEN** la venta aún no fue confirmada
- **THEN** se puede cambiar la cantidad de un renglón y quitarlo de la composición

### Requirement: Cálculo de subtotales y total

Cada renglón SHALL calcular su subtotal como cantidad por precio unitario y la venta SHALL mostrar en `#venta-total` la suma de todos los subtotales. Los importes SHALL presentarse con dos decimales.

#### Scenario: Subtotal por renglón

- **WHEN** un renglón tiene cantidad 2 y precio unitario 1500
- **THEN** su subtotal mostrado es 3000 con dos decimales

#### Scenario: Total de la venta

- **WHEN** la venta tiene renglones con subtotales 3000 y 2000
- **THEN** `#venta-total` muestra 5000 con dos decimales

#### Scenario: Total actualizado

- **WHEN** se agrega, modifica o quita un renglón
- **THEN** `#venta-total` se recalcula sin recargar la página

### Requirement: Validación de confirmación de venta

El sistema SHALL impedir confirmar una venta sin cliente seleccionado, sin renglones o con cantidades inválidas, y SHALL explicar el motivo en `#venta-feedback`.

#### Scenario: Venta sin cliente

- **WHEN** se intenta confirmar una venta sin cliente seleccionado
- **THEN** la venta no se registra y `#venta-feedback` muestra un mensaje `Error —`

#### Scenario: Venta sin renglones

- **WHEN** se intenta confirmar una venta sin renglones
- **THEN** la venta no se registra y `#venta-feedback` muestra un mensaje `Error —`

### Requirement: Confirmación y registro de la venta

Al confirmar una venta válida, el sistema SHALL registrar un identificador único, la fecha, el cliente, los renglones y el total, y SHALL mostrar un mensaje `OK —` en `#venta-feedback`, limpiar el formulario y dejar la venta disponible en el historial.

#### Scenario: Venta confirmada

- **WHEN** se confirma una venta con cliente, al menos un renglón válido y total calculado
- **THEN** la venta se registra con identificador, fecha, cliente, renglones y total

#### Scenario: Formulario limpio tras confirmar

- **WHEN** se confirma una venta válida
- **THEN** el formulario de venta queda sin cliente seleccionado y sin renglones para una nueva venta

#### Scenario: Ventas confirmadas no editables

- **WHEN** una venta ya fue confirmada
- **THEN** la interfaz no ofrece controles para editarla ni eliminarla

# Spec Delta

## ADDED Requirements

### Requirement: Alta de clientes con preventDefault

El envío de `#form-alta-cliente` SHALL interceptarse con `preventDefault()` y solo registrará el cliente si el nombre completo y el email no están vacíos, si el email tiene formato válido y si no existe otro cliente con el mismo email comparado sin espacios exteriores y sin distinguir mayúsculas de minúsculas.

#### Scenario: Nombre vacío rechazado

- **WHEN** se envía el formulario con el nombre completo vacío o compuesto solo por espacios
- **THEN** el alta se rechaza, no se agrega el cliente y `#clientes-feedback` muestra un mensaje `Error —` que explica el motivo

#### Scenario: Email vacío o inválido rechazado

- **WHEN** se envía el formulario con email vacío o con un formato inválido
- **THEN** el alta se rechaza, no se agrega el cliente y `#clientes-feedback` muestra un mensaje `Error —` que explica el motivo

#### Scenario: Email duplicado rechazado

- **WHEN** se envía un email que coincide con el de un cliente existente tras quitar espacios exteriores e ignorar mayúsculas y minúsculas
- **THEN** el alta se rechaza, no se agrega el cliente y `#clientes-feedback` muestra un mensaje `Error —` que explica el motivo

#### Scenario: Alta válida aceptada

- **WHEN** se envía un nombre completo no vacío y un email válido que no está registrado
- **THEN** el cliente se agrega al modelo de datos y `#clientes-feedback` muestra un mensaje `OK —` que informa el registro correcto

### Requirement: Actualización en vivo tras registrar un cliente

Tras un alta correcta, el sistema SHALL actualizar sin recargar la página la tabla `#tabla-clientes` y las opciones de `#venta-cliente`, y SHALL limpiar los campos del formulario de clientes.

#### Scenario: Listado actualizado

- **WHEN** se registra un cliente válido
- **THEN** el cliente aparece en `#tabla-clientes` junto a los existentes

#### Scenario: Selector de venta actualizado

- **WHEN** se registra un cliente válido
- **THEN** `#venta-cliente` incluye una opción nueva con el nombre y el email del cliente registrado

#### Scenario: Formulario reutilizable

- **WHEN** se completa un alta correcta de cliente
- **THEN** los campos del formulario quedan limpios para un nuevo registro

## MODIFIED Requirements

### Requirement: Listado de clientes registrados con estado vacío

La vista SHALL incluir un listado de los clientes registrados, con encabezados si se presenta como tabla (dentro de `.tabla-contenedor`), y un contenedor semántico para el mensaje de lista vacía. La tabla `#tabla-clientes` SHALL renderizarse dinámicamente desde el modelo de datos mostrando nombre completo y email; cuando no haya clientes SHALL mostrar `#clientes-listado-vacio` y ocultar la tabla.

#### Scenario: Listado con encabezados

- **WHEN** se inspecciona el listado de clientes
- **THEN** cada columna tiene su `th` dentro de un `.tabla-contenedor`

#### Scenario: Estado vacío previsto

- **WHEN** se revisa la vista de clientes
- **THEN** existe el contenedor para el mensaje de lista vacía

#### Scenario: Listado dinámico

- **WHEN** hay clientes en el modelo de datos
- **THEN** `#tabla-clientes` muestra una fila por cliente con nombre completo y email

#### Scenario: Listado vacío

- **WHEN** no hay clientes en el modelo de datos
- **THEN** `#clientes-listado-vacio` es visible y la tabla no muestra filas de datos

#### Scenario: Inserción segura de datos de usuario

- **WHEN** un cliente contiene caracteres especiales de HTML en su nombre o email
- **THEN** el dato se inserta como texto visible y no se interpreta como marcado HTML

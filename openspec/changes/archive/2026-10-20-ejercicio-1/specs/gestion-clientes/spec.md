# Spec Delta

## Purpose

Define la vista de clientes: el formulario de alta `#form-alta-cliente` con nombre completo y email, y el listado de clientes registrados con su estado vacío.

## ADDED Requirements

### Requirement: Formulario de alta de clientes
La vista `#vista-clientes` SHALL incluir un formulario con id `#form-alta-cliente` compuesto por un único campo de "Nombre completo" (sin campo de apellido separado) y un campo de "Email".

#### Scenario: Dos campos, sin apellido separado
- **WHEN** se inspecciona el formulario de clientes
- **THEN** tiene exactamente los campos de nombre completo y email, y no hay campo de apellido

### Requirement: Controles asociados a etiquetas y email con tipo adecuado
Cada control del formulario de clientes SHALL tener su `<label for="...">` asociada por id; el campo de email SHALL ser de tipo `email` y el formulario tendrá ids estables para su uso futuro con JavaScript.

#### Scenario: Etiqueta de nombre completo
- **WHEN** se activa la etiqueta del campo de nombre
- **THEN** el foco llega al control de nombre completo

#### Scenario: Campo de email
- **WHEN** se inspecciona el campo de email
- **THEN** es un control de tipo `email` con etiqueta asociada

### Requirement: Acción descriptiva y feedback de validación
El formulario SHALL tener un botón de envío con texto que describa la acción (por ejemplo, "Registrar cliente") y un contenedor semántico previsto para mostrar el resultado de la operación (correcta o rechazada) cerca del formulario.

#### Scenario: Zona de feedback
- **WHEN** se revisa el formulario de clientes
- **THEN** existe un contenedor identificable para mensajes de éxito o error

### Requirement: Listado de clientes registrados con estado vacío
La vista SHALL incluir un listado de los clientes registrados, con encabezados si se presenta como tabla (dentro de `.tabla-contenedor`), y un contenedor semántico para el mensaje de lista vacía.

#### Scenario: Listado con encabezados
- **WHEN** se inspecciona el listado de clientes
- **THEN** cada columna tiene su `th` dentro de un `.tabla-contenedor`

#### Scenario: Estado vacío previsto
- **WHEN** se revisa la vista de clientes
- **THEN** existe el contenedor para el mensaje de lista vacía

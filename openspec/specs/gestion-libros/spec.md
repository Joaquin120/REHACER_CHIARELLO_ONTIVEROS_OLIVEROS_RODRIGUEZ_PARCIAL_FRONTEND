# gestion-libros Specification

## Purpose

Define la vista de libros: el formulario de alta `#form-alta-libro` con todos sus campos y controles asociados, y el listado de libros registrados con su estado vacío.

## Requirements

### Requirement: Formulario de alta de libros
La vista `#vista-libros` SHALL incluir un formulario con id `#form-alta-libro` que contiene: campo de título, campo de ISBN, campo numérico de precio, selector de editorial, selector de género y selector múltiple de autores.

#### Scenario: Formulario presente
- **WHEN** se revisa la vista de libros
- **THEN** existe el formulario con id `form-alta-libro` y contiene los 6 campos indicados

#### Scenario: Precio numérico
- **WHEN** se inspecciona el campo de precio
- **THEN** es un control de entrada numérico (tipo `number`)

### Requirement: Opción «Sin clasificar» en el selector de género
El selector de género SHALL incluir la opción «Sin clasificar» y ésta SHALL ser la opción por defecto seleccionada, representando la ausencia de género.

#### Scenario: Valor por defecto
- **WHEN** se carga (o se resetea) el formulario de libros
- **THEN** el selector de género tiene seleccionada la opción «Sin clasificar»

### Requirement: Controles asociados a etiquetas
Todos los controles del formulario de libros SHALL tener una etiqueta `<label for="...">` correctamente asociada por id, y los selectores múltiples y campos SHALL tener ids estables para que JavaScript pueda leerlos e interactuar con ellos.

#### Scenario: Etiquetas asociadas
- **WHEN** se activa (clic o tabulador) cada etiqueta del formulario
- **THEN** el foco llega al control asociado

### Requirement: Acción descriptiva y feedback de validación
El formulario SHALL tener un botón de envío con texto que describa la acción (por ejemplo, "Registrar libro") y un contenedor semántico previsto para mostrar el resultado de la operación (correcta o rechazada) cerca del formulario.

#### Scenario: Botón descriptivo
- **WHEN** se lee el botón de envío
- **THEN** su texto describe la acción de registrar el libro

#### Scenario: Zona de feedback
- **WHEN** se revisa el formulario
- **THEN** existe un contenedor identificable para mensajes de éxito o error junto al formulario

### Requirement: Listado de libros registrados con estado vacío
La vista SHALL incluir un listado de los libros registrados, con encabezados si se presenta como tabla (dentro de `.tabla-contenedor`), y un contenedor semántico para el mensaje de lista vacía.

#### Scenario: Listado con encabezados
- **WHEN** se inspecciona el listado de libros
- **THEN** cada columna tiene su `th` y la tabla está dentro de un `.tabla-contenedor`

#### Scenario: Estado vacío previsto
- **WHEN** no hay libros registrados (futuro estado)
- **THEN** el HTML contiene el contenedor donde se mostrará el mensaje de lista vacía

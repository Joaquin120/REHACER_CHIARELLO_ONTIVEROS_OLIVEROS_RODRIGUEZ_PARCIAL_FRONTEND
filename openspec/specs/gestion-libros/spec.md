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
La vista SHALL incluir un listado de los libros registrados, con encabezados si se presenta como tabla (dentro de `.tabla-contenedor`), y un contenedor semántico para el mensaje de lista vacía. La tabla de libros registrados (`#tabla-libros`) SHALL renderizarse dinámicamente desde el modelo de datos mostrando título, ISBN, editorial, género («Sin clasificar» si no tiene), autores y precio; y SHALL mostrar `#libros-listado-vacio` cuando no hay libros registrados, ocultando la tabla.

#### Scenario: Listado con encabezados
- **WHEN** se inspecciona el listado de libros
- **THEN** cada columna tiene su `th` y la tabla está dentro de un `.tabla-contenedor`

#### Scenario: Estado vacío previsto
- **WHEN** no hay libros registrados (futuro estado)
- **THEN** el HTML contiene el contenedor donde se mostrará el mensaje de lista vacía

#### Scenario: Listado dinámico
- **WHEN** hay libros en el modelo de datos
- **THEN** `#tabla-libros` muestra una fila por libro con los 6 campos (título, ISBN, editorial, género, autores y precio)

#### Scenario: Listado vacío
- **WHEN** no hay libros en el modelo de datos
- **THEN** `#libros-listado-vacio` es visible y la tabla no muestra filas de datos

### Requirement: Opciones de selectores cargadas desde los datos locales
Las opciones de los selectores de editorial (`#libro-editorial`), género (`#libro-genero`) y autores (`#libro-autores`, selector múltiple) del formulario `#form-alta-libro` SHALL generarse dinámicamente a partir del modelo de datos, reemplazando las opciones estáticas de la maqueta. El selector de género SHALL incluir «Sin clasificar» como opción por defecto seleccionada (valor que representa la ausencia de género).

#### Scenario: Selectores poblados al iniciar
- **WHEN** se carga la página
- **THEN** `#libro-editorial` lista las editoriales existentes, `#libro-genero` lista «Sin clasificar» más los géneros existentes y `#libro-autores` lista los autores existentes

#### Scenario: «Sin clasificar» por defecto
- **WHEN** se carga la página o se resetea el formulario
- **THEN** la opción seleccionada por defecto de `#libro-genero` es «Sin clasificar» y su valor representa ausencia de género

### Requirement: Validación del alta de libros con preventDefault
El envío de `#form-alta-libro` SHALL interceptarse con `preventDefault()` y solo registrará el libro si pasa todas las comprobaciones: título no vacío, ISBN no vacío, ISBN único comparado sin espacios ni guiones, precio numérico mayor que cero, editorial existente en los datos locales y al menos un autor existente seleccionado. El género puede quedar sin asignar; si se asigna, SHALL corresponder a un género existente.

#### Scenario: ISBN duplicado rechazado
- **WHEN** se envía un libro cuyo ISBN coincide con uno existente tras quitar espacios y guiones de ambos
- **THEN** el alta se rechaza, no se agrega el libro y `#libros-feedback` muestra un mensaje «Error —» que explica el motivo

#### Scenario: Precio inválido rechazado
- **WHEN** se envía un libro con precio vacío, no numérico, cero o negativo
- **THEN** el alta se rechaza y `#libros-feedback` muestra un mensaje «Error —» que explica el motivo

#### Scenario: Sin autores rechazado
- **WHEN** se envía un libro sin seleccionar ningún autor en `#libro-autores`
- **THEN** el alta se rechaza y `#libros-feedback` muestra un mensaje «Error —» que explica el motivo

#### Scenario: Editorial inexistente rechazada
- **WHEN** la editorial seleccionada no existe en el modelo de datos
- **THEN** el alta se rechaza y `#libros-feedback` muestra un mensaje «Error —» que explica el motivo

#### Scenario: Alta válida aceptada
- **WHEN** se envía un libro con título e ISBN no vacíos, ISBN no repetido, precio mayor que cero, editorial existente y al menos un autor existente
- **THEN** el libro se agrega al modelo de datos y `#libros-feedback` muestra un mensaje «OK —» que informa el registro correcto

### Requirement: Actualización en vivo tras registrar un libro
Tras un alta correcta, el sistema SHALL actualizar sin recargar la página el catálogo (`#tabla-catalogo`), la tabla de libros registrados (`#tabla-libros`) y las opciones relacionadas (entre ellas `#venta-libro`), y SHALL limpiar los campos del formulario manteniendo «Sin clasificar» como género por defecto.

#### Scenario: Catálogo y listado actualizados
- **WHEN** se registra un libro válido
- **THEN** el nuevo libro aparece en `#tabla-catalogo` y en `#tabla-libros` junto a los existentes

#### Scenario: Selector de ventas actualizado
- **WHEN** se registra un libro válido
- **THEN** `#venta-libro` incluye una opción nueva con el título y precio del libro registrado

#### Scenario: Formulario reutilizable
- **WHEN** se completa un alta correcta
- **THEN** los campos del formulario quedan limpios y `#libro-genero` vuelve a tener «Sin clasificar» seleccionado

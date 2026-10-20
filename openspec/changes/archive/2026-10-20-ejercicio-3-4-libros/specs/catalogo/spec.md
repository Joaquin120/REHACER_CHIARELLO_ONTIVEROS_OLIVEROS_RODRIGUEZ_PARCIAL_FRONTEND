# Spec Delta

## ADDED Requirements

### Requirement: Renderizado dinámico del listado del catálogo
JavaScript SHALL generar las filas del catálogo (`#tabla-catalogo`) a partir del modelo de datos de libros, reemplazando los datos de ejemplo estáticos de la maqueta. Cada fila SHALL mostrar título, ISBN, editorial, género, autores y precio, y SHALL mostrar «Sin clasificar» cuando el libro no tiene género asignado. Los datos escritos por usuarios se insertarán como texto en el DOM (no como HTML interpretado).

#### Scenario: Catálogo generado desde los datos
- **WHEN** se carga la página con el modelo de datos disponible
- **THEN** `#tabla-catalogo` muestra una fila por cada libro del modelo de datos con sus 6 campos visibles

#### Scenario: Libro sin género
- **WHEN** un libro del modelo de datos no tiene género asignado
- **THEN** la celda de género de su fila muestra el texto «Sin clasificar»

#### Scenario: Inserción segura de datos de usuario
- **WHEN** un libro contiene texto con caracteres especiales de HTML en su título u otros campos
- **THEN** se inserta como texto visible, sin interpretarse como marcado HTML

### Requirement: Filtro por título del catálogo
El formulario de búsqueda del catálogo SHALL filtrar el listado por coincidencia parcial del título, ignorando diferencias entre mayúsculas y minúsculas y eliminando espacios sobrantes de los extremos de la búsqueda. Una búsqueda vacía SHALL mostrar todo el catálogo.

#### Scenario: Coincidencia parcial sin distinguir mayúsculas
- **WHEN** se busca una parte del título con letras en mayúsculas de más
- **THEN** se listan los libros cuyo título contiene ese texto, sin distinguir mayúsculas de minúsculas

#### Scenario: Búsqueda con espacios sobrantes
- **WHEN** se busca un título rodeado o separado por espacios extra
- **THEN** los espacios de los extremos se ignoran y el filtro funciona como si se hubiera escrito el texto limpio

#### Scenario: Búsqueda vacía
- **WHEN** el campo de búsqueda está vacío (o contiene solo espacios)
- **THEN** se muestra el catálogo completo

### Requirement: Estados del catálogo al filtrar
Cuando el filtro aplicado no tiene coincidencias, el sistema SHALL mostrar el mensaje de `#catalogo-sin-resultados` y ocultar la tabla; cuando hay coincidencias, SHALL mostrar la tabla y ocultar ese mensaje. Cuando el modelo de datos no tiene libros, SHALL mostrar `#catalogo-listado-vacio`. Los mensajes se alternarán sin depender solo del color.

#### Scenario: Búsqueda sin coincidencias
- **WHEN** el texto buscado no coincide con ningún título
- **THEN** `#catalogo-sin-resultados` es visible y la tabla de catálogo no muestra filas de datos

#### Scenario: Búsqueda con coincidencias
- **WHEN** el texto buscado coincide con al menos un título
- **THEN** la tabla muestra solo los libros coincidentes y `#catalogo-sin-resultados` está oculto

#### Scenario: Catálogo vacío
- **WHEN** el modelo de datos de libros está vacío
- **THEN** se muestra `#catalogo-listado-vacio` y no se muestran filas en la tabla

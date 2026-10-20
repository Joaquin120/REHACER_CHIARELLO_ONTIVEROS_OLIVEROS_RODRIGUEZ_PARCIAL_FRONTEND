# catalogo Specification

## Purpose

Define la vista de catálogo de la librería: título del negocio, buscador por título y listado de libros con todos los campos que el ejercicio exige mostrar, más los estados de lista vacía y búsqueda sin resultados.

## Requirements

### Requirement: Vista de catálogo con buscador
La vista `#vista-catalogo` SHALL mostrar el título de la librería y un buscador por título compuesto por un campo de texto con `<label for>` asociado y un botón cuyo texto describa la acción (por ejemplo, "Buscar").

#### Scenario: Buscador etiquetado
- **WHEN** se inspecciona el campo de búsqueda del catálogo
- **THEN** existe un `<label for>` que asocia el campo y el botón de búsqueda tiene texto descriptivo

### Requirement: Listado de libros con todos los campos
El catálogo SHALL listar cada libro mostrando título, ISBN, editorial, género, autores y precio. Cuando un libro no tiene género asignado, se SHALL mostrar el texto «Sin clasificar».

#### Scenario: Libro sin género
- **WHEN** se muestra un libro sin género asignado
- **THEN** su campo de género indica «Sin clasificar»

#### Scenario: Campos completos
- **WHEN** se revisa una fila/tarjeta de libro
- **THEN** están visibles título, ISBN, editorial, género, autores y precio

### Requirement: Listado tabular con encabezados y contenedor
Si el listado del catálogo se presenta como tabla, la tabla SHALL tener `thead` con `<th>` por cada columna y SHALL estar envuelta en un elemento con clase `.tabla-contenedor` para que eventualmente se desplace dentro de su propio contenedor sin provocar desplazamiento horizontal de la página.

#### Scenario: Tabla semántica
- **WHEN** se inspecciona la tabla del catálogo
- **THEN** tiene encabezado (`thead`/`th`) dentro de un `.tabla-contenedor`

### Requirement: Estados de catálogo vacío y búsqueda sin resultados
La vista SHALL prever contenedores semánticos para mostrar (a) un mensaje cuando el listado está vacío y (b) un mensaje cuando una búsqueda no tiene coincidencias; en la etapa inicial pueden estar ocultos o con datos de ejemplo, pero sus elementos SHALL existir en el HTML para que JavaScript los use después.

#### Scenario: Estado de lista vacía
- **WHEN** se revisa la vista de catálogo
- **THEN** existe un contenedor identificable para el mensaje de listado vacío

#### Scenario: Estado de búsqueda sin resultados
- **WHEN** se revisa la vista de catálogo
- **THEN** existe un contenedor identificable para el mensaje de búsqueda sin coincidencias

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

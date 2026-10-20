# Spec Delta

## Purpose

Define la vista de catálogo de la librería: título del negocio, buscador por título y listado de libros con todos los campos que el ejercicio exige mostrar, más los estados de lista vacía y búsqueda sin resultados.

## ADDED Requirements

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

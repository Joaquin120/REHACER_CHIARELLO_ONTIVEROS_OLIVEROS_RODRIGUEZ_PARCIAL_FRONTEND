# Spec Delta

## Purpose

Define el modelo de datos inicial del frontend: colecciones de libros, editoriales, géneros, autores y clientes representadas en el navegador con identificadores estables y datos ficticios, sobre las cuales se construyen el catálogo, los formularios y las ventas.

## ADDED Requirements

### Requirement: Colecciones del modelo de datos inicial
El sistema SHALL mantener colecciones de datos para libros, editoriales, géneros, autores y clientes, con al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios disponibles al iniciar la aplicación.

#### Scenario: Mínimos de la consigna cumplidos
- **WHEN** se inicia la aplicación sin datos previos
- **THEN** existen al menos 6 libros, 2 editoriales, 2 géneros, 3 autores y 3 clientes ficticios en el modelo de datos

#### Scenario: Datos ficticios sin conexión
- **WHEN** se carga la aplicación con doble clic en `index.html` (file://)
- **THEN** el modelo de datos está disponible localmente, sin fetch, API ni servidor

### Requirement: Identificadores estables por entidad
Cada entidad del modelo de datos (libro, editorial, género, autor y cliente) SHALL tener un identificador único y estable dentro de su colección, y las relaciones entre entidades SHALL referenciar dichos identificadores.

#### Scenario: IDs únicos por colección
- **WHEN** se comparan los identificadores de dos entidades de la misma colección
- **THEN** son distintos

#### Scenario: Relaciones por identificador
- **WHEN** se revisa la relación de un libro con su editorial, su género opcional y sus autores
- **THEN** se resuelven mediante los identificadores de las entidades correspondientes

### Requirement: Integridad referencial de los libros de ejemplo
Cada libro inicial SHALL referenciar una editorial existente y uno o más autores existentes; el género SHALL ser opcional y, cuando se asigna, SHALL corresponder a un género existente.

#### Scenario: Libro con y sin género
- **WHEN** se revisan los libros del conjunto inicial
- **THEN** al menos un libro tiene género asignado existente y al menos un libro no tiene género (para cubrir «Sin clasificar»)

#### Scenario: Referencias válidas
- **WHEN** se resuelven las relaciones de cada libro inicial
- **THEN** la editorial y todos los autores referenciados existen en sus colecciones

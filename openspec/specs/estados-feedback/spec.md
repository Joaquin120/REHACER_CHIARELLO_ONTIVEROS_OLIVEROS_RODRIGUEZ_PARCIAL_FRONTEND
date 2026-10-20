# estados-feedback Specification

## Purpose

Define los estados de interfaz reutilizables que la maqueta debe prever para que el JavaScript posterior los active: mensajes de operaciones correctas y rechazadas junto a cada zona de acción, y mensajes de listas vacías y búsquedas sin resultados.

## Requirements

### Requirement: Contenedores de resultado de operación
El HTML SHALL incluir, cerca de cada formulario o zona de acción (libros, clientes, ventas), un contenedor semántico e identificable para mostrar el resultado de una operación, diferenciando el caso correcto del caso rechazado sin depender únicamente del color para comunicar el estado.

#### Scenario: Contenedores por zona
- **WHEN** se revisan los formularios de libros, clientes y ventas
- **THEN** cada uno tiene un contenedor identificable para mensajes de éxito y/o error

#### Scenario: Estado sin depender del color
- **WHEN** se definen los mensajes de resultado
- **THEN** el estado se comunica también mediante texto (por ejemplo, prefijo o palabra "Error"/"OK"), no solo mediante color

### Requirement: Estados de listas vacías y búsquedas sin resultados
Cada zona que muestra listas (catálogo, libros, clientes, historial) SHALL prever un contenedor semántico para el mensaje de lista vacía, y el catálogo SHALL prever además el contenedor para el mensaje de búsqueda sin coincidencias. En la etapa inicial estos mensajes pueden estar ocultos, pero sus elementos SHALL existir en el HTML.

#### Scenario: Estado vacío por lista
- **WHEN** se revisan las vistas con listados
- **THEN** existe al menos un contenedor identificable por cada lista para su mensaje de estado vacío

#### Scenario: Búsqueda sin resultados
- **WHEN** se revisa la vista de catálogo
- **THEN** existe el contenedor destinado al mensaje de búsqueda sin coincidencias

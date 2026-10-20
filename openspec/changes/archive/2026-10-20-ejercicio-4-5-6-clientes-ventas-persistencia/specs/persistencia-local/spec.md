# Spec Delta

## Purpose

Conserva en el navegador los libros, clientes y ventas del sistema mediante `localStorage`, de modo que las altas y ventas confirmadas sobrevivan a la recarga de la página sin duplicar los datos de ejemplo.

## ADDED Requirements

### Requirement: Carga inicial de ejemplos

En el primer inicio, cuando no existan datos persistidos, el sistema SHALL inicializar el modelo con los libros, editoriales, géneros, autores y clientes de ejemplo y SHALL persistirlos antes de operar.

#### Scenario: Primer inicio sin datos guardados

- **WHEN** se abre la aplicación en un navegador sin datos previos del proyecto
- **THEN** el sistema muestra los libros y clientes de ejemplo y guarda ese conjunto inicial

#### Scenario: Recarga sin duplicar ejemplos

- **WHEN** se recarga la página después del primer inicio sin haber realizado altas
- **THEN** se recuperan los mismos registros guardados y no se agregan copias de los ejemplos

### Requirement: Recuperación de datos persistidos

Al iniciar, si existen datos guardados, el sistema SHALL cargar libros, clientes y ventas desde `localStorage` en lugar de reiniciar el conjunto de ejemplos, conservando los identificadores y las relaciones entre entidades.

#### Scenario: Altas conservadas tras recargar

- **WHEN** se registra un libro o un cliente y luego se recarga la página
- **THEN** el registro continúa visible en su listado y en los selectores relacionados

#### Scenario: Ventas conservadas tras recargar

- **WHEN** se confirma una venta y luego se recarga la página
- **THEN** la venta continúa visible en el historial con su detalle histórico

### Requirement: Guardado tras operaciones confirmadas

El sistema SHALL persistir el estado completo después de cada alta válida de libro o cliente y después de cada venta confirmada, de forma que una recarga inmediatamente posterior refleje la operación.

#### Scenario: Persistencia del alta de cliente

- **WHEN** se registra un cliente válido
- **THEN** el cliente queda guardado y se recupera al recargar la página

#### Scenario: Persistencia de la venta

- **WHEN** se confirma una venta válida
- **THEN** la venta y sus renglones quedan guardados y se recuperan al recargar la página

### Requirement: Recuperación ante datos inválidos

Si el contenido guardado no puede interpretarse como un modelo válido, el sistema SHALL descartarlo y volver al conjunto de ejemplos sin interrumpir la aplicación.

#### Scenario: Datos corruptos

- **WHEN** la clave de almacenamiento contiene texto que no representa un modelo válido
- **THEN** la aplicación inicia con los ejemplos y vuelve a guardar un estado válido

### Requirement: Aislamiento del almacenamiento

La persistencia SHALL quedar limitada al navegador, perfil y ubicación desde la que se abre el proyecto, sin compartir datos entre usuarios ni entre distintas ubicaciones de apertura.

#### Scenario: Otro navegador o perfil

- **WHEN** se abre el proyecto en otro navegador, otro perfil o desde otra ubicación
- **THEN** no se recuperan los datos guardados en el navegador o perfil anterior

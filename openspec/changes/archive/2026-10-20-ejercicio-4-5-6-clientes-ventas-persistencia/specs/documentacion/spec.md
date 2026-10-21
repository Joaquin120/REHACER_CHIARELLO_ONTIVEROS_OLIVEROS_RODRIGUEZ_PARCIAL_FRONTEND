# Spec Delta

## ADDED Requirements

### Requirement: Documentación del almacenamiento local

El `README.md` SHALL explicar que libros, clientes y ventas se conservan en `localStorage` del navegador y que ese almacenamiento depende del navegador, del perfil y de la ubicación desde la que se abre el proyecto, sin compartir información entre usuarios.

#### Scenario: Alcance del almacenamiento

- **WHEN** se lee la sección de persistencia del README
- **THEN** se indica que los datos se guardan en el navegador y no en un servidor

#### Scenario: Dependencia de navegador, perfil y ubicación

- **WHEN** se lee la sección de persistencia del README
- **THEN** se advierte que otra persona, otro perfil u otra ubicación de apertura no verá los datos guardados

## MODIFIED Requirements

### Requirement: Arquitectura de IDs y estado de maqueta

El README SHALL describir la arquitectura de vistas e IDs del HTML (las 5 vistas ancladas dentro de `<main id="contenido-principal">` y los IDs principales de formularios, tablas y controles) y SHALL indicar el estado de la interfaz: qué partes son maqueta estática y qué partes serán dinámicas con JavaScript en los ejercicios siguientes. En la versión final, SHALL indicar que catálogo, libros, clientes, ventas, historial y persistencia son funcionales con JavaScript nativo.

#### Scenario: IDs documentados

- **WHEN** se lee la sección de arquitectura del README
- **THEN** figuran las 5 vistas con sus anclas y los IDs clave del HTML

#### Scenario: Estado maqueta vs. dinámico

- **WHEN** se lee el README
- **THEN** se distingue claramente qué elementos son estáticos en esta etapa y qué comportamientos se agregarán después

#### Scenario: Estado final documentado

- **WHEN** se lee el README de la versión final
- **THEN** se informa que las cinco vistas y la persistencia funcionan con JavaScript nativo, sin partes pendientes de ejercicios posteriores

### Requirement: Casos de prueba manuales

El README SHALL incluir una tabla con los 8 casos de prueba manuales de la cátedra (definidos en `openspec/consignas.md`), cada uno con su descripción y su resultado esperado. Adicionalmente, SHALL indicar cuáles casos pueden ejecutarse en la versión entregada.

#### Scenario: Tabla de 8 casos

- **WHEN** se revisa el README
- **THEN** existe una tabla con exactamente los 8 casos manuales de la consigna, con acción y resultado esperado

#### Scenario: Casos ejecutables

- **WHEN** se revisa la guía de casos manuales del README final
- **THEN** se indica que los 8 casos son ejecutables con los datos y las operaciones implementadas

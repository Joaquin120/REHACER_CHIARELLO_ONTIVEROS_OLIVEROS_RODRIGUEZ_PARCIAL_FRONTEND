# Spec Delta

## Purpose

Define el README inicial del proyecto TPI: cómo abrirlo sin servidor ni dependencias, la arquitectura de IDs del HTML que usan los ejercicios siguientes y la tabla de los 8 casos de prueba manuales de la cátedra.

## ADDED Requirements

### Requirement: Instrucciones de apertura sin dependencias
El `README.md` SHALL explicar cómo abrir el proyecto: carpeta con `index.html`, `css/` y `js/`, sin npm, frameworks ni CDNs, abriendo `index.html` directamente en el navegador (doble clic / file://), sin servidor.

#### Scenario: Apertura documentada
- **WHEN** se lee el README
- **THEN** están explicitados los pasos para abrir el proyecto sin servidor ni instalación de dependencias

### Requirement: Arquitectura de IDs y estado de maqueta
El README SHALL describir la arquitectura de vistas e IDs del HTML (las 5 vistas ancladas dentro de `<main id="contenido-principal">` y los IDs principales de formularios, tablas y controles) y SHALL indicar el estado de la interfaz: qué partes son maqueta estática y qué partes serán dinámicas con JavaScript en los ejercicios siguientes.

#### Scenario: IDs documentados
- **WHEN** se lee la sección de arquitectura del README
- **THEN** figuran las 5 vistas con sus anclas y los IDs clave del HTML

#### Scenario: Estado maqueta vs. dinámico
- **WHEN** se lee el README
- **THEN** se distingue claramente qué elementos son estáticos en esta etapa y qué comportamientos se agregarán después

### Requirement: Casos de prueba manuales
El README SHALL incluir una tabla con los 8 casos de prueba manuales de la cátedra (definidos en `openspec/consignas.md`), cada uno con su descripción y su resultado esperado.

#### Scenario: Tabla de 8 casos
- **WHEN** se revisa el README
- **THEN** existe una tabla con exactamente los 8 casos manuales de la consigna, con acción y resultado esperado

### Requirement: Identificación del equipo
El README SHALL identificar a los integrantes del equipo y la materia/entrega correspondiente (UTN — Programación III, TPI Frontend de una librería).

#### Scenario: Integrantes
- **WHEN** se abre el README
- **THEN** aparecen los integrantes y el contexto de la entrega

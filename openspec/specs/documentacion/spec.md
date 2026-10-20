# documentacion Specification

## Purpose

Define el README inicial del proyecto TPI: cómo abrirlo sin servidor ni dependencias, la arquitectura de IDs del HTML que usan los ejercicios siguientes y la tabla de los 8 casos de prueba manuales de la cátedra.

## Requirements

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

### Requirement: Registro de la etapa y del alcance del Ejercicio 2
El `README.md` SHALL indicar la etapa actual del proyecto (Ejercicio 2 — presentación con CSS y uso adaptable), describir el alcance de estilos completado y distinguir los estilos ya implementados de los comportamientos dinámicos pendientes de los Ejercicios 3–6.

#### Scenario: Etapa actualizada
- **WHEN** se lee el README
- **THEN** figura el Ejercicio 2 como etapa actual y el alcance de presentación completado

#### Scenario: Estado de estilos
- **WHEN** se revisa la tabla de estado de maqueta vs. dinámico
- **THEN** los estilos figuran como implementados con CSS propio y los comportamientos JavaScript siguen marcados como pendientes

### Requirement: Verificación registrada del caso manual 8
El README SHALL registrar la verificación del caso manual 8 de la cátedra («Navegación por teclado y anchos de 320 px y 1280 px»), indicando el resultado observado sobre la navegación con foco visible, la usabilidad de los controles y el desplazamiento propio de las tablas.

#### Scenario: Caso 8 documentado
- **WHEN** se revisa la tabla de casos manuales del README
- **THEN** el caso 8 incluye la verificación realizada y su resultado observado en 320 px y 1280 px con navegación por teclado

#### Scenario: Resultado coherente con la consigna
- **WHEN** se contrasta el registro del README con `openspec/consignas.md`
- **THEN** el resultado describe foco visible, controles utilizables y tablas con desplazamiento dentro de su contenedor

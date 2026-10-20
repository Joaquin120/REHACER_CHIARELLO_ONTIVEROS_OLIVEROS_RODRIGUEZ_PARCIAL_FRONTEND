## ADDED Requirements

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

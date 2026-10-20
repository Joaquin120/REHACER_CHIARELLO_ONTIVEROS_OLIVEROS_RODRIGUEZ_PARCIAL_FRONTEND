# app-shell Specification

## Purpose

Define la arquitectura de página única del frontend de la librería: entrada `index.html`, encabezado y navegación accesibles, y las 5 vistas del sistema alojadas como secciones ancladas dentro de un único `<main id="contenido-principal">`.

## Requirements

### Requirement: Entrada única con página semántica
El proyecto SHALL entregarse con `index.html` como entrada única, que se abre directamente en el navegador (file://) sin servidor ni build, y SHALL usar las etiquetas semánticas de HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) para estructurar el documento.

#### Scenario: Apertura directa
- **WHEN** se abre `index.html` con doble clic en el navegador
- **THEN** se muestra la aplicación completa sin necesidad de servidor, npm, frameworks ni CDNs

#### Scenario: Estructura semántica
- **WHEN** se inspecciona el árbol del documento
- **THEN** el encabezado está en `<header>`, la navegación en `<nav>`, el contenido en `<main>` y el pie en `<footer>`

### Requirement: Único contenido principal con las 5 vistas
El documento SHALL tener exactamente un `<main id="contenido-principal">` que contiene, como secciones identificadas, las 5 vistas: catálogo, libros, clientes, ventas e historial. Cada vista SHALL tener un id estable: `vista-catalogo`, `vista-libros`, `vista-clientes`, `vista-ventas` y `vista-historial`.

#### Scenario: Un solo main
- **WHEN** se busca el elemento `<main>` en el documento
- **THEN** existe exactamente uno y su id es `contenido-principal`

#### Scenario: Las 5 secciones presentes
- **WHEN** se recorren los hijos de `<main>`
- **THEN** existen las 5 secciones con ids `vista-catalogo`, `vista-libros`, `vista-clientes`, `vista-ventas` y `vista-historial`, en ese orden

### Requirement: Navegación por anclas entre vistas
El `<nav>` SHALL enlazar las 5 vistas mediante anclas (`href="#vista-..."`) para que cada enlace lleve visiblemente a su sección dentro de la página.

#### Scenario: Salto a una vista
- **WHEN** se activa el enlace "Ventas" en la navegación
- **THEN** el navegador desplaza la vista hasta la sección con id `vista-ventas`

#### Scenario: Navegación completa
- **WHEN** se revisa la navegación
- **THEN** hay un enlace por cada una de las 5 vistas, cada uno apuntando al id de su sección

### Requirement: Encabezado accesible con un solo título principal
La página SHALL tener exactamente un `<h1>` (el nombre de la librería, en el encabezado) y cada vista SHALL usar jerarquía de encabezados coherente (`<h2>` como título de vista). La navegación SHALL ser accesible, identificando la vista actual con `aria-current` cuando corresponda y sin depender del color para comunicar estado.

#### Scenario: Un solo h1
- **WHEN** se cuentan los elementos `<h1>` del documento
- **THEN** hay exactamente uno y contiene el nombre de la librería

#### Scenario: Navegación identificable
- **WHEN** se navega con teclado o lector de pantalla
- **THEN** la navegación está etiquetada como `<nav>` con un nombre accesible y los enlaces son alcanzables y activables con teclado

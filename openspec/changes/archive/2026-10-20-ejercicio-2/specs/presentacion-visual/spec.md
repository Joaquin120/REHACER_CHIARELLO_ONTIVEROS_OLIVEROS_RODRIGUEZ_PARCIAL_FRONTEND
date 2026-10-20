## Purpose

Define la capa de presentación del frontend de la librería con CSS3 nativo: identidad visual coherente mediante variables, estilos reutilizables de componentes, maquetación Mobile First con Flexbox y Grid, adaptación sin scroll horizontal de página y accesibilidad básica de foco y estados.

## ADDED Requirements

### Requirement: Hoja de estilos externa sin dependencias

La presentación SHALL implementarse en `css/estilos.css`, enlazada desde el `<head>` de `index.html`, usando únicamente CSS3 nativo. No SHALL incluir frameworks, Tailwind, Bootstrap, CDNs, Google Fonts ni recursos remotos, y SHALL funcionar al abrir `index.html` mediante el protocolo `file://` sin servidor.

#### Scenario: Apertura directa con estilos

- **WHEN** se abre `index.html` con doble clic en el navegador
- **THEN** la página se muestra con la identidad visual aplicada, sin solicitudes a recursos externos

#### Scenario: Sin dependencias de estilo

- **WHEN** se inspecciona el CSS y el `<head>` del documento
- **THEN** solo existe `css/estilos.css` como hoja de estilos y no hay enlaces a frameworks, CDNs ni fuentes externas

### Requirement: Identidad visual con variables CSS

La hoja SHALL declarar en `:root` variables CSS para la identidad visual: paleta de colores con contraste legible, tipografía del sistema, espaciados, bordes, radios y sombras. Los componentes SHALL reutilizar esas variables en lugar de duplicar valores.

#### Scenario: Variables centralizadas

- **WHEN** se revisa `css/estilos.css`
- **THEN** existe un bloque `:root` con las variables de color, tipografía, espaciado, bordes y sombras usadas por el resto de la hoja

#### Scenario: Contraste legible

- **WHEN** se observan textos y controles sobre sus fondos
- **THEN** la combinación de colores mantiene un contraste suficiente para leer contenido y distinguir controles

### Requirement: Estilos coherentes de componentes reutilizables

La hoja SHALL definir estilos para los componentes equivalentes de la interfaz: secciones o tarjetas, formularios (`fieldset`, `legend`, `label`, campos y botones), tablas, mensajes de estado y pie. Elementos con la misma función SHALL compartir clases y apariencia.

#### Scenario: Formularios consistentes

- **WHEN** se recorren los formularios de libros, clientes y ventas
- **THEN** etiquetas, campos, selectores y botones comparten la misma presentación y espaciado

#### Scenario: Componentes equivalentes

- **WHEN** se comparan tablas, tarjetas de vista y botones de la misma función
- **THEN** su apariencia es coherente porque reutilizan las mismas clases y variables

### Requirement: Maquetación con Flexbox y Grid Mobile First

La disposición del contenido SHALL construirse con Flexbox y CSS Grid en enfoque Mobile First. La navegación, los formularios, las tablas y el pie SHALL reorganizarse de forma legible en pantallas angostas y amplias.

#### Scenario: Vista angosta

- **WHEN** la página se muestra a 320 px de ancho
- **THEN** navegación, formularios y contenido se apilan y siguen siendo legibles y utilizables

#### Scenario: Vista amplia

- **WHEN** la página se muestra a 1280 px de ancho
- **THEN** el contenido aprovecha el ancho disponible con una distribución organizada por Flexbox y Grid

### Requirement: Adaptación sin scroll horizontal de página

La página SHALL evitar el desplazamiento horizontal de `html`/`body` tanto a 320 px como a 1280 px. Cuando una tabla requiera más ancho, SHALL desplazarse únicamente dentro de su contenedor `.tabla-contenedor` mediante `overflow-x: auto`.

#### Scenario: Sin scroll horizontal

- **WHEN** se comprueba la página a 320 px y a 1280 px
- **THEN** no aparece desplazamiento horizontal del documento completo

#### Scenario: Tabla con desplazamiento propio

- **WHEN** una tabla es más ancha que su contenedor en pantalla angosta
- **THEN** el desplazamiento horizontal ocurre solo dentro de `.tabla-contenedor` y la página permanece fija

### Requirement: Foco visible para navegación por teclado

Todos los enlaces, campos, selectores y botones SHALL mostrar un foco visible de alto contraste mediante `:focus-visible` con `outline`, sin eliminar el indicador de foco. La interfaz SHALL poder recorrerse y operarse con teclado.

#### Scenario: Foco en cada control

- **WHEN** se recorre la página con la tecla Tab
- **THEN** cada enlace, campo, selector y botón muestra un indicador de foco claramente visible

#### Scenario: Foco no suprimido

- **WHEN** se revisan los estilos de foco
- **THEN** ningún control oculta el `outline` sin ofrecer un indicador alternativo de alto contraste

### Requirement: Mensajes de estado no dependientes solo del color

Los mensajes de error, éxito y listas vacías SHALL diferenciarse por algo más que el color, combinando bordes, prefijos textuales o íconos definidos en CSS. Los elementos con atributo `[hidden]` SHALL permanecer ocultos aunque tengan estilos de mensaje.

#### Scenario: Error y éxito distinguibles

- **WHEN** se muestran mensajes de operación correcta y de operación rechazada
- **THEN** cada estado se reconoce por texto, borde o ícono además del color

#### Scenario: Estado oculto respetado

- **WHEN** un mensaje tiene el atributo `hidden`
- **THEN** no se muestra en pantalla pese a tener estilos de mensaje

### Requirement: Preservación del contrato HTML

La implementación de estilos SHALL conservar la estructura, los IDs y las clases existentes en `index.html` (incluidos `.tabla-contenedor`, las 5 vistas `#vista-*`, los formularios y los contenedores de estado), limitándose a verificar que `css/estilos.css` siga enlazado en el `<head>`.

#### Scenario: Contrato intacto

- **WHEN** se compara `index.html` con la versión del Ejercicio 1
- **THEN** los IDs, clases y contenedores usados por JavaScript no cambian y la hoja de estilos sigue enlazada

## Why

El Ejercicio 1 dejó la maqueta HTML completa, pero `css/estilos.css` es solo un placeholder: no hay identidad visual, maquetación adaptable ni foco visible, por lo que el Ejercicio 2 (20 pts) está sin resolver y el caso manual 8 de la cátedra no puede verificarse. Definir ahora la presentación con CSS3 nativo permite comprobar la interfaz en 320 px y 1280 px y deja la base visual que usarán los Ejercicios 3–6 sin tocar el contrato de IDs ni clases del HTML.

## What Changes

- Se reemplaza el placeholder de `css/estilos.css` por una hoja de estilos completa en CSS3 nativo, sin frameworks, Tailwind, Bootstrap, CDNs ni Google Fonts, funcional por `file://`.
- Se definen variables CSS en `:root` (paleta con buen contraste, tipografía del sistema, espaciados, bordes, radios y sombras) como base de una identidad visual coherente.
- Se estilizan los componentes reutilizables: tarjetas/secciones, formularios (`fieldset`, `legend`, `label`, `input`, `select`, `button`), tablas, mensajes de estado y pie.
- Se maqueta con Flexbox y CSS Grid en enfoque Mobile First, con puntos de corte para 320 px y 1280 px.
- Se garantiza que `body`/`html` no provoquen scroll horizontal: las tablas anchas se desplazan solo dentro de `.tabla-contenedor` con `overflow-x: auto`.
- Se agrega foco visible de alto contraste con `:focus-visible` (`outline`) en enlaces, campos y botones.
- Se diferencian mensajes de error, éxito y listas vacías sin depender solo del color (bordes, prefijos textuales/íconos en CSS) y se respeta el atributo `[hidden]`.
- Se verifica que `css/estilos.css` siga enlazado en el `<head>` de `index.html`; no se modifican la estructura, los IDs ni las clases existentes (`.tabla-contenedor`, `#vista-*`, formularios y contenedores de estado).
- Se actualiza `README.md`: etapa actual, estado de estilos y registro de la verificación del caso manual 8 («Navegación por teclado y anchos de 320 px y 1280 px») junto al alcance completado del Ejercicio 2.

## Capabilities

### New Capabilities

- `presentacion-visual`: identidad visual y presentación adaptable con CSS3 nativo — variables en `:root`, estilos de componentes, maquetación Flexbox/Grid Mobile First, ausencia de scroll horizontal de página, desplazamiento contenido de tablas, foco visible y estados no dependientes solo del color.

### Modified Capabilities

- `documentacion`: el README incorpora la etapa del Ejercicio 2, el estado de los estilos y el registro de la verificación del caso manual 8 con su resultado observado.

## Impact

- **Archivos modificados**: `css/estilos.css` (contenido completo), `README.md` (secciones de etapa, estado de estilos, pruebas manuales y estructura).
- **Archivo verificado sin cambios**: `index.html` (solo se confirma el `<link rel="stylesheet" href="css/estilos.css">` y se preservan IDs, clases y contenedores).
- **Sin cambios**: `js/app.js`, `openspec/consignas.md`, specs principales.
- **Sin dependencias**: no se agregan frameworks, CDNs ni fuentes externas; la hoja funciona abriendo `index.html` por `file://`.
- **Compatibilidad**: los nombres de clases e IDs usados por los Ejercicios 3–6 se mantienen; los estilos nuevos no alteran el contrato público del HTML.

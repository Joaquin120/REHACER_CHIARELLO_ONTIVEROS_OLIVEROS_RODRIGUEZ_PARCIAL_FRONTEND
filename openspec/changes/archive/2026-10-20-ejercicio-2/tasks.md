## 1. Base de estilos y tokens

- [x] 1.1 Verificar que `index.html` mantenga `<link rel="stylesheet" href="css/estilos.css">` en el `<head>` y que no se hayan alterado IDs ni clases; confirmar con `git diff -- index.html` que no hay cambios
- [x] 1.2 Declarar en `:root` las variables de color, tipografía del sistema, espaciados, bordes, radios, sombras y ancho de contenido según `design.md` §1–§3; verificar que la hoja no tenga valores de color duplicados fuera de los tokens
- [x] 1.3 Aplicar reset base (`box-sizing`, márgenes, `min-width: 0` en hijos Flex/Grid, estilos de `html`/`body`) y regla `[hidden] { display: none !important; }`; verificar que los mensajes ocultos del HTML no se rendericen al abrir `index.html`

## 2. Layout adaptable con Flexbox y Grid

- [x] 2.1 Maquetar `body` como columna Flexbox, `.cabecera` con Flexbox responsive, `.navegacion ul` con `flex-wrap` y `main` como Grid de una columna centrada con `max-width`; verificar la estructura a 320 px sin desbordes
- [x] 2.2 Estilizar cada `section` como tarjeta con `scroll-margin-top` y definir los puntos de corte Mobile First (640/768/1024 px); verificar que a 1280 px el contenido se centre y aproveche el ancho
- [x] 2.3 Ajustar formularios (`fieldset` en Grid, `label`/`input`/`select`/botones a ancho completo en móvil) y `.resumen-venta`; verificar legibilidad y usabilidad de todos los controles a 320 px y 1280 px
- [x] 2.4 Confinar las tablas: `width: 100%`, `min-width` legible por tabla y `.tabla-contenedor { overflow-x: auto; max-width: 100%; }`; verificar a 320 px que solo se desplace el contenedor y que `html`/`body` no tengan scroll horizontal

## 3. Componentes y accesibilidad visual

- [x] 3.1 Estilizar tablas (encabezados, filas alternas, celdas, `tfoot`), enlaces de navegación (incluido `[aria-current]`) y `.pie`; verificar coherencia visual entre las 5 vistas
- [x] 3.2 Implementar foco visible global con `:focus-visible` (`outline` de alto contraste y `offset`) en enlaces, campos, selectores y botones, sin `outline: none`; verificar con Tab que cada control muestre foco claro
- [x] 3.3 Estilizar `.mensaje`, `.mensaje.exito`, `.mensaje.error` y `.listado-vacio` con borde, fondo y prefijo textual/ícono, sin depender solo del color; verificar que el estado se distinga en escala de grises y que `[hidden]` siga ocultando
- [x] 3.4 Revisar contraste de textos y controles con las combinaciones elegidas; verificar visualmente que texto normal, botones y enlaces superen el contraste AA

## 4. Verificación adaptable y registro

- [x] 4.1 Abrir `index.html` por `file://` y comprobar a 320 px y 1280 px: sin scroll horizontal de página, navegación usable, formularios legibles y tablas con desplazamiento propio; registrar el resultado observado
- [x] 4.2 Recorrer toda la interfaz solo con teclado (Tab, Shift+Tab, Enter/Espacio) y verificar foco visible y operabilidad de enlaces, campos y botones
- [x] 4.3 Actualizar `README.md`: etapa «Ejercicio 2», fila de estilos de la tabla de estado, estructura del proyecto y registro de la verificación del caso manual 8 con el resultado observado a 320 px y 1280 px
- [x] 4.4 Ejecutar `openspec validate ejercicio-2 --strict` y confirmar que el cambio valida sin errores

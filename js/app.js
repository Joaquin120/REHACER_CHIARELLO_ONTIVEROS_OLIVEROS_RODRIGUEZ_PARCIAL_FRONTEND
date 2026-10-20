// JavaScript nativo del TPI — Librería El Faro de los Libros.
// Ejercicio 3 (datos locales, catálogo y filtro) y Ejercicio 4 — parte libros
// (selectores dinámicos y alta de libros). Vanilla JS, sin fetch ni librerías.
// Se abre con doble clic en index.html (file://); el script va con `defer`.

'use strict';

// ============================================================
// 1. MODELO DE DATOS INICIAL (IDs estables, datos ficticios)
// ============================================================

const editoriales = [
  { id: 1, nombre: 'Editorial Sudamericana' },
  { id: 2, nombre: 'Ediciones Horizon' },
  { id: 3, nombre: 'Editorial Técnica UTN' }
];

const generos = [
  { id: 1, nombre: 'Fábula' },
  { id: 2, nombre: 'Terror' },
  { id: 3, nombre: 'Educación' }
];

const autores = [
  { id: 1, nombre: 'Antoine de Saint-Exupéry' },
  { id: 2, nombre: 'Julia M. Peralta' },
  { id: 3, nombre: 'María Gómez' },
  { id: 4, nombre: 'Luis Ramírez' }
];

// idGenero: null = sin género asignado (se muestra «Sin clasificar»).
// autores: array de ids de autores existentes.
const libros = [
  { id: 1, titulo: 'El principito', isbn: '978-84-376-0494-7', precio: 1500, idEditorial: 1, idGenero: 1, autores: [1] },
  { id: 2, titulo: 'Cuentos de terror', isbn: '978-987-1111-22-3', precio: 2000, idEditorial: 2, idGenero: null, autores: [2] },
  { id: 3, titulo: 'Introducción a la programación', isbn: '978-987-550-333-9', precio: 3250.5, idEditorial: 3, idGenero: 3, autores: [3, 4] },
  { id: 4, titulo: 'Manual de JavaScript moderno', isbn: '978-987-550-444-3', precio: 2890, idEditorial: 3, idGenero: 3, autores: [4] },
  { id: 5, titulo: 'Relatos del faro', isbn: '978-987-1111-55-1', precio: 1750, idEditorial: 2, idGenero: 2, autores: [2] },
  { id: 6, titulo: 'Fábulas del río', isbn: '978-84-376-0512-8', precio: 1980.75, idEditorial: 1, idGenero: 1, autores: [1, 2] }
];

const clientes = [
  { id: 1, nombreCompleto: 'Ana Beltrán', email: 'ana.beltran@correo.test' },
  { id: 2, nombreCompleto: 'Carlos Duarte', email: 'carlos.duarte@correo.test' },
  { id: 3, nombreCompleto: 'Elena Fuentes', email: 'elena.fuentes@correo.test' }
];

// ============================================================
// 2. HELPERS (búsquedas por id, formato y normalización)
// ============================================================

function buscarEditorialPorId(id) {
  return editoriales.find(function (editorial) { return editorial.id === id; }) || null;
}

function buscarGeneroPorId(id) {
  return generos.find(function (genero) { return genero.id === id; }) || null;
}

function buscarAutoresPorIds(ids) {
  return ids
    .map(function (id) { return autores.find(function (autor) { return autor.id === id; }) || null; })
    .filter(function (autor) { return autor !== null; });
}

// «Sin clasificar» es la representación de la ausencia de género.
function describirEditorial(libro) {
  const editorial = buscarEditorialPorId(libro.idEditorial);
  return editorial ? editorial.nombre : '—';
}

function describirGenero(libro) {
  if (libro.idGenero === null || libro.idGenero === undefined) {
    return 'Sin clasificar';
  }
  const genero = buscarGeneroPorId(libro.idGenero);
  return genero ? genero.nombre : 'Sin clasificar';
}

function describirAutores(libro) {
  const nombres = buscarAutoresPorIds(libro.autores).map(function (autor) { return autor.nombre; });
  return nombres.join(', ');
}

// Formato de importes: dos decimales con coma, sin separador de miles,
// igual que la maqueta del HTML: $1500,00 / $3250,50.
function formatearPrecio(valor) {
  return '$' + Number(valor).toFixed(2).replace('.', ',');
}

// ISBN comparable: se ignoran espacios, guiones y mayúsculas/minúsculas.
function normalizarIsbn(isbn) {
  return String(isbn).replace(/[\s-]/g, '').toUpperCase();
}

function proximoIdLibro() {
  if (libros.length === 0) {
    return 1;
  }
  return Math.max.apply(null, libros.map(function (libro) { return libro.id; })) + 1;
}

// ============================================================
// 3. RENDERIZADO (todas las inserciones son texto, no HTML)
// ============================================================

function crearFilaLibro(libro) {
  const fila = document.createElement('tr');
  const celdas = [
    libro.titulo,
    libro.isbn,
    describirEditorial(libro),
    describirGenero(libro),
    describirAutores(libro),
    formatearPrecio(libro.precio)
  ];
  celdas.forEach(function (texto) {
    const celda = document.createElement('td');
    celda.textContent = texto;
    fila.appendChild(celda);
  });
  return fila;
}

// Reemplaza el tbody de una tabla por una fila por libro.
function renderFilasLibros(tabla, lista) {
  const cuerpo = tabla.querySelector('tbody');
  cuerpo.textContent = '';
  lista.forEach(function (libro) {
    cuerpo.appendChild(crearFilaLibro(libro));
  });
}

// --- Catálogo (Ejercicio 3) ---------------------------------

function filtrarLibrosPorTitulo(termino) {
  const consulta = String(termino).trim().toLowerCase();
  if (consulta === '') {
    return libros.slice();
  }
  return libros.filter(function (libro) {
    return libro.titulo.toLowerCase().indexOf(consulta) !== -1;
  });
}

function renderCatalogo() {
  const campoBusqueda = document.getElementById('catalogo-busqueda');
  const mensajeSinResultados = document.getElementById('catalogo-sin-resultados');
  const mensajeListadoVacio = document.getElementById('catalogo-listado-vacio');
  const tabla = document.getElementById('tabla-catalogo');
  const contenedorTabla = tabla.closest('.tabla-contenedor');

  if (libros.length === 0) {
    renderFilasLibros(tabla, []);
    contenedorTabla.hidden = true;
    mensajeSinResultados.hidden = true;
    mensajeListadoVacio.hidden = false;
    return;
  }

  mensajeListadoVacio.hidden = true;
  const coincidencias = filtrarLibrosPorTitulo(campoBusqueda.value);

  if (coincidencias.length === 0) {
    renderFilasLibros(tabla, []);
    contenedorTabla.hidden = true;
    mensajeSinResultados.hidden = false;
    return;
  }

  mensajeSinResultados.hidden = true;
  contenedorTabla.hidden = false;
  renderFilasLibros(tabla, coincidencias);
}

// --- Libros registrados (Ejercicio 4, parte libros) ---------

function renderTablaLibrosRegistrados() {
  const mensajeVacio = document.getElementById('libros-listado-vacio');
  const tabla = document.getElementById('tabla-libros');
  const contenedorTabla = tabla.closest('.tabla-contenedor');

  if (libros.length === 0) {
    renderFilasLibros(tabla, []);
    contenedorTabla.hidden = true;
    mensajeVacio.hidden = false;
    return;
  }

  mensajeVacio.hidden = true;
  contenedorTabla.hidden = false;
  renderFilasLibros(tabla, libros);
}

// ============================================================
// 4. SELECTORES DINÁMICOS (formularios y venta)
// ============================================================

function cargarSelectoresLibro() {
  const selectEditorial = document.getElementById('libro-editorial');
  const selectGenero = document.getElementById('libro-genero');
  const selectAutores = document.getElementById('libro-autores');

  // Editorial: placeholder deshabilitado + editoriales existentes.
  selectEditorial.textContent = '';
  const placeholderEditorial = new Option('Seleccione una editorial', '');
  placeholderEditorial.disabled = true;
  placeholderEditorial.selected = true;
  selectEditorial.appendChild(placeholderEditorial);
  editoriales.forEach(function (editorial) {
    selectEditorial.appendChild(new Option(editorial.nombre, String(editorial.id)));
  });

  // Género: «Sin clasificar» (valor vacío) seleccionado por defecto.
  selectGenero.textContent = '';
  selectGenero.appendChild(new Option('Sin clasificar', ''));
  generos.forEach(function (genero) {
    selectGenero.appendChild(new Option(genero.nombre, String(genero.id)));
  });

  // Autores: selector múltiple con todos los autores existentes.
  selectAutores.textContent = '';
  autores.forEach(function (autor) {
    selectAutores.appendChild(new Option(autor.nombre, String(autor.id)));
  });
}

// El selector de libro de la venta lo mantiene actualizado el Ejercicio 5;
// aquí solo se reflejan los libros existentes (incluidos los nuevos).
function actualizarSelectorVentaLibro() {
  const selectVentaLibro = document.getElementById('venta-libro');
  selectVentaLibro.textContent = '';
  const placeholder = new Option('Seleccione un libro', '');
  placeholder.disabled = true;
  placeholder.selected = true;
  selectVentaLibro.appendChild(placeholder);
  libros.forEach(function (libro) {
    selectVentaLibro.appendChild(new Option(libro.titulo + ' — ' + formatearPrecio(libro.precio), String(libro.id)));
  });
}

// ============================================================
// 5. ALTA DE LIBROS (validación + preventDefault)
// ============================================================

function validarLibro(datos) {
  const errores = [];

  if (String(datos.titulo).trim() === '') {
    errores.push('El título es obligatorio.');
  }

  if (String(datos.isbn).trim() === '') {
    errores.push('El ISBN es obligatorio.');
  } else {
    const isbnNormalizado = normalizarIsbn(datos.isbn);
    const duplicado = libros.some(function (libro) {
      return normalizarIsbn(libro.isbn) === isbnNormalizado;
    });
    if (duplicado) {
      errores.push('El ISBN ya existe en el catálogo (se compara sin espacios ni guiones).');
    }
  }

  if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
    errores.push('El precio debe ser un número mayor que cero.');
  }

  if (!editoriales.some(function (editorial) { return editorial.id === datos.idEditorial; })) {
    errores.push('La editorial seleccionada debe existir en los datos locales.');
  }

  if (datos.idAutores.length === 0) {
    errores.push('Debe seleccionar al menos un autor.');
  } else {
    const todosExisten = datos.idAutores.every(function (id) {
      return autores.some(function (autor) { return autor.id === id; });
    });
    if (!todosExisten) {
      errores.push('Todos los autores seleccionados deben existir en los datos locales.');
    }
  }

  // El género es opcional: solo se valida si se asignó (llega como string del select).
  if (datos.idGenero !== '' && !generos.some(function (genero) { return String(genero.id) === String(datos.idGenero); })) {
    errores.push('El género seleccionado debe existir en los datos locales.');
  }

  return errores;
}

function mostrarFeedback(elemento, esOk, texto) {
  elemento.textContent = (esOk ? 'OK — ' : 'Error — ') + texto;
  elemento.hidden = false;
}

function limpiarFormularioLibro() {
  const formulario = document.getElementById('form-alta-libro');
  formulario.reset();
  // reset() no garantiza el estado de options creados por JS: se fija explícitamente.
  document.getElementById('libro-editorial').selectedIndex = 0; // placeholder
  document.getElementById('libro-genero').value = ''; // «Sin clasificar»
  document.getElementById('libro-autores').selectedIndex = -1; // nada seleccionado
}

function manejarAltaLibro(evento) {
  evento.preventDefault();
  const feedback = document.getElementById('libros-feedback');

  const datos = {
    titulo: document.getElementById('libro-titulo').value.trim(),
    isbn: document.getElementById('libro-isbn').value.trim(),
    precio: parseFloat(document.getElementById('libro-precio').value),
    idEditorial: parseInt(document.getElementById('libro-editorial').value, 10),
    idGenero: document.getElementById('libro-genero').value === '' ? null : parseInt(document.getElementById('libro-genero').value, 10),
    idAutores: Array.prototype.map.call(
      document.getElementById('libro-autores').selectedOptions,
      function (opcion) { return parseInt(opcion.value, 10); }
    )
  };

  // validarLibro espera idGenero como string crudo ('' = sin asignar).
  const errores = validarLibro(Object.assign({}, datos, {
    idGenero: document.getElementById('libro-genero').value
  }));

  if (errores.length > 0) {
    mostrarFeedback(feedback, false, 'No se pudo registrar el libro. ' + errores.join(' '));
    return;
  }

  libros.push({
    id: proximoIdLibro(),
    titulo: datos.titulo,
    isbn: datos.isbn,
    precio: datos.precio,
    idEditorial: datos.idEditorial,
    idGenero: datos.idGenero,
    autores: datos.idAutores
  });

  mostrarFeedback(feedback, true, 'Libro registrado correctamente: «' + datos.titulo + '» (ISBN ' + datos.isbn + ').');
  limpiarFormularioLibro();

  // Actualización en vivo: catálogo, listado de libros y selector de ventas.
  renderCatalogo();
  renderTablaLibrosRegistrados();
  actualizarSelectorVentaLibro();
}

// ============================================================
// 6. INICIALIZACIÓN Y EVENTOS
// ============================================================

function inicializar() {
  cargarSelectoresLibro();
  actualizarSelectorVentaLibro();
  renderTablaLibrosRegistrados();

  const campoBusqueda = document.getElementById('catalogo-busqueda');
  campoBusqueda.value = '';
  renderCatalogo();

  // Buscador: submit (botón/Enter) y actualización en vivo con `input`.
  document.querySelector('.buscador').addEventListener('submit', function (evento) {
    evento.preventDefault();
    renderCatalogo();
  });
  campoBusqueda.addEventListener('input', renderCatalogo);

  // Alta de libros.
  document.getElementById('form-alta-libro').addEventListener('submit', manejarAltaLibro);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}

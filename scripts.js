/* ================================================================
   FACUNDO CASTILLO — Portfolio Personal
   Scripts de interacción y animaciones
   ================================================================ */

'use strict';

// ---------------------------------------------------------------
// UTILIDADES
// ---------------------------------------------------------------

/** Seleccionar un único elemento */
const qs = (selector, base = document) => base.querySelector(selector);

/** Seleccionar múltiples elementos */
const qsAll = (selector, base = document) => [...base.querySelectorAll(selector)];

// ---------------------------------------------------------------
// DATOS DE PROYECTOS
// Se usan para renderizar las secciones de proyectos en index.html y proyectos.html
// ---------------------------------------------------------------

const proyectos = [
  {
    id: 1,
    titulo: 'Marca Personal',
    categoriaFiltro: 'branding',
    descripcion: 'Sistema visual personal basado en estructura, criterio y claridad.',
    tipo: 'Branding / Identidad personal',
    url: 'https://www.behance.net/gallery/249255943/Marca-Personal',
    linkText: 'Ver proyecto',
    preview: 'img/portada_marcapersonal.png',
    año: '2024',
  },
  {
    id: 2,
    titulo: 'Apertura de sistema',
    categoriaFiltro: 'branding',
    descripcion: 'Apertura de sistema visual para una marca con foco en modularidad y flexibilidad.',
    tipo: 'Identidad visual / Sistema gráfico',
    url: 'https://www.behance.net/gallery/249272077/Apertura-de-sistema',
    linkText: 'Ver proyecto',
    preview: 'img/portada_wasabi.png',
    año: '2024',
  },
  {
    id: 3,
    titulo: 'Intuitiva Panadería',
    categoriaFiltro: 'branding',
    descripcion: 'Identidad visual para panadería artesanal local con un lenguaje marcado por lo artesanal y funcional.',
    tipo: 'Identidad visual / Branding',
    url: 'https://www.behance.net/gallery/249381687/Intuitiva-Panaderia',
    linkText: 'Ver proyecto',
    preview: 'img/portada_intuitiva.jpg',
    año: '2024',
  },
  {
    id: 4,
    titulo: 'GG Store',
    categoriaFiltro: 'web',
    descripcion: 'Tienda online con interfaz clara, búsqueda de producto simple y un recorrido de compra directo.',
    tipo: 'Web / E-commerce / Frontend',
    url: 'https://ggstore-uy.netlify.app/',
    linkText: 'Ver sitio',
    preview: 'img/portada_ggstore.png',
    año: '2024',
  },
  {
    id: 5,
    titulo: 'Nexum Web',
    categoriaFiltro: 'web',
    descripcion: 'Landing de producto digital diseñada para comunicar valor y guiar la conversión con claridad.',
    tipo: 'Web / Landing / Producto digital',
    url: 'https://nexum-web.netlify.app/',
    linkText: 'Ver sitio',
    preview: 'img/portada_nexum.png',
    año: '2024',
  },
  {
    id: 6,
    titulo: 'Mood Atlas',
    categoriaFiltro: 'experiencia',
    descripcion: 'Proyecto interactivo orientado a generar una experiencia digital inmersiva y estructurada.',
    tipo: 'Web / Experiencia digital',
    url: 'https://mood-atlas.netlify.app/',
    linkText: 'Ver sitio',
    preview: 'img/portada_moodatlas.png',
    año: '2024',
  },
];

const crearTarjetaProyecto = (proyecto, index) => {
  return `
    <article class="tarjetaTecnica animarEntrada" data-categoria="${proyecto.categoriaFiltro}">
      <div class="tarjetaTecnica__imagen tarjetaTecnica__imagen--${(index % 6) + 1}">
        <img src="${proyecto.preview}" alt="Portada ${proyecto.titulo}" loading="lazy" />
      </div>
      <div class="tarjetaTecnica__info">
        <h2 class="tarjetaTecnica__titulo">${proyecto.titulo}</h2>
        <p class="tarjetaTecnica__tipo">${proyecto.tipo}</p>
        <p class="tarjetaTecnica__descripcion">${proyecto.descripcion}</p>
        <a href="${proyecto.url}" class="boton boton--secundario tarjetaTecnica__cta" target="_blank" rel="noopener noreferrer">${proyecto.linkText} →</a>
      </div>
    </article>
  `;
};

const crearTarjetaHome = (proyecto) => {
  return `
    <article class="tarjetaProyecto">
      <div class="tarjetaProyecto__imagen">
        <img src="${proyecto.preview}" alt="Portada ${proyecto.titulo}" loading="lazy" />
      </div>
      <div class="tarjetaProyecto__info">
        <h3 class="tarjetaProyecto__titulo">${proyecto.titulo}</h3>
        <p class="tarjetaProyecto__tipo">${proyecto.tipo}</p>
        <p class="tarjetaProyecto__descripcion">${proyecto.descripcion}</p>
        <div class="tarjetaProyecto__acciones">
          <a href="${proyecto.url}" class="boton boton--secundario" target="_blank" rel="noopener noreferrer">${proyecto.linkText} →</a>
        </div>
      </div>
    </article>
  `;
};

const renderProyectosHome = () => {
  const contenedor = qs('#cardsProyectos');
  if (!contenedor) return;

  contenedor.innerHTML = proyectos
    .slice(0, 6)
    .map((proyecto, index) => crearTarjetaHome(proyecto, index))
    .join('');
};

const renderProyectosPage = () => {
  const contenedor = qs('#rejillaTecnica');
  if (!contenedor) return;

  contenedor.innerHTML = proyectos
    .map((proyecto, index) => crearTarjetaProyecto(proyecto, index))
    .join('');
};

const inicializarProyectos = () => {
  renderProyectosHome();
  renderProyectosPage();
};

// ---------------------------------------------------------------
// INDICADOR DE DISPONIBILIDAD
// Cambia entre verde y rojo según disponibilidad real
// ---------------------------------------------------------------

const inicializarIndicadorDisponibilidad = () => {
  const circulo = qs('#circuloEstado');
  const texto   = qs('#textoEstado');

  if (!circulo || !texto) return;

  // Cambiar a true/false según necesidades reales
  const estaDisponible = true;

  if (estaDisponible) {
    circulo.classList.add('disponible');
    texto.textContent = 'Disponible para proyectos';
  } else {
    circulo.classList.add('noDisponible');
    texto.textContent = 'Actualmente ocupado';
  }
};

// ---------------------------------------------------------------
// NAVEGACIÓN ACTIVA (menú lateral + menú mobile)
// Marca el enlace correcto según la sección visible
// ---------------------------------------------------------------

const actualizarNavegacionActiva = (idSeccion) => {
  // Menú lateral
  qsAll('.menuLateral__enlace').forEach(enlace => {
    enlace.classList.toggle(
      'activo',
      enlace.dataset.seccion === idSeccion
    );
  });

  // Menú mobile
  qsAll('.menuMobile__item').forEach(item => {
    item.classList.toggle(
      'activo',
      item.dataset.seccion === idSeccion
    );
  });
};

// ---------------------------------------------------------------
// OBSERVER DE SECCIONES
// Detecta qué sección está en pantalla para actualizar el menú
// ---------------------------------------------------------------

const inicializarObserverSecciones = () => {
  const secciones = qsAll('.seccion');

  const opcionesObserver = {
    root: qs('#contenedorPrincipal'),
    threshold: 0.5, // Activa cuando el 50% de la sección es visible
  };

  const callbackObserver = (entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        const idSeccion = entrada.target.dataset.seccion;
        actualizarNavegacionActiva(idSeccion);
      }
    });
  };

  const observer = new IntersectionObserver(callbackObserver, opcionesObserver);
  secciones.forEach(seccion => observer.observe(seccion));
};

// ---------------------------------------------------------------
// ANIMACIONES DE ENTRADA
// Intersection Observer para elementos con clase .animarEntrada
// ---------------------------------------------------------------

const inicializarAnimacionesEntrada = () => {
  const elementosAnimados = qsAll('.animarEntrada');

  const opcionesAnimacion = {
    root: null,      // Viewport global (funciona para scroll snap)
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  };

  const callbackAnimacion = (entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        // Dejar de observar una vez animado (solo entra una vez)
        observerAnimacion.unobserve(entrada.target);
      }
    });
  };

  const observerAnimacion = new IntersectionObserver(callbackAnimacion, opcionesAnimacion);
  elementosAnimados.forEach(elemento => observerAnimacion.observe(elemento));
};

// ---------------------------------------------------------------
// NAVEGACIÓN SUAVE AL HACER CLIC EN MENÚ
// Hace scroll al contenedor correcto (scroll snap container)
// ---------------------------------------------------------------

const inicializarNavegacionSuave = () => {
  const contenedor = qs('#contenedorPrincipal');

  // Función que mueve el scroll al ID indicado dentro del contenedor
  const scrollearASeccion = (idDestino, evento) => {
    const destino = qs(idDestino);
    if (!destino || !contenedor) return;

    evento.preventDefault();
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Menú lateral
  qsAll('.menuLateral__enlace').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      const destino = enlace.getAttribute('href');
      scrollearASeccion(destino, e);
    });
  });

  // Menú mobile
  qsAll('.menuMobile__item').forEach(item => {
    item.addEventListener('click', (e) => {
      const destino = item.getAttribute('href');
      scrollearASeccion(destino, e);
    });
  });

  // Botones que apuntan a secciones internas
  qsAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      const destino = enlace.getAttribute('href');
      if (destino === '#') return;
      const elemento = qs(destino);
      if (elemento) scrollearASeccion(destino, e);
    });
  });
};

// ---------------------------------------------------------------
// INICIALIZACIÓN GENERAL
// Se ejecuta cuando el DOM está completamente cargado
// ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  inicializarIndicadorDisponibilidad();
  inicializarProyectos();
  inicializarObserverSecciones();
  inicializarAnimacionesEntrada();
  inicializarNavegacionSuave();

  console.log(
    '%c Facundo Castillo Portfolio ',
    'background: #D97706; color: #111827; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
  );
});

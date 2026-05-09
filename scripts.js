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
  inicializarObserverSecciones();
  inicializarAnimacionesEntrada();
  inicializarNavegacionSuave();

  console.log(
    '%c Facundo Castillo Portfolio ',
    'background: #D97706; color: #111827; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
  );
});

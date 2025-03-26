window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const skillItems = document.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        const percent = entry.target.getAttribute('data-percent');
        fill.style.width = `${percent}%`;
        observer.unobserve(entry.target); // solo una vez
      }
    });
  }, {
    threshold: 0.4 // al menos 40% visible
  });

  skillItems.forEach(item => {
    observer.observe(item);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Marcar enlace activo
  const navLinks = document.querySelectorAll('header nav a');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add(
        'font-bold',
        'underline',
        'text-blue-200',        // Modo claro
        'dark:text-blue-300'    // Modo oscuro
      );
    }
  });
});

// Cargar header y aplicar lógica después de insertarlo
fetch('components/header.html') // en vez de 'header.html'
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
    activarEnlaceActivo();
  });

fetch('components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });


// Función para marcar el enlace activo
function activarEnlaceActivo() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add(
        'font-bold',
        'underline',
        'text-blue-200',
        'dark:text-blue-300',
        'text-lg',
        'transition-colors',
        'duration-300'
      );
    }
  });
}

// Animar timeline dinámicamente al hacer scroll
const observerTimeline = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-y-8');
      observerTimeline.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.timeline-item').forEach(item => {
  observerTimeline.observe(item);
});

// Función: animar solo los elementos visibles
function animarTimeline(containerId) {
  const items = document.querySelectorAll(`#${containerId} .timeline-item`);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const index = [...items].indexOf(element);
        element.style.transitionDelay = `${index * 150}ms`;
        element.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.2
  });

  items.forEach(item => {
    item.classList.remove('opacity-100', 'translate-y-0');
    item.classList.add('opacity-0', 'translate-y-8');
    item.style.transitionDelay = '0ms';
    observer.observe(item);
  });
}


// Tabs dinámicos + animación
document.addEventListener('DOMContentLoaded', () => {
  const tabs = {
    academic: {
      btn: document.getElementById('tab-academic'),
      container: document.getElementById('academic-timeline')
    },
    professional: {
      btn: document.getElementById('tab-professional'),
      container: document.getElementById('professional-timeline')
    }
  };

  function activarPestaña(nombreActiva) {
    for (const [nombre, tab] of Object.entries(tabs)) {
      const isActive = nombre === nombreActiva;
      tab.btn.classList.toggle('active-tab', isActive);
      tab.container.classList.toggle('hidden', !isActive);
      if (isActive) animarTimeline(tab.container.id);
    }
  }

  tabs.academic.btn.addEventListener('click', () => activarPestaña('academic'));
  tabs.professional.btn.addEventListener('click', () => activarPestaña('professional'));

  // Activar la pestaña por defecto
  activarPestaña('academic');
});




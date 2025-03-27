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
        'duration-200'
      );
    }
  });
}

// Zigzag
document.addEventListener('DOMContentLoaded', () => {
  const academicBtn = document.getElementById('tab-academic');
  const professionalBtn = document.getElementById('tab-professional');

  const academicTimeline = document.getElementById('academic-timeline');
  const professionalTimeline = document.getElementById('professional-timeline');

  academicBtn.addEventListener('click', () => {
    academicBtn.classList.add('active-tab');
    professionalBtn.classList.remove('active-tab');
    academicTimeline.classList.remove('hidden');
    professionalTimeline.classList.add('hidden');
  });

  professionalBtn.addEventListener('click', () => {
    professionalBtn.classList.add('active-tab');
    academicBtn.classList.remove('active-tab');
    professionalTimeline.classList.remove('hidden');
    academicTimeline.classList.add('hidden');
  });

  // Mostrar Academic por defecto
  academicBtn.click();
});

// Cargar artículos
document.addEventListener('DOMContentLoaded', () => {
  renderArticulos(); // Usa el selector por defecto
});
function renderArticulos(selector = '#articulos') {
  const container = document.querySelector(selector);
  if (!container) return;

  const articulos = container.querySelectorAll('.articulo');

  articulos.forEach(div => {
    const title = div.dataset.title;
    const published = div.dataset.published;
    const summary = div.dataset.summary;
    const link = div.dataset.link;

    div.innerHTML = `
    <div class="mb-4 p-4 border rounded-2xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <a href="${link}" target="_blank" class="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          ${title}
        </a>
        <a href="${link}" target="_blank" class="text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" aria-label="Ver artículo">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M14 3h7m0 0v7m0-7L10 14m-4 0h4v4" />
          </svg>
        </a>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300">${published}</p>
      <p class="mt-2 text-gray-800 dark:text-gray-300">${summary}</p>
    </div>
  `;
  });
}

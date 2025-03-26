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


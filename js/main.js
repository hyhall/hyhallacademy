/* ==========================================================
   Hyhall Academy - Lógica de la landing page
   ========================================================== */

// Cursos ficticios de ejemplo
const courses = [
  {
    title: "Desarrollo Web desde Cero",
    description: "HTML, CSS y JavaScript para crear tus primeras páginas web modernas.",
    category: "programacion",
    label: "Programación",
    icon: "💻",
    color: "#e9e4ff",
    level: "Principiante",
    hours: 24,
    price: 49,
  },
  {
    title: "Python para Análisis de Datos",
    description: "Domina pandas, NumPy y visualización para tomar decisiones con datos.",
    category: "datos",
    label: "Datos",
    icon: "📊",
    color: "#dff6ee",
    level: "Intermedio",
    hours: 30,
    price: 59,
  },
  {
    title: "Diseño UX/UI Profesional",
    description: "Investigación de usuarios, prototipado en Figma y sistemas de diseño.",
    category: "diseno",
    label: "Diseño",
    icon: "🎨",
    color: "#ffe6ef",
    level: "Principiante",
    hours: 18,
    price: 45,
  },
  {
    title: "Marketing Digital Estratégico",
    description: "SEO, redes sociales y campañas de pago para hacer crecer tu marca.",
    category: "negocios",
    label: "Negocios",
    icon: "📈",
    color: "#fff1dc",
    level: "Intermedio",
    hours: 20,
    price: 39,
  },
  {
    title: "React y Aplicaciones Modernas",
    description: "Componentes, hooks y buenas prácticas para construir SPAs escalables.",
    category: "programacion",
    label: "Programación",
    icon: "⚛️",
    color: "#e1f3ff",
    level: "Avanzado",
    hours: 32,
    price: 69,
  },
  {
    title: "Introducción a la Inteligencia Artificial",
    description: "Conceptos clave de machine learning y cómo aplicarlos en proyectos reales.",
    category: "datos",
    label: "Datos",
    icon: "🤖",
    color: "#ece6ff",
    level: "Intermedio",
    hours: 26,
    price: 79,
  },
  {
    title: "Ilustración Digital Creativa",
    description: "Técnicas de dibujo, color y composición con herramientas digitales.",
    category: "diseno",
    label: "Diseño",
    icon: "✏️",
    color: "#e6f8e6",
    level: "Principiante",
    hours: 15,
    price: 35,
  },
  {
    title: "Emprendimiento y Startups",
    description: "Valida tu idea, crea un modelo de negocio y presenta ante inversores.",
    category: "negocios",
    label: "Negocios",
    icon: "💡",
    color: "#fff6d6",
    level: "Todos los niveles",
    hours: 12,
    price: 29,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupNavbar();
  setupFilters();
  setupRevealAnimations();
  setupCounters();
  setupNewsletter();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- Render de cursos ---------- */
function renderCourses() {
  const grid = document.getElementById("coursesGrid");
  grid.innerHTML = courses
    .map(
      (c) => `
      <article class="course-card reveal" data-category="${c.category}">
        <div class="course-cover" style="background:${c.color}">
          <span class="course-tag">${c.label}</span>
          <span aria-hidden="true">${c.icon}</span>
        </div>
        <div class="course-body">
          <h3>${c.title}</h3>
          <p>${c.description}</p>
          <div class="course-meta">
            <span>📶 ${c.level}</span>
            <span>⏱️ ${c.hours} h</span>
          </div>
          <div class="course-footer">
            <span class="course-price">${c.price} €</span>
            <a href="#contacto" class="btn btn-primary btn-sm">Inscribirme</a>
          </div>
        </div>
      </article>`
    )
    .join("");
}

/* ---------- Navbar: menú móvil, sombra y enlace activo ---------- */
function setupNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Resalta el enlace de la sección visible
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

/* ---------- Filtros de cursos ---------- */
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      document.querySelectorAll(".course-card").forEach((card) => {
        const match = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });
}

/* ---------- Animación al hacer scroll ---------- */
function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- Contadores animados del hero ---------- */
function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((el) => {
    const target = Number(el.dataset.count);
    const duration = 1500;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString("es-ES");
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* ---------- Formulario de suscripción ---------- */
function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const message = document.getElementById("formMessage");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    message.textContent = valid
      ? "¡Gracias por suscribirte! Pronto recibirás novedades."
      : "Por favor, introduce un correo electrónico válido.";
    if (valid) form.reset();
  });
}

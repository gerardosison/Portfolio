/**
 * Gerardo Sison — Single Page Application (SPA) Client-Side Router
 * Powered by HTML5 History API (pushState & popstate)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. ROUTE DEFINITIONS & ROUTER LOGIC =====
  const routes = {
    '/': 'view-home',
    '/projects': 'view-projects',
    '/events': 'view-events',
    '/contact': 'view-contact'
  };

  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const pageViews = document.querySelectorAll('.page-view');

  // Normalize path string
  function getNormalizedPath(pathname = window.location.pathname) {
    let clean = pathname.trim();
    if (clean.endsWith('/index.html')) {
      clean = clean.replace('/index.html', '') || '/';
    }
    if (clean.length > 1 && clean.endsWith('/')) {
      clean = clean.slice(0, -1);
    }
    return routes[clean] ? clean : '/';
  }

  // Switch Active Page View
  function renderRoute(path) {
    const validPath = getNormalizedPath(path);
    const targetViewId = routes[validPath] || 'view-home';

    // 1. Swap active class on views
    pageViews.forEach(view => {
      if (view.id === targetViewId) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // 2. Update Header active navigation pill
    navLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      link.classList.toggle('active', linkRoute === validPath);
    });

    // 3. Update Mobile drawer active state
    mobileLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      link.classList.toggle('active', linkRoute === validPath);
    });

    // 4. Update Document Title
    const titles = {
      '/': 'Gerardo Sison — Software Developer',
      '/projects': 'Projects — Gerardo Sison',
      '/events': 'Events & Hackathons — Gerardo Sison',
      '/contact': 'Contact Me — Gerardo Sison'
    };
    document.title = titles[validPath] || 'Gerardo Sison — Software Developer';

    // 5. Scroll to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  // Navigate using pushState
  function navigateTo(url) {
    const currentPath = getNormalizedPath();
    const targetPath = getNormalizedPath(url);

    if (currentPath !== targetPath) {
      try {
        history.pushState({ path: targetPath }, '', targetPath);
      } catch (err) {
        // Safe fallback
      }
      renderRoute(targetPath);
    }
  }

  // Global Link Click Interceptor
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
      }
    }
  });

  // Handle Browser Back / Forward buttons (popstate)
  window.addEventListener('popstate', () => {
    renderRoute(getNormalizedPath());
  });

  // Initial Route Render on page load
  renderRoute(getNormalizedPath());

  // ===== 2. PROJECT DATA REPOSITORY (For Screen Expand Modal) =====
  const projectsData = {
    'project-1': {
      meta: 'Full-Stack Application · 2025',
      title: 'AI Study Assistant Platform',
      desc: 'An end-to-end intelligent study companion built for university students. It processes lecture PDFs, creates structured summary briefs, and leverages the Gemini API to formulate interactive practice quizzes and active-recall flashcards.',
      bullets: [
        'Integrated Google Gemini API for fast contextual question generation.',
        'Engineered responsive document parsing pipeline with client-side OCR caching.',
        'Designed minimal, distraction-free aesthetic with dark mode and export to Anki.'
      ],
      tags: ['Next.js', 'React', 'Gemini API', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/gerardosison'
    },
    'project-2': {
      meta: 'Web Application · 2025',
      title: 'DevFlow Task Management',
      desc: 'A lightweight, high-performance task management system engineered specifically for solo engineers and sprint teams. Focuses on zero-latency interactions and clean Kanban workflows.',
      bullets: [
        'Built with PostgreSQL and Prisma ORM for relational sprint dependencies.',
        'Implemented keyboard shortcuts and drag-and-drop board cards.',
        'Achieved sub-100ms API response latency with Edge endpoints.'
      ],
      tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Express', 'Docker'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/gerardosison'
    },
    'project-3': {
      meta: 'E-Commerce Architecture · 2024',
      title: 'Minimalist Apparel Storefront',
      desc: 'A headless e-commerce experience engineered for speed and visual storytelling. Features instant cart synchronization, localized currency switches, and Stripe Checkout.',
      bullets: [
        'Optimized Next.js dynamic routing and image rendering.',
        'Full Stripe Payment Intents and webhook synchronization.',
        'Lighthouse performance score 99/100 across mobile and desktop.'
      ],
      tags: ['Next.js', 'Stripe API', 'Tailwind CSS', 'Zustand', 'PostgreSQL'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/gerardosison'
    }
  };

  // ===== 3. SCREEN EXPAND MODAL CONTROLLER =====
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');

  const modalMeta = document.getElementById('modalMeta');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalBullets = document.getElementById('modalBullets');
  const modalTags = document.getElementById('modalTags');
  const modalLinks = document.getElementById('modalLinks');
  const modalMockupContent = document.getElementById('modalMockupContent');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalMeta.textContent = data.meta;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    // Render Key Bullets
    modalBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');

    // Render Tech Tags
    modalTags.innerHTML = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

    // Render Links
    modalLinks.innerHTML = `
      <a href="${data.demoUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-dark w-full">Live Demo &rarr;</a>
      <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-light w-full mt-2">Source Code &rarr;</a>
    `;

    // Render Mockup Preview
    modalMockupContent.innerHTML = `
      <div>
        <p class="font-mono text-muted" style="font-size: 11px;">[ Interactive Application Preview ]</p>
        <p style="font-weight: 700; font-size: 18px; margin-top: 4px;">${data.title}</p>
      </div>
    `;

    projectModal.classList.add('is-active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('is-active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Delegated click listener for all project cards (Spotlight, Summary, and Full Page)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (card) {
      const pid = card.getAttribute('data-project');
      if (pid) openProjectModal(pid);
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project-card')) {
      e.preventDefault();
      const pid = e.target.getAttribute('data-project');
      if (pid) openProjectModal(pid);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-active')) {
      closeProjectModal();
    }
  });

  // ===== 4. MOBILE DRAWER MENU =====
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
    });
  }

  // ===== 5. CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.textContent = 'Message received! I will get back to you shortly.';
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = '';
      }, 3000);
    });
  }

  // ===== BOOKSHELF CERTIFICATE SPINES =====
  const certSpines = document.querySelectorAll('.cert-spine');
  certSpines.forEach(spine => {
    spine.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // let the PDF link open normally
      if (spine.classList.contains('is-open')) return;
      certSpines.forEach(s => s.classList.remove('is-open'));
      spine.classList.add('is-open');
    });
    spine.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        spine.click();
      }
    });
  });

    // ===== CERTIFICATE PREVIEW LIGHTBOX =====
  const certLightbox = document.getElementById('certLightbox');
  const certLightboxImg = document.getElementById('certLightboxImg');
  const certLightboxClose = document.querySelector('.cert-lightbox-close');

  document.querySelectorAll('.cert-panel-preview').forEach(btn => {
    btn.addEventListener('click', () => {
      certLightboxImg.src = btn.dataset.full;
      certLightboxImg.alt = btn.querySelector('img').alt;
      certLightbox.classList.add('is-active');
    });
  });

  function closeCertLightbox() {
    certLightbox.classList.remove('is-active');
    certLightboxImg.src = '';
  }
  certLightboxClose.addEventListener('click', closeCertLightbox);
  certLightbox.addEventListener('click', (e) => {
    if (e.target === certLightbox) closeCertLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertLightbox();
  });

});

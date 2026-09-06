/**
 * Gerardo Sison — SPA Router + Content Renderer
 * Powered by HTML5 History API (pushState & popstate)
 *
 * All project/certification content lives in data.js (PROJECTS, CERTS).
 * This file only renders that data into the page and wires up interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. ROUTE DEFINITIONS & ROUTER LOGIC =====
  const routes = {
    '/': 'view-home',
    '/projects': 'view-projects',
    '/events': 'view-events',
    '/contact': 'view-contact',
    '/certifications': 'view-certifications'
  };

  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const pageViews = document.querySelectorAll('.page-view');

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

  function renderRoute(path) {
    const validPath = getNormalizedPath(path);
    const targetViewId = routes[validPath] || 'view-home';

    pageViews.forEach(view => {
      view.classList.toggle('active', view.id === targetViewId);
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-route') === validPath);
    });

    mobileLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-route') === validPath);
    });

    const titles = {
      '/': 'Gerardo Sison — Software Developer',
      '/projects': 'Projects — Gerardo Sison',
      '/events': 'Events & Hackathons — Gerardo Sison',
      '/contact': 'Contact Me — Gerardo Sison',
      '/certifications': 'Certifications — Gerardo Sison'
    };
    document.title = titles[validPath] || 'Gerardo Sison — Software Developer';

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  function navigateTo(url) {
    const currentPath = getNormalizedPath();
    const targetPath = getNormalizedPath(url);

    if (currentPath !== targetPath) {
      try {
        history.pushState({ path: targetPath }, '', targetPath);
      } catch (err) {
        // Safe fallback if pushState is unavailable (e.g. file:// preview)
      }
      renderRoute(targetPath);
    }
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link) {
      e.preventDefault();
      navigateTo(link.getAttribute('href'));

      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
      }
    }
  });

  window.addEventListener('popstate', () => {
    renderRoute(getNormalizedPath());
  });

  // ===== 2. PROJECT CARD RENDERING (from data.js: PROJECTS) =====

  function renderSpotlightCard(project) {
    const badges = [project.calloutBadge, ...project.tags.slice(0, 3)]
      .filter(Boolean)
      .map(b => `<span class="tag-badge">${b}</span>`)
      .join('');

    return `
        <div class="spotlight-card project-card" data-project="${project.id}" tabindex="0" style="--accent: ${project.accent || '#111827'}">
        <div class="spotlight-preview">
          <div class="preview-mockup">
            <div class="mockup-bar"><span></span><span></span><span></span></div>
            ${project.image
              ? `<img src="${project.image}" alt="${project.title}" class="mockup-image">`
              : `<div class="mockup-content">
                  <span class="mockup-tag font-mono">${project.category}</span>
                  <p class="mockup-title">${project.title}</p>
                  <p class="mockup-sub text-muted">${project.summary}</p>
                </div>`
            }
          </div>
          <span class="expand-indicator" title="Expand Case Study">${svgIcon('expand', { width: 16, height: 16 })}</span>
        </div>
        <div class="spotlight-body">
          <div class="project-tags font-mono">${badges}</div>
          <p class="spotlight-desc">${project.description}</p>
          <div class="spotlight-footer">
            <button type="button" class="btn-text font-mono">VIEW CASE STUDY &rarr;</button>
          </div>
        </div>
      </div>`;
  }

  function renderSummaryCard(project) {
    const pills = project.tags.slice(0, 2)
      .map(t => `<span class="tag-badge">${t.toUpperCase()}</span>`)
      .join('');

    return `
        <article class="summary-project-card project-card" data-project="${project.id}" tabindex="0" style="--accent: ${project.accent || '#111827'}">
        <div class="summary-card-top">
          ${project.image
            ? `<img src="${project.image}" alt="${project.title}" class="summary-app-image">`
            : `<div class="summary-app-icon">${svgIcon(project.icon)}</div>`
          }
          <div class="summary-pill-group font-mono">${pills}</div>
        </div>
        <h3 class="summary-card-title">${project.title}</h3>
        <p class="summary-card-desc">${project.summary}</p>
        <div class="summary-card-bottom">
          <span class="btn-text font-mono">VIEW DETAILS &rarr;</span>
        </div>
      </article>`;
  }

  function renderFullCard(project) {
    const tags = project.tags.slice(0, 4).map(t => `<span>${t}</span>`).join('');

    return `
        <article class="project-card" data-project="${project.id}" tabindex="0" style="--accent: ${project.accent || '#111827'}">
        <div class="project-preview">
          <div class="preview-mockup">
            <div class="mockup-bar"><span></span><span></span><span></span></div>
            ${project.image
              ? `<img src="${project.image}" alt="${project.title}" class="mockup-image">`
              : `<div class="mockup-content">
                  <span class="mockup-tag font-mono">${project.category}</span>
                  <p class="mockup-title">${project.title}</p>
                  <p class="mockup-sub text-muted">${project.summary}</p>
                </div>`
            }
          </div>
          <span class="expand-indicator" title="Expand Details">${svgIcon('expand', { width: 16, height: 16 })}</span>
        </div>
        <div class="project-body">
          <div class="project-tags font-mono">${tags}</div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.summary}</p>
          <div class="project-footer">
            <span class="btn-text font-mono">EXPAND DETAILS &rarr;</span>
          </div>
        </div>
      </article>`;
  }

  function mountProjectViews() {
    const spotlightMount = document.getElementById('spotlightContainer');
    const summaryMount = document.getElementById('summaryProjectGrid');
    const fullMount = document.getElementById('fullProjectGrid');

    const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];

    if (spotlightMount) spotlightMount.innerHTML = renderSpotlightCard(featured);
    if (summaryMount) summaryMount.innerHTML = PROJECTS.map(renderSummaryCard).join('');
    if (fullMount) fullMount.innerHTML = PROJECTS.map(renderFullCard).join('');
  }

  // ===== 3. SCREEN EXPAND MODAL (uses PROJECTS from data.js) =====
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
    const data = PROJECTS.find(p => p.id === projectId);
    if (!data) return;

    modalMeta.textContent = `${data.category} · ${data.year}`;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    modalBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
    modalTags.innerHTML = data.tags.map(t => `<span class="tag-badge">${t}</span>`).join('');

    modalLinks.innerHTML = `
      <a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-dark w-full">Source Code &rarr;</a>
    `;

    modalMockupContent.innerHTML = data.image
    ? `<img src="${data.image}" alt="${data.title}" class="modal-mockup-image">`
    : `<div>
        <p class="font-mono text-muted" style="font-size: 11px;">[ Interactive Application Preview ]</p>
        <p style="font-weight: 700; font-size: 18px; margin-top: 4px;">${data.title}</p>
      </div>`;

    projectModal.classList.add('is-active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('is-active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('is-active')) {
      closeProjectModal();
    }
  });

    // ===== 4. CERTIFICATION TIMELINE LIST (uses CERTS from data.js) =====
  const CERT_PREVIEW_COUNT = 2;

  function renderCertRow(cert) {
    return `
      <div class="cert-row">
        <div class="cert-date font-mono">${cert.date}</div>
        <div class="cert-info">
          <h4 class="cert-title">${cert.title}</h4>
          <p class="cert-issuer text-muted">${cert.issuer}</p>
          ${cert.credentialId ? `<p class="cert-credential font-mono text-muted">Credential ID ${cert.credentialId}</p>` : ''}
          <button type="button" class="cert-thumb" data-full="${cert.img}">
            <img src="${cert.img}" alt="${cert.title} preview">
          </button>
        </div>
      </div>`;
  }

  function mountCertShelf() {
    const previewMount = document.getElementById('certShelf');
    const fullMount = document.getElementById('fullCertList');

    if (previewMount) {
      previewMount.innerHTML = CERTS.slice(0, CERT_PREVIEW_COUNT).map(renderCertRow).join('');
    }
    if (fullMount) {
      fullMount.innerHTML = CERTS.map(renderCertRow).join('');
    }

    wireCertThumbs();
  }

  function wireCertThumbs() {
    document.querySelectorAll('.cert-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        certLightboxImg.src = btn.dataset.full;
        certLightboxImg.alt = img ? img.alt : '';
        certLightbox.classList.add('is-active');
      });
    });
  }

  // ===== 5. CERTIFICATE PREVIEW LIGHTBOX =====
  const certLightbox = document.getElementById('certLightbox');
  const certLightboxImg = document.getElementById('certLightboxImg');
  const certLightboxClose = document.querySelector('.cert-lightbox-close');

  function closeCertLightbox() {
    if (!certLightbox) return;
    certLightbox.classList.remove('is-active');
    certLightboxImg.src = '';
  }

  if (certLightboxClose) certLightboxClose.addEventListener('click', closeCertLightbox);
  if (certLightbox) {
    certLightbox.addEventListener('click', (e) => {
      if (e.target === certLightbox) closeCertLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertLightbox();
  });

  // ===== 6. MOBILE DRAWER MENU =====
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
    });
  }

  // ===== 7. CONTACT FORM SUBMISSION =====
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


    // ===== 8. TECH STACK (marquee + static toggle, from data.js: TECH_STACK) =====
  let techStaticView = false;

  function renderTechPill(item) {
    const icon = item.icon
      ? `<i class="${item.icon} tech-pill-icon"></i>`
      : `<span class="tech-pill-icon tech-pill-icon-fallback font-mono">${item.name.charAt(0)}</span>`;
    return `<span class="tech-pill">${icon}<span>${item.name}</span></span>`;
  }

  function renderTechCategoryStatic(category) {
    return `
      <div class="tech-category-block">
        <h3 class="tech-category-heading font-mono">${category.heading}</h3>
        <div class="tech-pills-row">
          ${category.items.map(renderTechPill).join('')}
        </div>
      </div>`;
  }

  function renderTechCategoryMarquee(category, index) {
  const pillsHtml = category.items.map(renderTechPill).join('');
  const direction = index % 2 === 0 ? 'marquee-left' : 'marquee-right';
  const duration = category.speed || 28;
  return `
    <div class="tech-category-block">
      <h3 class="tech-category-heading font-mono">${category.heading}</h3>
      <div class="tech-marquee">
        <div class="tech-marquee-track ${direction}" style="animation-duration: ${duration}s;">
          ${pillsHtml}${pillsHtml}
        </div>
      </div>
    </div>`;
}

  function mountTechStack() {
    const mount = document.getElementById('techStackContainer');
    const toggleBtn = document.getElementById('techViewToggle');
    if (!mount) return;

    mount.innerHTML = techStaticView
      ? TECH_STACK.map(renderTechCategoryStatic).join('')
      : TECH_STACK.map(renderTechCategoryMarquee).join('');

    if (toggleBtn) {
      toggleBtn.textContent = techStaticView ? '← VIEW SCROLLING' : 'VIEW ALL →';
    }
  }

  document.getElementById('techViewToggle')?.addEventListener('click', () => {
    techStaticView = !techStaticView;
    mountTechStack();
  });

  // ===== INITIAL RENDER =====
  mountProjectViews();
  mountCertShelf();
  mountTechStack();
  renderRoute(getNormalizedPath());
});


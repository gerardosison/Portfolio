/**
 * Gerardo Sison — Portfolio Controller
 * Theme switcher, floating navbar, mobile menu, scrollspy, project gallery,
 * project modal, certificate lightbox, tech stack marquee, and contact form.
 * Data comes from data.js (PROJECTS, CERTS, TECH_STACK).
 */

document.addEventListener('DOMContentLoaded', () => {

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  // ===== DATA (from data.js) =====
  const projectSource = (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) ? PROJECTS : [];
  const certSource = (typeof CERTS !== 'undefined' && Array.isArray(CERTS)) ? CERTS : [];
  const techSource = (typeof TECH_STACK !== 'undefined' && Array.isArray(TECH_STACK)) ? TECH_STACK : [];


  // ===== 1. FOOTER YEAR =====
  const yearEl = $('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ===== 2. THEME SWITCHER =====
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = store.get('theme');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyTheme(savedTheme || (darkQuery.matches ? 'dark' : 'light'));

  const themeToggle = $('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      const change = () => { applyTheme(next); store.set('theme', next); };

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduceMotion) {
        change();
        return;
      }

      // Circle grows from the center of the toggle button
      const rect = themeToggle.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      root.classList.add('theme-switching');
      const transition = document.startViewTransition(change);

      transition.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      });

      transition.finished.finally(() => root.classList.remove('theme-switching'));
    });
  }

  const onSystemTheme = (e) => { if (!store.get('theme')) applyTheme(e.matches ? 'dark' : 'light'); };
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemTheme);


  // ===== 3. MOBILE MENU =====
  const mobileToggle = $('mobileToggle');
  const mobileMenu = $('mobileMenu');

  function setMobileMenu(open) {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.classList.toggle('is-open', open);
    mobileToggle.classList.toggle('is-active', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('is-open')));
  }

  document.querySelectorAll('.mobile-link, .mobile-resume-btn').forEach((link) => {
    link.addEventListener('click', () => setMobileMenu(false));
  });

  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('is-open')
        && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      setMobileMenu(false);
    }
  });

  window.addEventListener('resize', () => { if (window.innerWidth > 768) setMobileMenu(false); });


  // ===== 4. NAVBAR STATE + SCROLLSPY + BACK TO TOP =====
  const topbar = $('topbar');
  const hero = $('hero');
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.topnav .nav-link')];
  const spyAlias = { education: 'about', tools: 'projects', certifications: 'events' };

  function onScroll() {
    if (document.body.classList.contains('view-all')) {
      if (topbar) topbar.classList.add('is-scrolled');
      navLinks.forEach((l) => l.classList.remove('active'));
      return;
    }
    const y = window.scrollY;
    
    // Transparent over the hero, glass after it
    if (topbar) {
      const heroEnd = hero ? hero.offsetHeight - 110 : 40;
      topbar.classList.toggle('is-scrolled', y > Math.max(heroEnd, 40));
    }

    // Scrollspy
    let current = sections.length ? sections[0].id : '';
    sections.forEach((s) => {
      if (y + 140 >= s.getBoundingClientRect().top + y) current = s.id;
    });
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = 'contact';

    const target = spyAlias[current] || current;
    navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${target}`));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('load', onScroll);
  onScroll();

  const backToTopBtn = $('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  // ===== 5. PROJECT MODAL =====
  const projectModal = $('projectModal');
  const modalClose = $('modalClose');
  let lastFocus = null;

  function openProjectModal(projectId) {
    const project = projectSource.find((p) => p.id === projectId);
    if (!project || !projectModal) return;

    $('modalMeta').textContent = [project.category, project.year].filter(Boolean).join(' · ');
    $('modalTitle').textContent = project.title;
    $('modalDescription').textContent = project.description || project.summary || '';

    $('modalBullets').innerHTML = (project.bullets && project.bullets.length)
      ? project.bullets.map((b) => `<li>${esc(b)}</li>`).join('')
      : '<li>Built with clean, modular code following industry standards.</li>';

    $('modalTags').innerHTML = (project.tags || []).map((t) => `<span class="tag-badge">${esc(t)}</span>`).join('');

    $('modalLinks').innerHTML = `
      <a href="${esc(project.githubUrl || 'https://github.com/gerardosison')}" target="_blank" rel="noopener" class="btn btn-sm btn-dark w-full">
        Source Code
      </a>`;

    $('modalMockupContent').innerHTML = project.image
      ? `<img src="${esc(project.image)}" alt="${esc(project.title)}" class="modal-mockup-image">`
      : `<div><p class="mock-label">Application Preview</p><p class="mock-title">${esc(project.title)}</p></div>`;

    lastFocus = document.activeElement;
    projectModal.classList.add('is-active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  const modalBackdrop = $('modalBackdrop');
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);


  // ===== 6. PROJECT GALLERY (3D COVERFLOW) =====
  const galleryStage = $('galleryStage');

  if (galleryStage && projectSource.length) {
    const n = projectSource.length;
    let active = 0;
    let suppressClick = false;

    const gInfo = $('galleryInfo');
    const gTitle = $('galleryTitle');
    const gDesc = $('galleryDesc');
    const gTags = $('galleryTags');
    const gOpen = $('galleryOpen');
    const gDots = $('galleryDots');
    const gControls = $('galleryControls');

    galleryStage.innerHTML = projectSource.map((p, i) => `
      <article class="gallery-card" data-index="${i}" tabindex="0" role="button" aria-label="${esc(p.title)}">
        <div class="window-bar"><span></span><span></span><span></span></div>
        ${p.image
          ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" draggable="false">`
          : `<div class="gallery-fallback"><span>${esc(p.category)}</span><strong>${esc(p.title)}</strong></div>`}
      </article>`).join('');

    gDots.innerHTML = projectSource.map((p, i) =>
      `<button type="button" class="gallery-dot" data-dot="${i}" aria-label="Show ${esc(p.title)}"></button>`
    ).join('');

    const cards = [...galleryStage.querySelectorAll('.gallery-card')];
    const dots = [...gDots.querySelectorAll('.gallery-dot')];

    if (n < 2) gControls.style.display = 'none';

    // Shortest circular distance from the active card
    function offsetOf(i) {
      if (n === 1) return 0;
      let o = (((i - active) % n) + n) % n;
      if (o > n / 2) o -= n;
      return o;
    }

    function update() {
      cards.forEach((card, i) => {
        const o = offsetOf(i);
        const abs = Math.abs(o);
        card.style.setProperty('--o', o);
        card.style.setProperty('--abs', abs);
        card.style.zIndex = 10 - abs;
        card.classList.toggle('is-active', o === 0);
        card.classList.toggle('is-hidden', abs > 2);
      });
      dots.forEach((d, i) => d.classList.toggle('is-active', i === active));

      const p = projectSource[active];
      gTitle.textContent = p.title;
      gDesc.textContent = p.summary || '';
      gTags.innerHTML = (p.tags || []).slice(0, 4).map((t) => `<span class="tag-badge">${esc(t)}</span>`).join('');

      gInfo.classList.remove('is-swapping');
      void gInfo.offsetWidth; // restart fade animation
      gInfo.classList.add('is-swapping');
    }

    function go(i) {
      active = ((i % n) + n) % n;
      update();
    }

    cards.forEach((card, i) => {
      const activate = () => (i === active ? openProjectModal(projectSource[i].id) : go(i));
      card.addEventListener('click', () => { if (!suppressClick) activate(); });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        if (e.key === 'ArrowRight') go(active + 1);
        if (e.key === 'ArrowLeft') go(active - 1);
      });
    });

    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    $('galleryPrev').addEventListener('click', () => go(active - 1));
    $('galleryNext').addEventListener('click', () => go(active + 1));
    gOpen.addEventListener('click', () => openProjectModal(projectSource[active].id));

    // Swipe / drag
    let startX = null;
    galleryStage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    galleryStage.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (n > 1 && Math.abs(dx) > 50) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 50);
        go(active + (dx < 0 ? 1 : -1));
      }
    });
    galleryStage.addEventListener('pointercancel', () => { startX = null; });

    update();
  }


    // ===== 7. CERTIFICATIONS & LIGHTBOX =====
    const CERT_PREVIEW_LIMIT = 3;
    const certShelf = $('certShelf');
    const certGridAll = $('certGridAll');
    const certLightbox = $('certLightbox');
    const certLightboxImg = $('certLightboxImg');
    const certLightboxClose = document.querySelector('.cert-lightbox-close');

    function renderCertCard(cert) {
      return `
        <article class="cert-card">
          <button type="button" class="cert-card-img" data-full="${esc(cert.img)}" aria-label="Preview ${esc(cert.title)}">
            <img src="${esc(cert.img)}" alt="${esc(cert.title)}" loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/600x420/18181b/ffffff?text=CERT'">
            <span class="cert-card-zoom">Preview</span>
          </button>
          <div class="cert-card-body">
            <p class="cert-card-date">${esc(cert.date)}</p>
            <h3 class="cert-card-title">${esc(cert.title)}</h3>
            <p class="cert-card-issuer">${esc(cert.issuer)}</p>
            ${cert.credentialId ? `<p class="cert-card-id">ID: ${esc(cert.credentialId)}</p>` : ''}
            ${cert.pdf ? `<a href="${esc(cert.pdf)}" target="_blank" rel="noopener" class="btn-text cert-card-pdf">VIEW PDF</a>` : ''}
          </div>
        </article>`;
    }

    const emptyCerts = '<p class="section-hint">Certificates coming soon.</p>';
    if (certShelf) {
      certShelf.innerHTML = certSource.length
        ? certSource.slice(0, CERT_PREVIEW_LIMIT).map(renderCertCard).join('')
        : emptyCerts;
    }
    if (certGridAll) {
      certGridAll.innerHTML = certSource.length ? certSource.map(renderCertCard).join('') : emptyCerts;
    }

    // One delegated handler covers both grids
    [certShelf, certGridAll].forEach((grid) => {
      if (!grid) return;
      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.cert-card-img');
        if (!btn) return;
        certLightboxImg.src = btn.dataset.full;
        certLightbox.classList.add('is-active');
        certLightbox.setAttribute('aria-hidden', 'false');
      });
    });

    function closeCertLightbox() {
      if (!certLightbox) return;
      certLightbox.classList.remove('is-active');
      certLightbox.setAttribute('aria-hidden', 'true');
      certLightboxImg.src = '';
    }

    if (certLightboxClose) certLightboxClose.addEventListener('click', closeCertLightbox);
    if (certLightbox) {
      certLightbox.addEventListener('click', (e) => { if (e.target === certLightbox) closeCertLightbox(); });
    }

  // ===== 8. GLOBAL ESCAPE KEY =====
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (projectModal && projectModal.classList.contains('is-active')) closeProjectModal();
    if (certLightbox && certLightbox.classList.contains('is-active')) closeCertLightbox();
    if (mobileMenu && mobileMenu.classList.contains('is-open')) setMobileMenu(false);
  });


  // ===== 9. TOOLS & TECHNOLOGIES (MARQUEE / STATIC TOGGLE) =====
  let techStaticView = false;

  function renderTechPill(item) {
    const icon = item.icon
      ? `<i class="${esc(item.icon)} tech-pill-icon" aria-hidden="true"></i>`
      : `<span class="tech-pill-icon tech-pill-icon-fallback" aria-hidden="true">${esc(item.name.charAt(0))}</span>`;
    return `<span class="tech-pill">${icon}<span>${esc(item.name)}</span></span>`;
  }

  function renderTechStatic(category) {
    return `
      <div class="tech-category-block">
        <h3 class="tech-category-heading">${esc(category.heading)}</h3>
        <div class="tech-pills-row">${category.items.map(renderTechPill).join('')}</div>
      </div>`;
  }

  function renderTechMarquee(category, index) {
    // Repeat short lists so one half always overflows the container
    const reps = Math.max(1, Math.ceil(12 / category.items.length));
    const half = Array(reps).fill(category.items.map(renderTechPill).join('')).join('');
    const direction = index % 2 === 0 ? 'marquee-left' : 'marquee-right';
    const duration = category.speed || 28;
    return `
      <div class="tech-category-block">
        <h3 class="tech-category-heading">${esc(category.heading)}</h3>
        <div class="tech-marquee">
          <div class="tech-marquee-track ${direction}" style="animation-duration: ${duration}s;">
            <div class="tech-half">${half}</div>
            <div class="tech-half tech-dup" aria-hidden="true">${half}</div>
          </div>
        </div>
      </div>`;
  }

  function mountTechStack() {
    const mount = $('techStackContainer');
    const toggleBtn = $('techViewToggle');
    if (!mount) return;

    mount.innerHTML = techStaticView
      ? techSource.map(renderTechStatic).join('')
      : techSource.map(renderTechMarquee).join('');

    if (toggleBtn) toggleBtn.textContent = techStaticView ? 'Show scrolling' : 'View all';
  }

  mountTechStack();

  const techToggleBtn = $('techViewToggle');
  if (techToggleBtn) {
    techToggleBtn.addEventListener('click', () => {
      techStaticView = !techStaticView;
      mountTechStack();
    });
  }


  // ===== 10. CONTACT FORM (opens the visitor's email app, pre-filled) =====
  const contactForm = $('contactForm');
  const formStatus = $('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      const message = contactForm.elements.message.value.trim();

      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:gerardosison321@gmail.com?subject=${subject}&body=${body}`;

      formStatus.textContent = 'Opening your email app…';
      contactForm.reset();
      setTimeout(() => { formStatus.textContent = ''; }, 5000);
    });
  }

    // ===== 11. ABOUT PHOTO STACK (click to bring to front) =====
  const aboutPhotos = [...document.querySelectorAll('.about-photos .about-photo')];
  const POS = ['about-photo-left', 'about-photo-center', 'about-photo-right'];

  if (aboutPhotos.length === 3) {
    const posOf = (el) => POS.find((c) => el.classList.contains(c));

    function bringToFront(photo) {
      if (photo.classList.contains('about-photo-center')) return;
      const goingLeft = photo.classList.contains('about-photo-right');
      // Compute the next slot for each photo
      const next = { 'about-photo-left': 'about-photo-center', 'about-photo-center': 'about-photo-right', 'about-photo-right': 'about-photo-left' };
      const prev = { 'about-photo-left': 'about-photo-right', 'about-photo-center': 'about-photo-left', 'about-photo-right': 'about-photo-center' };
      const map = goingLeft ? prev : next;
      aboutPhotos.forEach((p) => p.classList.replace(posOf(p), map[posOf(p)]));
    }

    aboutPhotos.forEach((photo) => {
      photo.setAttribute('tabindex', '0');
      photo.setAttribute('role', 'button');
      photo.addEventListener('click', () => bringToFront(photo));
      photo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          bringToFront(photo);
        }
      });
    });
  }

    // ===== 12. ROUTER + LIST PAGES =====
  const heroView = $('hero');
  const mainView = document.querySelector('main.content');
  const allView = $('allProjectsView');
  const experienceView = $('experienceView');
  const projectGrid = $('projectGrid');

  // Show/hide without depending on any CSS rule
  const setVisible = (el, visible) => {
    if (!el) return;
    el.hidden = !visible;
    el.style.display = visible ? '' : 'none';
  };

  // ---- All Projects grid ----
  if (projectGrid) {
    projectGrid.innerHTML = projectSource.map((p) => `
      <article class="project-card" data-id="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.title)}">
        <div class="project-card-img">
          ${p.image
            ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
            : `<div class="gallery-fallback"><span>${esc(p.category)}</span></div>`}
        </div>
        <div class="project-card-body">
          <p class="project-card-meta">${esc([p.category, p.year].filter(Boolean).join(' · '))}</p>
          <h3 class="project-card-title">${esc(p.title)}</h3>
          <p class="project-card-desc">${esc(p.summary)}</p>
          <div class="gallery-tags project-card-tags">
            ${(p.tags || []).slice(0, 4).map((t) => `<span class="tag-badge">${esc(t)}</span>`).join('')}
          </div>
        </div>
      </article>`).join('');

    projectGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) openProjectModal(card.dataset.id);
    });
    projectGrid.addEventListener('keydown', (e) => {
      const card = e.target.closest('.project-card');
      if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openProjectModal(card.dataset.id);
      }
    });
  }

    // ---- Experience: simple list on home, timeline with logos on the details page ----
  const expSource = (typeof EXPERIENCE !== 'undefined' && Array.isArray(EXPERIENCE)) ? EXPERIENCE : [];

  const renderExp = (x) => `
    <div class="timeline-item">
      <div class="timeline-date">${esc(x.date)}</div>
      <div class="timeline-body">
        <h4 class="timeline-title">${esc(x.title)}</h4>
        <p class="timeline-company">${esc(x.org)}</p>
      </div>
    </div>`;

  const renderExpDetail = (x) => {
    const isCurrent = /present/i.test(x.date);
    const bullets = (x.bullets && x.bullets.length)
      ? `<ul class="timeline-bullets">${x.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`
      : '';
    return `
      <div class="exp-item">
        <div class="exp-rail"><span class="exp-dot${isCurrent ? '' : ' is-past'}"></span></div>
        <span class="exp-logo${x.logo ? '' : ' no-img'}">
          ${x.logo ? `<img src="${esc(x.logo)}" alt="${esc(x.org)} logo" loading="lazy" onerror="this.parentElement.classList.add('no-img');this.remove()">` : ''}
          <span class="exp-logo-fallback" aria-hidden="true">${esc(x.short || x.org.charAt(0))}</span>
        </span>
        <div class="exp-body">
          <p class="exp-date">${esc(x.date)}</p>
          <h3 class="exp-title">${esc(x.title)}</h3>
          <p class="exp-org">${esc(x.org)}</p>
          ${bullets}
        </div>
      </div>`;
  };

  const expList = $('experienceList');
  const expDetails = $('experienceDetails');
  if (expList) expList.innerHTML = expSource.map(renderExp).join('');
  if (expDetails) expDetails.innerHTML = expSource.map(renderExpDetail).join('');
  
  // ---- Events: home preview (3 latest, each row links to events.html) ----
  const eventSource = (typeof EVENTS !== 'undefined' && Array.isArray(EVENTS)) ? EVENTS : [];
  const eventLabel = (t) => (typeof EVENT_LABELS !== 'undefined' && EVENT_LABELS[t])
    || (t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Event');

  const eventPreview = $('eventPreview');
  if (eventPreview) {
    eventPreview.innerHTML = eventSource.length
      ? eventSource.slice(0, 3).map((ev) => `
        <a class="timeline-item event-link" href="events.html#ev-${esc(ev.id)}">
          <div class="timeline-date">${esc(ev.date)}</div>
          <div class="timeline-body">
            <h3 class="timeline-title">${esc(ev.title)}</h3>
            <p class="timeline-company">${esc([eventLabel(ev.type), ev.role, ev.org].filter(Boolean).join(' · '))}</p>
          </div>
        </a>`).join('')
      : '<p class="section-hint">Events coming soon.</p>';
  }

    // ---- Events: scrolling photo wall (click = open viewer) ----
  const eventsLayout = $('eventsLayout');
  const wallEl = $('eventWall');
  const wallPhotos = (
    (typeof EVENT_STACK !== 'undefined' && EVENT_STACK.length)
      ? EVENT_STACK
      : eventSource.flatMap((ev) => ev.photos || [])
  ).slice(0, 30);

  if (wallEl && wallPhotos.length) {
    // Two columns: even photos in one, odd photos in the other
    const items = wallPhotos.map((src, index) => ({ src, index }));
    const columns = [
      items.filter((_, i) => i % 2 === 0),
      items.filter((_, i) => i % 2 === 1)
    ].filter((c) => c.length);

    const tile = (it, isDup) => `
      <button type="button" class="wall-photo" data-index="${it.index}"${isDup ? ' tabindex="-1" aria-hidden="true"' : ` aria-label="Open event photo ${it.index + 1}"`}>
        <img src="${esc(it.src)}" alt="" decoding="async" draggable="false" onerror="this.closest('.wall-photo').remove()">
      </button>`;

    wallEl.innerHTML = columns.map((col, ci) => {
      let base = col;
      while (base.length < 4) base = base.concat(col); // short lists: repeat so the loop looks full
      const seconds = Math.max(24, base.length * 6);
      return `
        <div class="wall-col">
          <div class="wall-track ${ci % 2 === 0 ? 'wall-up' : 'wall-down'}" style="animation-duration:${seconds}s">
            ${base.map((it) => tile(it, false)).join('')}
            ${base.map((it) => tile(it, true)).join('')}
          </div>
        </div>`;
    }).join('');

    // Photo viewer
    const plBox = $('photoLightbox');
    const plImg = $('plImg');
    const plPrev = $('plPrev');
    const plNext = $('plNext');
    const plCount = $('plCount');
    let plIndex = 0;

    if (plBox) {
      const plShow = () => {
        const multi = wallPhotos.length > 1;
        plImg.src = wallPhotos[plIndex];
        plImg.alt = `Event photo ${plIndex + 1} of ${wallPhotos.length}`;
        plCount.textContent = multi ? `${plIndex + 1} / ${wallPhotos.length}` : '';
        plPrev.style.display = plNext.style.display = multi ? '' : 'none';
      };
      const plOpen = (i) => {
        plIndex = i;
        plShow();
        plBox.classList.add('is-active');
        plBox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };
      const plClose = () => {
        plBox.classList.remove('is-active');
        plBox.setAttribute('aria-hidden', 'true');
        plImg.src = '';
        document.body.style.overflow = '';
      };
      const plStep = (d) => {
        plIndex = (plIndex + d + wallPhotos.length) % wallPhotos.length;
        plShow();
      };

      wallEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.wall-photo');
        if (btn) plOpen(Number(btn.dataset.index));
      });
      $('plClose').addEventListener('click', plClose);
      plPrev.addEventListener('click', () => plStep(-1));
      plNext.addEventListener('click', () => plStep(1));
      plBox.addEventListener('click', (e) => { if (e.target === plBox) plClose(); });

      document.addEventListener('keydown', (e) => {
        if (!plBox.classList.contains('is-active')) return;
        if (e.key === 'Escape') plClose();
        if (e.key === 'ArrowLeft') plStep(-1);
        if (e.key === 'ArrowRight') plStep(1);
      });
    }
  } else {
    // No photos yet: hide the wall and let the list use the full width
    if (wallEl) wallEl.remove();
    if (eventsLayout) eventsLayout.classList.add('no-stack');
  }

  // ---- Router ----
  const BASE_TITLE = document.title;
  const ROUTES = {
    '#/projects': { view: allView, title: 'All Projects — Gerardo Sison' },
    '#/experience': { view: experienceView, title: 'Experience & Leadership — Gerardo Sison' },
    '#/certifications': { view: $('certificationsView'), title: 'Certifications — Gerardo Sison' }
  };
  let wasPage = false;

  function route() {
    const current = ROUTES[location.hash] || null;
    const isPage = Boolean(current);

    document.body.classList.toggle('view-all', isPage);
    setVisible(heroView, !isPage);
    setVisible(mainView, !isPage);
    Object.values(ROUTES).forEach((r) => setVisible(r.view, r === current));

    if (isPage) {
      document.title = current.title;
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.title = BASE_TITLE;
      // Returning from a page: jump to the section manually (it was hidden)
      if (wasPage) {
        const target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: 'instant' });
        else window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    wasPage = isPage;
    onScroll();
  }

  window.addEventListener('hashchange', route);
  route();
});
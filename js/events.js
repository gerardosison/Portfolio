document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  // ===== Footer year =====
  if ($('currentYear')) $('currentYear').textContent = new Date().getFullYear();

  // ===== Theme (same logic as script.js) =====
  const root = document.documentElement;
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  root.setAttribute('data-theme', store.get('theme') || (darkQuery.matches ? 'dark' : 'light'));

  $('themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
  });

  // ===== Mobile menu =====
  const mobileToggle = $('mobileToggle');
  const mobileMenu = $('mobileMenu');

  function setMobileMenu(open) {
    mobileMenu.classList.toggle('is-open', open);
    mobileToggle.classList.toggle('is-active', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
  }

  mobileToggle.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('is-open')));
  document.querySelectorAll('.mobile-link').forEach((l) => l.addEventListener('click', () => setMobileMenu(false)));
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('is-open') && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      setMobileMenu(false);
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) setMobileMenu(false); });

  // ===== Events data =====
  const events = (typeof EVENTS !== 'undefined' && Array.isArray(EVENTS)) ? EVENTS : [];
  const eventLabel = (t) => (typeof EVENT_LABELS !== 'undefined' && EVENT_LABELS[t])
    || (t ? t.charAt(0).toUpperCase() + t.slice(1) : 'Event');

  const pinIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';

  function renderEvent(ev) {
    const photos = ev.photos || [];
    const highlights = ev.highlights || [];
    const tags = ev.tags || [];
    const meta = [eventLabel(ev.type), ev.role, ev.org].filter(Boolean).join(' · ');

    return `
      <article class="timeline-item ev-row" id="ev-${esc(ev.id)}">
        <div class="timeline-date">${esc(ev.date)}</div>
        <div class="timeline-body">
          <h2 class="timeline-title">${esc(ev.title)}</h2>
          <p class="timeline-company">${esc(meta)}</p>
          ${ev.place ? `<p class="ev-place">${pinIcon}<span>${esc(ev.place)}</span></p>` : ''}
          <p class="ev-desc">${esc(ev.description)}</p>
          ${highlights.length ? `<ul class="timeline-bullets">${highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}
          ${tags.length ? `<p class="ev-tags-text">${tags.map(esc).join(' · ')}</p>` : ''}
          ${photos.length ? `
            <div class="ev-gallery">
              ${photos.map((src) => `
                <button type="button" class="ev-photo" data-full="${esc(src)}" aria-label="View photo from ${esc(ev.title)}">
                  <img src="${esc(src)}" alt="${esc(ev.title)}" loading="lazy" onerror="this.closest('.ev-photo').remove()">
                </button>`).join('')}
            </div>` : ''}
        </div>
      </article>`;
  }

  // ===== Filters =====
  const eventFilters = $('eventFilters');
  const eventList = $('eventList');
  const eventCount = $('eventCount');
  let activeFilter = 'all';

  function render() {
    const types = [...new Set(events.map((e) => e.type).filter(Boolean))];
    eventFilters.innerHTML = ['all', ...types].map((t) =>
      `<button type="button" class="filter-chip${t === activeFilter ? ' is-active' : ''}" data-filter="${esc(t)}">${t === 'all' ? 'All' : esc(eventLabel(t))}</button>`
    ).join('');

    const list = activeFilter === 'all' ? events : events.filter((e) => e.type === activeFilter);
    eventList.innerHTML = list.length ? list.map(renderEvent).join('') : '<p class="section-hint">No events here yet.</p>';
    eventCount.textContent = `${list.length} event${list.length === 1 ? '' : 's'}`;
  }

  eventFilters.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    activeFilter = chip.dataset.filter;
    render();
  });

  render();

  // Jump to a specific event when opened from the home page (events.html#ev-<id>)
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }

  // ===== Photo lightbox (arrows + keyboard) =====
  const lightbox = $('lightbox');
  const lbImg = $('lbImg');
  const lbPrev = $('lbPrev');
  const lbNext = $('lbNext');
  const lbCount = $('lbCount');
  let lbSet = [];
  let lbIndex = 0;

  function showPhoto() {
    const item = lbSet[lbIndex];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    const multi = lbSet.length > 1;
    lbPrev.style.display = lbNext.style.display = multi ? '' : 'none';
    lbCount.textContent = multi ? `${lbIndex + 1} / ${lbSet.length}` : '';
  }

  function openLightbox(set, index) {
    lbSet = set;
    lbIndex = index;
    showPhoto();
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  function step(dir) {
    if (lbSet.length < 2) return;
    lbIndex = (lbIndex + dir + lbSet.length) % lbSet.length;
    showPhoto();
  }

  eventList.addEventListener('click', (e) => {
    const btn = e.target.closest('.ev-photo');
    if (!btn) return;
    const buttons = [...btn.closest('.ev-card').querySelectorAll('.ev-photo')];
    const set = buttons.map((b) => ({ src: b.dataset.full, alt: b.querySelector('img').alt }));
    openLightbox(set, buttons.indexOf(btn));
  });

  $('lbClose').addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('is-active')) closeLightbox();
      else if (mobileMenu.classList.contains('is-open')) setMobileMenu(false);
    }
    if (lightbox.classList.contains('is-active')) {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    }
  });

    // ===== Photo collage wall (moves horizontally) =====
  const evWall = $('evWall');
  const wallSrc = (typeof EVENT_STACK !== 'undefined' && EVENT_STACK.length)
    ? EVENT_STACK
    : events.flatMap((ev) => ev.photos || []);

  if (evWall && wallSrc.length) {
    const TILES = 8; 
    const blocks = Math.max(1, Math.ceil(wallSrc.length / TILES));

    const tile = (idx, isDup) => `
      <button type="button" class="ev-wall-photo" data-index="${idx}"${isDup ? ' tabindex="-1"' : ` aria-label="Open event photo ${idx + 1}"`}>
        <img src="${esc(wallSrc[idx])}" alt="" decoding="async" draggable="false" onerror="this.remove()">
      </button>`;

    // One half = all blocks; the second half is a copy so the loop is seamless
    const half = (isDup) => Array.from({ length: blocks }, (_, b) => `
      <div class="ev-wall-set${isDup ? ' is-dup' : ''}"${isDup ? ' aria-hidden="true"' : ''}>
        ${Array.from({ length: TILES }, (_, t) => tile((b * TILES + t) % wallSrc.length, isDup)).join('')}
      </div>`).join('');

    evWall.innerHTML = `
      <div class="ev-wall-track" style="animation-duration:${blocks * 14}s">
        ${half(false)}${half(true)}
      </div>`;

    // Click a tile: open the viewer on all photos (arrows + keyboard)
    const wallSet = wallSrc.map((src, i) => ({ src, alt: `Event photo ${i + 1} of ${wallSrc.length}` }));
    evWall.addEventListener('click', (e) => {
      const btn = e.target.closest('.ev-wall-photo');
      if (btn) openLightbox(wallSet, Number(btn.dataset.index));
    });
  } else if (evWall) {
    evWall.remove();
  }

});
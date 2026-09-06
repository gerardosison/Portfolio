/**
 * Gerardo Sison — Portfolio Content Data
 * -----------------------------------------------------------------
 * Single source of truth for every project and certification shown
 * on the site. Edit an entry here and it updates everywhere that
 * project/cert appears (spotlight card, summary grid, full projects
 * page, the expand modal, and the certification bookshelf).
 *
 * You should NOT need to touch index.html or script.js to:
 *   - add/remove a project or certification
 *   - change a title, description, tags, links, or year
 *   - reorder which project is "featured" (shown in the spotlight)
 * -----------------------------------------------------------------
 */

// ===== ICONS =====
// Inner <svg> markup only (no outer <svg> tag) so render helpers can
// wrap them with consistent sizing/attributes.
const ICONS = {
  ai: `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>`,
  devtool: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>`,
  shop: `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
  doc: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
  award: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  expand: `<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>`
};

function svgIcon(name, { width = 18, height = 18 } = {}) {
  return `<svg viewBox="0 0 24 24" width="${width}" height="${height}" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[name] || ''}</svg>`;
}

// ===== PROJECTS =====
// `featured: true` marks the project shown large in the home-page
// spotlight. It will still also appear in the summary + full grids,
// matching the original layout.
const PROJECTS = [
  {
    id: 'project-1',
    featured: true,
    title: 'AI Study Assistant Platform',
    category: 'Full-Stack Application',
    year: '2025',
    calloutBadge: '#1 AI STUDY TOOL',
    icon: 'ai',
    tags: ['Next.js', 'React', 'Gemini API', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    summary: 'Intelligent student workspace for lecture parsing, summaries & flashcard generation.',
    description: 'An intelligent academic workspace built for university students to process lecture notes, generate structured concept summaries, and automatically formulate practice recall quizzes.',
    bullets: [
      'Integrated Google Gemini API for fast contextual question generation.',
      'Engineered responsive document parsing pipeline with client-side OCR caching.',
      'Designed minimal, distraction-free aesthetic with dark mode and export to Anki.'
    ],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/gerardosison'
  },
  {
    id: 'project-2',
    featured: false,
    title: 'DevFlow Task Manager',
    category: 'Web Application',
    year: '2025',
    icon: 'devtool',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Express', 'Docker'],
    summary: 'Zero-latency Kanban sprint planner designed specifically for indie hackers & dev teams.',
    description: 'A lightweight, high-performance task management system engineered specifically for solo engineers and sprint teams. Focuses on zero-latency interactions and clean Kanban workflows.',
    bullets: [
      'Built with PostgreSQL and Prisma ORM for relational sprint dependencies.',
      'Implemented keyboard shortcuts and drag-and-drop board cards.',
      'Achieved sub-100ms API response latency with Edge endpoints.'
    ],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/gerardosison'
  },
  {
    id: 'project-3',
    featured: false,
    title: 'Apparel Storefront',
    category: 'E-Commerce Architecture',
    year: '2024',
    icon: 'shop',
    tags: ['Next.js', 'Stripe API', 'Tailwind CSS', 'Zustand', 'PostgreSQL'],
    summary: 'Headless e-commerce platform with real-time cart persistence & Stripe Checkout integration.',
    description: 'A headless e-commerce experience engineered for speed and visual storytelling. Features instant cart synchronization, localized currency switches, and Stripe Checkout.',
    bullets: [
      'Optimized Next.js dynamic routing and image rendering.',
      'Full Stripe Payment Intents and webhook synchronization.',
      'Lighthouse performance score 99/100 across mobile and desktop.'
    ],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/gerardosison'
  }
];

// ===== CERTIFICATIONS =====
// NOTE: `img`/`pdf` below point at per-cert filenames (postman.png,
// meta.png, etc.) that don't exist in your images/certificates
// folder yet — only acm.png / Certificate_ACM.pdf do. Add the real
// files with these names, or edit the paths to match what you have.
const CERTS = [
  {
    id: 'postman',
    label: 'Postman Student Expert',
    icon: 'doc',
    highlight: false,
    openByDefault: false,
    pills: [{ text: 'POSTMAN', dark: true }, { text: 'STUDENT EXPERT', dark: false }],
    title: 'Postman Student Expert',
    issuer: 'Postman API Platform',
    desc: 'Certification demonstrating proficiency in API testing, documentation, and collaboration using Postman.',
    year: '2025',
    img: 'images/certificates/postman.png',
    pdf: 'images/certificates/Certificate_Postman.pdf'
  },
  {
    id: 'acm',
    label: 'ACM TechSprint Certificate',
    icon: 'award',
    highlight: true,
    openByDefault: false,
    pills: [{ text: 'ACM TECHSPRINT', dark: true }, { text: 'ASTERIA 2025', dark: false }],
    title: 'ACM TechSprint Certificate',
    issuer: 'Far Eastern University – Technology',
    desc: 'Certificate of achievement and participation in the ACM TechSprint: Asteria Hackathon.',
    year: '2025',
    img: 'images/certificates/acm.png',
    pdf: 'images/certificates/Certificate_ACM.pdf'
  },
  {
    id: 'meta',
    label: 'Meta Front-End Developer',
    icon: 'doc',
    highlight: false,
    openByDefault: true,
    pills: [{ text: 'COURSERA', dark: false }, { text: 'META', dark: false }],
    title: 'Meta Front-End Developer',
    issuer: 'Coursera / Meta',
    desc: 'Professional certification covering React, responsive design, UI testing, and version control.',
    year: '2025',
    img: 'images/certificates/meta.png',
    pdf: 'images/certificates/Certificate_Meta.pdf'
  }
];
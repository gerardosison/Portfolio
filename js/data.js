// ===== ICONS =====
const ICONS = {
  ai: `<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>`,
  devtool: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>`,
  shop: `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
  doc: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
  award: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  expand: `<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>`,
  building: `<path d="M6 21V7l6-4 6 4v14"/><path d="M3 21h18"/><path d="M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1"/>`
};

function svgIcon(name, { width = 18, height = 18 } = {}) {
  return `<svg viewBox="0 0 24 24" width="${width}" height="${height}" fill="none" stroke="currentColor" stroke-width="1.8">${ICONS[name] || ''}</svg>`;
}

// ===== PROJECTS =====
const PROJECTS = [
  {
    id: 'project-1',
    featured: true,
    accent: '#2563eb',
    image: 'images/projects/DormEase.png',
    title: 'DormEase — Dormitory Management System',
    category: 'Academic Project',
    year: '2026',
    icon: 'building',
    tags: ['Java', 'Spring Boot', 'MySQL', 'Java Swing'],
    summary: 'Dormitory and boarding house management system migrating from a Java Swing prototype to a Spring Boot and MySQL platform.',
    description: 'DormEase is a dormitory and boarding house management system built to handle real operational needs rather than acting as a simple CRUD app, covering tenant records, room assignments, billing, and facility management. The initial version was built with Java Swing using flat text files as storage, with the team planning a migration to Java Spring Boot and MySQL for a more scalable, production ready architecture.',
    bullets: [
      'Collaborated with a 5 member team across a 15 week development cycle to design and scope the full system.',
      'Helped plan the migration path from a Java Swing and text file prototype to a Spring Boot and MySQL architecture.',
      'Contributed to project costing and planning, keeping the system within a zero peso software licensing budget by relying on free and open source tools.'
    ],
    githubUrl: 'https://github.com/gerardosison/DormEase'
  },
];

// ===== CERTIFICATIONS =====
const CERTS = [
  {
    id: 'acm',
    date: 'July 2026',
    title: 'ACM TechSprint Certificate',
    issuer: 'Far Eastern University Technology',
    credentialId: null,
    img: 'images/certificates/acm.png',
    pdf: 'images/certificates/Certificate_ACM.pdf'
  }
];

// ===== TECH STACK =====
const TECH_STACK = [
  {
    heading: 'Frontend & Backend Development',
    speed: 32,
    items: [
      { name: 'Java', icon: 'devicon-java-plain colored' },
      { name: 'C', icon: 'devicon-c-plain colored' },
      { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
      { name: 'Dart', icon: 'devicon-dart-plain colored' },
      { name: 'Flutter', icon: 'devicon-flutter-plain colored' },
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express.js', icon: 'devicon-express-original' },
      { name: 'React.js', icon: 'devicon-react-original colored' }
    ]
  },
  {
    heading: 'Cloud, BaaS, Database & CI/CD Management',
    speed: 18,
    items: [
      { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
      { name: 'MySQL Workbench', icon: 'devicon-mysql-plain colored' },
      { name: 'Oracle SQL', icon: 'devicon-oracle-original colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', icon: 'devicon-github-original' }
    ]
  },
  {
    heading: 'Code Editors & IDEs',
    speed: 22,
    items: [
      { name: 'Visual Studio Code', icon: 'devicon-vscode-plain colored' },
      { name: 'Android Studio', icon: 'devicon-androidstudio-plain colored' },
      { name: 'Arduino IDE', icon: 'devicon-arduino-plain colored' },
      { name: 'Code::Blocks', icon: null },
      { name: 'PyCharm', icon: 'devicon-pycharm-plain colored' },
      { name: 'Codespaces', icon: 'devicon-github-original' },
      { name: 'Google Colab', icon: null }
    ]
  },
  {
    heading: 'Project Management & Designing',
    speed: 12,
    items: [
      { name: 'ClickUp', icon: null },
      { name: 'Microsoft 365', icon: null },
      { name: 'Figma', icon: 'devicon-figma-plain colored' }
    ]
  }
];
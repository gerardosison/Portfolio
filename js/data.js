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

// ===== EXPERIENCE =====
const EXPERIENCE = [
  {
    id: 'aws-sbg',
    date: 'Sep 2026 — Present',
    title: 'Software Engineering Associate',
    org: 'AWS Student Builder Group · Technological University of the Philippines – Manila',
    short: 'AWS',
    logo: 'images/logo/aws.jpg',
    bullets: []
  },
  {
    id: 'gdgoc-cfo',
    date: 'Aug 2026 — Present',
    title: 'Chief Finance Officer',
    org: 'Google Developer Groups on Campus · TUP Manila',
    short: 'GDG',
    logo: 'images/logo/gdg.jpg',
    bullets: []
  },
  {
    id: 'qa-oneplus',
    date: "Mar 2026 — Aug '26",
    title: 'Quality Assurance Analyst',
    org: 'One Plus Solutions, Inc',
    short: 'OPS',
    logo: 'images/logo/oneplus.jpg',
    bullets: [
      'Executed detailed functional and regression testing across core software systems to identify, document, and isolate critical bugs.',
      'Logged and tracked issues with reproducible steps in issue-tracking systems to streamline developer fixes and boost release stability.'
    ]
  },
  {
    id: 'gdgoc-auditor',
    date: "Aug 2025 — Aug '26",
    title: 'Finance Auditor',
    org: 'Google Developer Groups on Campus · TUP Manila',
    short: 'GDG',
    logo: 'images/logo/gdg1.jpg',
    bullets: []
  }
];

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
  {
    id: 'project-2',
    image: 'images/projects/UlamBotohan.png',
    title: 'UlamBotohan: Family Meal Voting App',
    category: 'Academic Project',
    year: '2026',
    tags: ['Flutter', 'Node.js', 'Express.js', 'MySQL'],
    summary: 'Mobile app that helps Filipino families fairly and confidentially choose an ulam using Borda Count ranked voting.',
    description: 'UlamBotohan helps Filipino families reach a fair, confidential decision on what ulam to prepare or order. Each member privately ranks all candidates, and the backend scores them with the Borda Count method (top of n choices gets n − 1 points, down to 0). When the session closes, only the winning ulam and a ranking summary are revealed, never individual rankings. Built with Flutter, Node.js, and MySQL in a three-tier client-server architecture.',
    bullets: [
      'Private ranked voting with automatic Borda Count scoring and one vote per member.',
      'Family groups via family code, with household roles and session timeouts.',
      'Results page and anonymized voting history, backed by a 13-table MySQL database.',
      'Developed with Aldred C. Mique, Jovielyn Eguillos, and Lianne Princess P. Lerios.'
    ],
    githubUrl: 'https://github.com/gerardosison/UlamBotohan'
  },
  {
    id: 'project-3',
    image: 'images/projects/HappyTravelApp.png',
    title: 'Happy Travel (HAT) Airline Reservation System',
    category: 'Academic Project',
    year: '2026',
    tags: ['Java', 'Swing', 'PostgreSQL', 'JDBC'],
    summary: 'A Java Swing airline reservation and flight management system for passenger bookings, flight information, and airline operations.',
    description: 'Happy Travel (HAT) is a desktop-based airline reservation system developed for Information Management. It supports passenger and staff access, flight searching, online and over-the-counter reservations, seat management, ticket generation, and transaction reporting.',
    bullets: [
      'Developed the Java Swing user interface and reservation workflow.',
      'Integrated PostgreSQL using JDBC for flight, passenger, reservation, and transaction data.',
      'Implemented flight management, seat availability, ticket generation, and reporting features.'
    ],
    githubUrl: 'https://github.com/gerardosison/Happy-Travel-HAT-Project'
  }
];

// ===== CERTIFICATIONS =====
const CERTS = [
  {
    id: 'aws-sbg-appointment',
    date: 'September 2026',
    title: 'Certificate of Appointment: Software Engineering Associate',
    issuer: 'AWS Student Builder Group · TUP Manila',
    place: 'Technological University of the Philippines – Manila',
    credentialId: null,
    description: 'Officially appointed as Software Engineering Associate of the AWS Student Builder Group at the Technological University of the Philippines – Manila. Given on September 26, 2026.',
    tags: ['AWS', 'Leadership', 'Software Engineering'],
    img: 'images/certificates/aws.jpg',
    pdf: 'images/certificates/Certificate_AWS.pdf'
  },
  {
    id: 'ai-ideathon',
    date: 'September 2026',
    title: 'AI Ideathon: Combat Scams with AI',
    issuer: 'COMPILE · iACADEMY Makati',
    place: 'iACADEMY Auditorium, Makati City',
    credentialId: null,
    description: 'Certificate of participation, awarded for active participation, creativity, teamwork, and application of AI during Academics Week 2026: School of Computing Day.',
    tags: ['AI', 'Prototyping', 'Pitching'],
    img: 'images/certificates/iacademy.png',
    pdf: 'images/certificates/Certificate_iAcademy.pdf'
  },
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
    speed: 70,
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
    speed: 55,
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
    speed: 60,
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
    speed: 45,
    items: [
      { name: 'ClickUp', icon: null },
      { name: 'Microsoft 365', icon: null },
      { name: 'Figma', icon: 'devicon-figma-plain colored' }
    ]
  }
];

// ===== EVENTS =====
const EVENT_LABELS = { hackathon: 'Hackathon', ideathon: 'Ideathon', community: 'Community' };

const EVENTS = [
  {
    id: 'ai-ideathon-2026',
    date: 'Sep 2026',
    type: 'ideathon',
    title: 'AI Ideathon: Combat Scams with AI',
    role: 'Participant',
    org: 'COMPILE · iACADEMY Makati',
    place: 'iACADEMY Auditorium, Makati City',
    description: 'Participated in an AI ideathon on combating scams with artificial intelligence, held during Academics Week 2026: School of Computing Day at the iACADEMY Auditorium, Makati City. Recognized for active participation, creativity, teamwork, and application of AI.',
    highlights: [
      'Created a prototype to combat scams and misinformation.',
      'Pitched and presented our solution in front of the audience.'
    ],
    tags: ['AI', 'Prototyping', 'Pitching'],
    photos: [] // e.g. ['images/events/ai-ideathon-2026/1.jpg', 'images/events/ai-ideathon-2026/2.jpg']
  },
  {
    id: 'acm-techsprint-2026',
    date: 'Jun 2026',
    type: 'hackathon',
    title: 'ACM TechSprint',
    role: 'Participant',
    org: 'FEU Institute of Technology',
    place: 'FEU Institute of Technology',
    description: 'Attended and actively participated in ACM TechSprint, where my team built a Flutter app to support student learning.',
    highlights: [
      'Built a Flutter app that helps improve student learning.',
      'Addresses barriers Filipino students face in getting quality education support: limited access to tutors, connectivity constraints, and language differences.'
    ],
    tags: ['Flutter', 'Education', 'Mobile App'],
    photos: []
  },
  {
    id: 'study-jam-2026',
    date: 'Mar 2026',
    type: 'community',
    title: 'Google Study Jam 2026: Dream, Design, Develop!',
    role: 'Finance Auditor',
    org: 'Google Developer Groups on Campus – TUP Manila',
    place: 'WhiteCloak Technologies',
    description: "Spearheaded member engagement during the organization's first-ever off-campus event, across CodeLab activities and a frontend development hackathon.",
    photos: []
  },
  {
    id: 'devcon-2025',
    date: 'Nov 2025',
    type: 'hackathon',
    title: 'Campus DEVCON Manila 2025: Haunted by Innovation',
    role: 'Finance Auditor',
    org: 'Google Developer Groups on Campus – TUP Manila',
    description: 'Facilitated operations for a multi-university tech conference featuring Hackathon and Game Jam finals, in partnership with Gen AI Philippines, CyberPH, and other tech organizations.',
    photos: []
  },
  {
    id: 'in4session-2025',
    date: 'Nov 2025',
    type: 'community',
    title: 'In4Session: Legacy Beyond Google Technologies',
    role: 'Finance Auditor',
    org: 'Google Developer Groups on Campus – TUP Manila',
    description: 'Managed new member onboarding and distributed membership kits (IDs and org merch) to 200+ student "Googlers" for their induction into the GDGoC mission and roadmap.',
    photos: []
  }
];

const EVENT_STACK = [
  'images/events/img3.jpg',
  'images/events/img1.jpg',
  'images/events/img2.jpg',
  'images/events/img4.jpg',
  'images/events/img5.jpg',
  'images/events/img6.jpg',
  'images/events/img7.jpg',
  'images/events/img9.jpg',
  'images/events/img10.jpg',
  'images/events/img11.jpg',
  'images/events/img12.jpg',
  'images/events/img13.jpg',
  'images/events/img14.jpg',
  'images/events/img15.jpg',
  'images/events/img17.jpg',
];
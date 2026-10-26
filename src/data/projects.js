/**
 * Featured and verified projects for Shubham Taware.
 * All project stacks, live links, and descriptions are verified from actual project files,
 * live websites, and Shubham's resume.
 */
export const projects = [
  {
    id: 'rentalchaavi',
    number: '01',
    title: 'RentalChaavi',
    type: 'Real-Estate Rental Platform',
    category: 'Commercial SaaS',
    year: '2024 — 2026',
    summary:
      'Real-estate rental platform featuring dynamic property discovery, interactive listings, verified owner connect, and streamlined rental workflows with responsive design.',
    stack: ['React.js', 'React Native', 'Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Tailwind CSS'],
    accent: '#38bdf8',
    liveUrl: 'https://rentalchaavi.com',
    githubUrl: '',
    image: '/assets/projects/rentalchaavi-home.png',
    secondaryImage: '/assets/projects/rentalchaavi-features.png',
    featured: true,
    badge: 'Live Platform',
    roleContribution:
      'Frontend Developer: Implemented responsive property browsing, dynamic filters, detail modals, and REST API integration.',
  },
  {
    id: 'dealskb',
    number: '02',
    title: 'DealsKB',
    type: 'AutoBid & Live Auction Platform',
    category: 'Auction Marketplace',
    year: '2025 — 2026',
    summary:
      'Multi-product live auction marketplace featuring real-time 30-second bidding countdowns, interactive Leaflet maps, and seamless buyer, seller, and admin workflows.',
    stack: ['React 19', 'Vite', 'TanStack Query', 'Axios', 'Leaflet', 'FastAPI', 'WebSockets', 'MySQL'],
    accent: '#f59e0b',
    liveUrl: 'https://dealskb.com',
    githubUrl: '',
    image: '/assets/projects/dealskb-platform-preview.png',
    fallbackImage: '/assets/projects/dealskb-home.png',
    featured: false,
    badge: 'Live Platform',
    roleContribution:
      'Frontend Developer: Built reactive marketplace UI, live bidding countdowns, WebSocket status listeners, and seller/buyer dashboards.',
  },
  {
    id: 'vahanfinserv',
    number: '03',
    title: 'VahanFinserv',
    type: 'Vehicle Finance Solution',
    category: 'FinTech Platform',
    year: '2025 — 2026',
    summary:
      'Vehicle finance application with dynamic EMI calculators, banking partner integrations, multi-step application forms, and complete document management.',
    stack: ['React.js', 'React Native', 'Java', 'Spring Boot', 'REST APIs', 'Tailwind CSS'],
    accent: '#10b981',
    liveUrl: 'https://vahanfinserv.com',
    githubUrl: '',
    image: '/assets/projects/vahanfinserv-home.png',
    secondaryImage: '/assets/projects/vahanfinserv-calculator.png',
    featured: false,
    badge: 'Live Website',
    roleContribution:
      'Frontend Developer: Crafted responsive vehicle loan forms, EMI calculator widgets, banking partner showcase, and mobile-friendly application flow.',
  },
  {
    id: 'caryanam-live',
    number: '04',
    title: 'Caryanam Live',
    type: 'Live Lecture & Training System',
    category: 'EdTech Platform',
    year: '2026',
    summary:
      'Training and live-lecture system with comprehensive role-based dashboards for students, faculty, and administrators, with automated class scheduling.',
    stack: ['React.js', 'React Native', 'TypeScript', 'Spring Boot', 'REST APIs'],
    accent: '#ff6b2b',
    liveUrl: 'https://caryanamlive.com',
    githubUrl: '',
    image: '/assets/projects/caryanamlive-home.png',
    featured: false,
    badge: 'Live Platform',
    roleContribution:
      'Frontend Engineer: Created multi-role dashboard layouts, student lecture viewer, faculty scheduler, and secure API data synchronization.',
  },
  {
    id: 'caryanam-app',
    number: '05',
    title: 'Caryanam',
    type: 'Enterprise Property System',
    category: 'Enterprise Real Estate',
    year: '2026',
    summary:
      'Enterprise application with responsive property workflows, modular listing components, chat modules, and cross-platform UI architectures.',
    stack: ['React Native', 'Java', 'Spring Boot', 'REST APIs', 'Tailwind CSS'],
    accent: '#ec4899',
    liveUrl: 'https://caryanam.com',
    githubUrl: '',
    image: '/assets/projects/caryanam-home.png',
    featured: false,
    badge: 'Live Website',
    roleContribution:
      'Frontend Developer: Engineered modular UI components, property listing cards, chat modules, and cross-device consistency.',
  },
  {
    id: 'avaaj-mann-ki',
    number: '06',
    title: 'AwajManki',
    type: 'Anonymous Thoughts & Social Feed',
    category: 'Social Platform',
    year: '2025 — 2026',
    summary:
      'Anonymous community platform designed for free expression with AI moderation, multilingual voice-to-text processing, and real-time social feeds.',
    stack: ['React Native', 'React.js', 'REST APIs', 'Voice-to-Text', 'Tailwind CSS'],
    accent: '#f97316',
    liveUrl: 'https://awaazmanki.com/',
    githubUrl: '',
    image: '/assets/projects/awaazmanki-home.png',
    featured: false,
    badge: 'Live Website',
    roleContribution:
      'Frontend Developer: Built responsive web UI, anonymous feed interactions, voice-to-text integration, and multilingual localization.',
  },
];

/**
 * Freelance and independent capability offerings and services.
 */
export const freelanceServices = [
  {
    title: 'Responsive Website Development',
    description:
      'Pixel-perfect, mobile-first websites optimized for fast load times, seamless responsiveness across screens, and strong SEO best practices.',
    tag: 'Websites',
  },
  {
    title: 'React Interface Development',
    description:
      'Dynamic single-page applications and interactive web portals powered by React.js, modern state management, and fluid animations.',
    tag: 'React.js',
  },
  {
    title: 'Mobile Application Interfaces',
    description:
      'Cross-platform mobile app screens and navigation flows using React Native with native-feeling ergonomics and touch optimization.',
    tag: 'React Native',
  },
  {
    title: 'REST API Integration',
    description:
      'Robust asynchronous communication with Spring Boot, FastAPI, or Node backends, handling authentication, caching, error states, and pagination.',
    tag: 'API & Data',
  },
  {
    title: 'Reusable Components & UI Systems',
    description:
      'Clean, maintainable design systems with accessible modular components styled with modern Vanilla CSS or Tailwind CSS.',
    tag: 'Design Systems',
  },
  {
    title: 'Performance & Maintenance',
    description:
      'Auditing and improving Core Web Vitals, optimizing bundle sizes, fixing cross-browser compatibility issues, and continuous feature updates.',
    tag: 'Optimization',
  },
];

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
    category: 'Commercial Live Platform',
    year: '2024 — 2026',
    summary:
      'Real-estate rental application with property listings, property details, search workflows, and rental-related user interactions. Built with responsive layouts, direct owner connect, and verified property listings.',
    stack: ['React.js', 'React Native', 'Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Tailwind CSS'],
    accent: '#38bdf8',
    liveUrl: 'https://rentalchaavi.com',
    githubUrl: '',
    image: '/assets/projects/rentalchaavi-home.png',
    secondaryImage: '/assets/projects/rentalchaavi-features.png',
    featured: true,
    badge: 'Live Website',
    roleContribution:
      'Frontend Developer: Implemented responsive property browsing, dynamic filters, detail modals, and REST API integration.',
  },
  {
    id: 'dealskb',
    number: '02',
    title: 'DealsKB',
    type: 'AutoBid & Auction Marketplace',
    category: 'Independent / Live Platform',
    year: '2025 — 2026',
    summary:
      'Multi-product auto-bid and live auction marketplace platform with Buyer, Seller, and Admin workflows, 30-second real-time auctions, interactive Leaflet maps, bidding plans, and payment workflows.',
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
    type: 'Vehicle Finance Platform',
    category: 'FinTech Solution',
    year: '2025 — 2026',
    summary:
      'Vehicle-finance application with user workflows, dynamic loan calculator, banking partner integrations, multi-step application forms, document uploads, and loan management features.',
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
      'Training and live-lecture management platform with Student, Faculty, Executor, and Admin workflows, comprehensive role-based dashboards, lecture scheduling, enrollment, and API integrations.',
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
    type: 'Enterprise Property & Broker Application',
    category: 'Enterprise Mobile & Web',
    year: '2026',
    summary:
      'Enterprise application with responsive screens, property-related workflows, navigation, API integration, and reusable UI components designed for high-throughput daily operations.',
    stack: ['React Native', 'Java', 'Spring Boot', 'REST APIs', 'Tailwind CSS'],
    accent: '#ec4899',
    liveUrl: 'https://caryanam.com',
    githubUrl: '',
    image: '/assets/projects/caryanam-home.png',
    featured: false,
    badge: 'Live Website',
    roleContribution:
      'Frontend Developer at Caryanam India: Engineered modular UI components, property listing cards, chat modules, and cross-device consistency.',
  },
  {
    id: 'avaaj-mann-ki',
    number: '06',
    title: 'AwajManki',
    type: 'Anonymous Thoughts & Social Platform',
    category: 'Social Platform & Mobile Web',
    year: '2025 — 2026',
    summary:
      'Anonymous community platform ("Where Thoughts Matter More Than Identity") designed for free expression with AI-powered moderation, multilingual voice-to-text, and secure, respectful conversations.',
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

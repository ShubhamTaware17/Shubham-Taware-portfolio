/**
 * Central content configuration for Shubham Taware's portfolio.
 * Verified from Shubham Taware resume and active project files.
 */

const env = import.meta.env;

export const site = {
  name: 'Shubham Taware',
  firstName: 'Shubham',
  lastName: 'Taware',
  monogram: 'ST',
  role: 'Frontend Developer',
  phone: '+91 9923224600',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: "Hello, I'm",
  intro:
    'I build fast, responsive and visually refined web applications with React.js, modern UI components, and seamless REST API integrations.',
  primaryCta: { label: 'Explore Featured Work', href: '#projects' },
  secondaryCta: { label: "Let's Connect", href: '#contact' },
};

export const about = {
  bio:
    'Frontend Developer with hands-on experience in building responsive and user-friendly web applications using React.js, JavaScript, HTML5, CSS3, and Tailwind CSS. Skilled in developing modern UI components, integrating REST APIs, and creating mobile-friendly interfaces with strong focus on performance and user experience.',
  facts: [
    { label: 'Based in', value: 'Pune, India' },
    { label: 'Experience', value: '2+ Years' },
    { label: 'Focus areas', value: 'React.js, Tailwind CSS, REST APIs & Responsive UIs' },
    { label: 'Open to', value: 'Full-time Frontend Roles & Freelance Projects' },
  ],
  stats: [
    { value: '2+', label: 'Years building for the web' },
    { value: '6+', label: 'Production projects shipped' },
    { value: '10+', label: 'Technologies used regularly' },
  ],
};

export const contact = {
  heading: "Let's build something great.",
  intro:
    'Have an opportunity, a freelance project, or an idea you want to bring to life? Send a message or get in touch directly.',
  email: env.VITE_CONTACT_EMAIL || 'shubham.taware108@gmail.com',
  phone: '+91 9923224600',
  location: 'Pune, India',
  endpoint: env.VITE_CONTACT_ENDPOINT || '',
};

export const socials = [
  {
    label: 'LinkedIn',
    href: env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/shubham-taware-a94126298',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: env.VITE_GITHUB_URL || 'https://github.com',
    icon: 'github',
  },
];

export const footerTicker = [
  'Shubham Taware',
  'Frontend Developer',
  'React.js',
  'JavaScript (ES6+)',
  'Tailwind CSS',
  'REST API Integration',
  'Three.js',
  'Responsive Design',
  'Pune, India',
];

/** True only for a real http(s) URL, never for a [placeholder]. */
export const isConfiguredUrl = (value) =>
  typeof value === 'string' && /^https?:\/\/[^\s[\]]+$/i.test(value);

/** True only for a real-looking email address, never for a [placeholder]. */
export const isConfiguredEmail = (value) =>
  typeof value === 'string' && /^[^\s@[\]]+@[^\s@[\]]+\.[^\s@[\]]{2,}$/.test(value);

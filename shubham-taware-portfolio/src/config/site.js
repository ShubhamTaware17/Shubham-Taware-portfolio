/**
 * Central content file for the portfolio.
 *
 * PLACEHOLDERS
 * Anything written inside [square brackets] is a placeholder that still needs
 * real content. The site highlights placeholders in amber so they are easy to
 * find before launch. Replace them here, or set the matching environment
 * variable (see .env.example) to override links and the contact endpoint
 * without touching code.
 */

const env = import.meta.env;

export const site = {
  name: 'Shubham Taware',
  firstName: 'Shubham',
  lastName: 'Taware',
  monogram: 'ST',
  role: 'Frontend Developer',
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: "Hello, I'm",
  intro:
    'I build fast, accessible and visually refined interfaces, bringing considered design and fluid motion to the web.',
  primaryCta: { label: 'Explore My Work', href: '#projects' },
  secondaryCta: { label: "Let's Connect", href: '#contact' },
};

export const about = {
  bio:
    '[Add a 2–3 sentence introduction: your background, the kinds of interfaces you enjoy building, and what you care about most, such as performance, accessibility or motion design.]',
  facts: [
    { label: 'Based in', value: '[City, Country]' },
    { label: 'Experience', value: '[X] years' },
    { label: 'Focus areas', value: '[Your focus areas]' },
    { label: 'Open to', value: '[Roles or collaborations you want]' },
  ],
  stats: [
    { value: '[X]+', label: 'Years building for the web' },
    { value: '[X]+', label: 'Projects shipped' },
    { value: '[X]+', label: 'Technologies used regularly' },
  ],
};

export const contact = {
  heading: "Let's build something great.",
  intro:
    'Have a project, an opening or an idea you want to talk through? Send a message and I will get back to you.',
  email: env.VITE_CONTACT_EMAIL || '[ADD-YOUR-EMAIL]',
  location: '[City, Country]',
  // Any service that accepts a JSON POST works here (Formspree, Web3Forms, or your own API).
  endpoint: env.VITE_CONTACT_ENDPOINT || '',
};

export const socials = [
  { label: 'GitHub', href: env.VITE_GITHUB_URL || '[ADD-GITHUB-URL]', icon: 'github' },
  { label: 'LinkedIn', href: env.VITE_LINKEDIN_URL || '[ADD-LINKEDIN-URL]', icon: 'linkedin' },
];

export const footerTicker = [
  'Shubham Taware',
  'Frontend Developer',
  'React',
  'Motion',
  'Three.js',
  'Accessibility',
  'Performance',
];

/** True only for a real http(s) URL, never for a [placeholder]. */
export const isConfiguredUrl = (value) =>
  typeof value === 'string' && /^https?:\/\/[^\s[\]]+$/i.test(value);

/** True only for a real-looking email address, never for a [placeholder]. */
export const isConfiguredEmail = (value) =>
  typeof value === 'string' && /^[^\s@[\]]+@[^\s@[\]]+\.[^\s@[\]]{2,}$/.test(value);

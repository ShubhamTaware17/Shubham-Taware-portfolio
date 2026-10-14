import {
  SiCss,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

/**
 * Technologies shown in the Skills section.
 * Verified from Shubham Taware's resume and real project stacks.
 */
export const skills = [
  { name: 'React.js', icon: SiReact, color: '#61dafb', group: 'Frameworks & Libraries' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', group: 'Frameworks & Libraries' },
  { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#f7df1e', group: 'Core' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', group: 'Core' },
  { name: 'HTML5', icon: SiHtml5, color: '#ff7a4d', group: 'Core' },
  { name: 'CSS3', icon: SiCss, color: '#4aa8ff', group: 'Core' },
  { name: 'Framer Motion', icon: SiFramer, color: '#8fa6ff', group: 'Frameworks & Libraries' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#e8e8f0', group: 'Frameworks & Libraries' },
  { name: 'Vite', icon: SiVite, color: '#b9a6ff', group: 'Tooling' },
  { name: 'Git', icon: SiGit, color: '#ff7b5c', group: 'Tooling' },
  { name: 'GitHub', icon: SiGithub, color: '#e6e8ef', group: 'Tooling' },
  { name: 'Figma', icon: SiFigma, color: '#f24e1e', group: 'Tooling' },
  { name: 'IntelliJ IDEA', icon: SiIntellijidea, color: '#fe315d', group: 'Tooling' },
];

export const skillGroups = ['Core', 'Frameworks & Libraries', 'Tooling'].map((title) => ({
  title,
  items: skills.filter((skill) => skill.group === title),
}));

import {
  SiCss,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiThreedotjs,
  SiVite,
} from 'react-icons/si';

/**
 * Technologies shown in the Skills section.
 *
 * This list is based on the stack named in the project brief. Confirm it with
 * Shubham and add or remove entries. Each entry needs a name, an icon, a
 * brand colour and one of the group titles below.
 * No proficiency levels are shown on purpose; add them only with real data.
 */
export const skills = [
  { name: 'React', icon: SiReact, color: '#61dafb', group: 'Frameworks & Libraries' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', group: 'Core' },
  { name: 'HTML5', icon: SiHtml5, color: '#ff7a4d', group: 'Core' },
  { name: 'CSS3', icon: SiCss, color: '#4aa8ff', group: 'Core' },
  { name: 'Framer Motion', icon: SiFramer, color: '#8fa6ff', group: 'Frameworks & Libraries' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#e8e8f0', group: 'Frameworks & Libraries' },
  { name: 'Vite', icon: SiVite, color: '#b9a6ff', group: 'Tooling' },
  { name: 'Git', icon: SiGit, color: '#ff7b5c', group: 'Tooling' },
  { name: 'GitHub', icon: SiGithub, color: '#e6e8ef', group: 'Tooling' },
];

export const skillGroups = ['Core', 'Frameworks & Libraries', 'Tooling'].map((title) => ({
  title,
  items: skills.filter((skill) => skill.group === title),
}));

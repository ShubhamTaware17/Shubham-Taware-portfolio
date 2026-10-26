import {
  SiAndroid,
  SiAndroidstudio,
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

import {
  FaArrowsRotate,
  FaBolt,
  FaBug,
  FaCode,
  FaDatabase,
  FaGaugeHigh,
  FaGlobe,
  FaJava,
  FaLaptopCode,
  FaLayerGroup,
  FaMobileScreen,
  FaNetworkWired,
  FaRobot,
  FaServer,
  FaTerminal,
  FaWrench,
} from 'react-icons/fa6';

import { VscVscode } from 'react-icons/vsc';

/**
 * Curated core skills for the orbiting radar animation.
 * 4 on the inner track, 8 on the outer track.
 */
export const orbitSkills = [
  // Inner ring (4 foundational core technologies)
  { name: 'React.js', icon: SiReact, color: '#61dafb' },
  { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'Java', icon: FaJava, color: '#f97316' },

  // Outer ring (8 surrounding technologies)
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
  { name: 'HTML5', icon: SiHtml5, color: '#ff5722' },
  { name: 'CSS3', icon: SiCss, color: '#264de4' },
  { name: 'MySQL', icon: SiMysql, color: '#00758f' },
  { name: 'Android Studio', icon: SiAndroidstudio, color: '#3ddc84' },
  { name: 'Git', icon: SiGit, color: '#f05032' },
  { name: 'GitHub', icon: SiGithub, color: '#e6e8ef' },
  { name: 'Vite', icon: SiVite, color: '#b9a6ff' },
];

/**
 * Verified Technical Skills categorized by domain.
 */
export const skillGroups = [
  {
    title: 'Frontend Development',
    items: [
      { name: 'HTML5', icon: SiHtml5, color: '#ff5722' },
      { name: 'CSS3', icon: SiCss, color: '#264de4' },
      { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#f7df1e' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
      { name: 'React.js', icon: SiReact, color: '#61dafb' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
      { name: 'Vite', icon: SiVite, color: '#b9a6ff' },
      { name: 'Responsive Web Design', icon: FaMobileScreen, color: '#10b981' },
    ],
  },
  {
    title: 'Backend Development',
    items: [
      { name: 'Java', icon: FaJava, color: '#f97316' },
      { name: 'REST API Integration', icon: FaNetworkWired, color: '#06b6d4' },
      { name: 'Frontend–Backend Integration', icon: FaArrowsRotate, color: '#8b5cf6' },
      { name: 'CRUD Operations', icon: FaDatabase, color: '#3b82f6' },
      { name: 'API Handling', icon: FaServer, color: '#10b981' },
    ],
  },
  {
    title: 'Database Management',
    items: [
      { name: 'MySQL', icon: SiMysql, color: '#00758f' },
      { name: 'MySQL Workbench', icon: FaDatabase, color: '#f59e0b' },
      { name: 'SQL Queries', icon: FaCode, color: '#6366f1' },
      { name: 'Database Design', icon: FaLayerGroup, color: '#ec4899' },
      { name: 'Database Connectivity', icon: FaNetworkWired, color: '#14b8a6' },
      { name: 'Data Storage & Retrieval', icon: FaServer, color: '#3b82f6' },
    ],
  },
  {
    title: 'Mobile App Development',
    items: [
      { name: 'Android App Development', icon: SiAndroid, color: '#3ddc84' },
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3ddc84' },
      { name: 'Mobile UI Development', icon: FaMobileScreen, color: '#38bdf8' },
      { name: 'Mobile API Integration', icon: FaArrowsRotate, color: '#a855f7' },
    ],
  },
  {
    title: 'Development Tools',
    items: [
      { name: 'VS Code', icon: VscVscode, color: '#007acc' },
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: '#e6e8ef' },
      { name: 'Browser Developer Tools', icon: FaTerminal, color: '#f59e0b' },
      { name: 'Debugging & Troubleshooting', icon: FaBug, color: '#ef4444' },
      { name: 'Figma', icon: SiFigma, color: '#f24e1e' },
      { name: 'Lovable AI', icon: FaRobot, color: '#ec4899' },
      { name: 'Bolt.new', icon: FaBolt, color: '#facc15' },
    ],
  },
  {
    title: 'Additional Development Skills',
    items: [
      { name: 'Website Development', icon: FaGlobe, color: '#3b82f6' },
      { name: 'Web Application Development', icon: FaLaptopCode, color: '#8b5cf6' },
      { name: 'Website Maintenance', icon: FaWrench, color: '#10b981' },
      { name: 'Third-Party API Integration', icon: FaNetworkWired, color: '#06b6d4' },
      { name: 'Cross-Device Compatibility', icon: FaMobileScreen, color: '#f97316' },
      { name: 'Performance Optimization', icon: FaGaugeHigh, color: '#22c55e' },
      { name: 'Code Debugging', icon: FaBug, color: '#ef4444' },
    ],
  },
];

// Flat list for any generic lookups or backward compatibility
export const skills = skillGroups.flatMap((group) => group.items);

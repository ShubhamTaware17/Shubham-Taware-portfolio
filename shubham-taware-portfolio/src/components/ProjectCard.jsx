import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { isConfiguredUrl } from '../config/site.js';
import { renderPlaceholders } from '../utils/placeholders.jsx';
import { EASE_OUT, SPRING } from '../utils/motion.js';

function ProjectLink({ href, label, icon: Icon, primary = false }) {
  if (isConfiguredUrl(href)) {
    return (
      <a
        className={`btn btn--sm ${primary ? 'btn--primary' : 'btn--ghost'}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon aria-hidden="true" />
        {label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      className="btn btn--sm btn--ghost"
      disabled
      title={`Add the ${label.toLowerCase()} URL in src/data/projects.js`}
    >
      <Icon aria-hidden="true" />
      {label}
    </button>
  );
}

export default function ProjectCard({ project, index, featured = false }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // 3D tilt: the card leans toward the pointer.
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), SPRING);

  // Light that follows the pointer across the card surface.
  const spotX = useTransform(px, (value) => `${value * 100}%`);
  const spotY = useTransform(py, (value) => `${value * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${spotX} ${spotY}, ${project.accent}2e, transparent 60%)`;

  const handleMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const hasLinks = isConfiguredUrl(project.liveUrl) || isConfiguredUrl(project.githubUrl);
  const titleId = `${project.id}-title`;

  return (
    <motion.article
      className={`project-card${featured ? ' project-card--featured' : ''}`}
      initial={{ opacity: 0, y: 90, rotateX: 22 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, delay: index * 0.12, ease: EASE_OUT }}
      aria-labelledby={titleId}
    >
      <motion.div
        className="project-card__tilt"
        style={{ rotateX, rotateY }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <motion.div className="project-card__spot" style={{ background: spotlight }} aria-hidden="true" />

        <div className="project-card__visual" style={{ '--accent': project.accent }} aria-hidden="true">
          <span className="project-card__number">{project.number}</span>
          <span className="project-card__shot">{renderPlaceholders('[Screenshot]')}</span>
        </div>

        <div className="project-card__body">
          <p className="project-card__meta">
            {renderPlaceholders(project.type)} <span aria-hidden="true">/</span> {renderPlaceholders(project.year)}
          </p>
          <h3 id={titleId} className="project-card__title">
            {renderPlaceholders(project.title)}
          </h3>
          <p className="project-card__summary">{renderPlaceholders(project.summary)}</p>

          <ul className="project-card__stack" aria-label="Technologies used">
            {project.stack.map((tech, techIndex) => (
              <li key={`${tech}-${techIndex}`}>{renderPlaceholders(tech)}</li>
            ))}
          </ul>

          <div className="project-card__actions">
            <ProjectLink href={project.liveUrl} label="Live demo" icon={FaArrowUpRightFromSquare} primary />
            <ProjectLink href={project.githubUrl} label="GitHub" icon={FaGithub} />
          </div>

          {!hasLinks && (
            <p className="project-card__note">{renderPlaceholders('[Add live and GitHub URLs in src/data/projects.js]')}</p>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

import { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { isConfiguredUrl } from '../config/site.js';
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

  return null;
}

function getHostname(url, fallback) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return fallback;
  }
}

export default function ProjectCard({ project, index, featured = false }) {
  const reduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // 3D tilt: card leans toward the pointer
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), SPRING);

  // Spotlight that follows pointer
  const spotX = useTransform(px, (value) => `${value * 100}%`);
  const spotY = useTransform(py, (value) => `${value * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${spotX} ${spotY}, ${project.accent}2b, transparent 65%)`;

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

  const titleId = `${project.id}-title`;
  const hasLiveLink = isConfiguredUrl(project.liveUrl);
  const hasGithub = isConfiguredUrl(project.githubUrl);

  const imgSrc = imgError && project.fallbackImage ? project.fallbackImage : project.image;

  return (
    <motion.article
      className={`project-card${featured ? ' project-card--featured' : ''}`}
      initial={{ opacity: 0, y: 70, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: Math.min(index * 0.1, 0.4), ease: EASE_OUT }}
      aria-labelledby={titleId}
    >
      <motion.div
        className="project-card__tilt"
        style={{ rotateX, rotateY }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <motion.div className="project-card__spot" style={{ background: spotlight }} aria-hidden="true" />

        {/* Top bar with clean number pill, category, and live badge */}
        <div className="project-card__top">
          <div className="project-card__top-meta">
            <span className="project-card__number-chip">{project.number}</span>
            <span className="project-card__category">{project.category || project.type}</span>
          </div>
          {project.badge && (
            <span
              className="project-card__badge"
              style={{ borderColor: `${project.accent}66`, color: project.accent }}
            >
              {hasLiveLink && <span className="project-card__badge-pulse" style={{ backgroundColor: project.accent }} />}
              {project.badge}
            </span>
          )}
        </div>

        {/* Framed macOS browser mockup */}
        <div className="project-card__visual" style={{ '--accent': project.accent }}>
          <div className="project-card__browser-window">
            <div className="project-card__browser-bar" aria-hidden="true">
              <div className="project-card__browser-dots">
                <span className="project-card__browser-dot dot--red" />
                <span className="project-card__browser-dot dot--yellow" />
                <span className="project-card__browser-dot dot--green" />
              </div>
              <span className="project-card__browser-url">
                {getHostname(project.liveUrl, `${project.id}.com`)}
              </span>
              <span className="project-card__browser-status">
                <span className="project-card__status-dot" />
                LIVE
              </span>
            </div>

            <div className="project-card__media">
              {imgSrc && !imgError ? (
                <img
                  src={imgSrc}
                  alt={`${project.title} live interface preview`}
                  className="project-card__img"
                  loading="lazy"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="project-card__fallback">
                  <div className="project-card__fallback-circle" />
                  <span className="project-card__fallback-text">{project.category || 'Production Project'}</span>
                </div>
              )}
              <div className="project-card__media-glow" />
            </div>
          </div>
        </div>

        {/* Card Body with consistent vertical baselines */}
        <div className="project-card__body">
          <div className="project-card__meta-bar">
            <span className="project-card__type">{project.type}</span>
            <span className="project-card__meta-sep" aria-hidden="true">•</span>
            <span className="project-card__year">{project.year}</span>
          </div>

          <h3 id={titleId} className="project-card__title">
            {project.title}
          </h3>

          <p className="project-card__summary">{project.summary}</p>

          {project.roleContribution && (
            <p className="project-card__contribution">
              <span className="project-card__contribution-label">Key Contribution: </span>
              {project.roleContribution.replace(/^Frontend (Developer|Engineer)[^:]*:\s*/i, '')}
            </p>
          )}

          <ul className="project-card__stack" aria-label="Technologies used">
            {project.stack.map((tech, techIndex) => (
              <li key={`${tech}-${techIndex}`}>{tech}</li>
            ))}
          </ul>

          <div className="project-card__actions">
            {hasLiveLink && (
              <ProjectLink
                href={project.liveUrl}
                label="Visit Live Website"
                icon={FaArrowUpRightFromSquare}
                primary
              />
            )}
            {hasGithub && (
              <ProjectLink
                href={project.githubUrl}
                label="GitHub"
                icon={FaGithub}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

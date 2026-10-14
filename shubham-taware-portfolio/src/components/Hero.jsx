import { lazy, Suspense, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import { hero, site } from '../config/site.js';
import Magnetic from './Magnetic.jsx';
import { EASE_OUT } from '../utils/motion.js';
import { supportsWebGL } from '../utils/webgl.js';

// The 3D scene and Three.js load only when the hero is rendered, keeping the first paint light.
const HeroScene = lazy(() => import('./HeroScene.jsx'));

const LETTER_VARIANTS = {
  hidden: { y: '105%', rotate: 6, opacity: 0 },
  show: (index) => ({
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT, delay: 0.25 + index * 0.05 },
  }),
};

function AnimatedWord({ text, offset = 0, className = '' }) {
  return (
    <span className={`hero__line ${className}`.trim()} aria-hidden="true">
      {Array.from(text).map((char, index) => (
        <span className="mask" key={`${text}-${index}`}>
          <motion.span
            className="char"
            variants={LETTER_VARIANTS}
            custom={index + offset}
            initial="hidden"
            animate="show"
          >
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function HeroFallback() {
  return (
    <div className="hero__orb" aria-hidden="true">
      <span className="hero__orb-core" />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [webgl] = useState(() => supportsWebGL());

  // Feed the cursor position into CSS variables for the spotlight. Writing these
  // directly avoids a React re-render on every pointer move.
  const handlePointerMove = (event) => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;
    const rect = section.getBoundingClientRect();
    section.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    section.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero"
      onPointerMove={handlePointerMove}
      aria-labelledby="hero-title"
    >
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="hero__eyebrow-text">{hero.eyebrow}</span>
          </motion.p>

          <h1 id="hero-title" className="hero__name">
            <span className="sr-only">{site.name}</span>
            <AnimatedWord text={site.firstName} />
            <AnimatedWord text={site.lastName} offset={site.firstName.length} className="hero__line--outline" />
          </h1>

          <div className="hero__role-wrap">
            <motion.span
              className="hero__role"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.85 }}
            >
              <span className="hero__role-text">{site.role}</span>
            </motion.span>
          </div>

          <motion.p
            className="hero__intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE_OUT }}
          >
            {hero.intro}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: EASE_OUT }}
          >
            <Magnetic>
              <a className="btn btn--primary" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <FaArrowRight className="btn__icon" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE_OUT }}
        >
          <Suspense fallback={<HeroFallback />}>
            {webgl ? <HeroScene reduced={Boolean(reduceMotion)} /> : <HeroFallback />}
          </Suspense>
          <p className="hero__hint" aria-hidden="true">
            Interactive preview
          </p>
        </motion.div>
      </div>

      <a href="#about" className="hero__scroll">
        <span>Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}

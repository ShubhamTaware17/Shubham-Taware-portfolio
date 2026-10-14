import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { about, site } from '../config/site.js';
import { renderPlaceholders } from '../utils/placeholders.jsx';
import { EASE_OUT } from '../utils/motion.js';

/**
 * Splits the bio into words for the scroll fill. Words that sit inside a
 * [placeholder] keep the placeholder flag, so every word animates even while
 * the copy is still a placeholder.
 */
function tokenizeBio(text) {
  let insidePlaceholder = false;
  return text
    .trim()
    .split(/\s+/)
    .map((word) => {
      const isPlaceholder = insidePlaceholder || word.includes('[');
      if (word.includes('[') && !word.includes(']')) insidePlaceholder = true;
      else if (word.includes(']')) insidePlaceholder = false;
      return { text: word, isPlaceholder };
    });
}

/** One word of the bio. Its opacity follows the scroll position, so the text fills in as you read. */
// Unread words start at a readable muted tone and fill to full colour as you scroll.
// Dimming with opacity would fail WCAG contrast, so the colour itself is interpolated.
const DIM = { text: '#7f8699', placeholder: '#a77f4f' };
const LIT = { text: '#eef0f6', placeholder: '#ffc078' };

function WordToken({ token, index, total, progress, reduceMotion }) {
  const start = index / total;
  const end = Math.min(1, start + 1 / total);
  const kind = token.isPlaceholder ? 'placeholder' : 'text';
  const filled = useTransform(progress, [start, end], [DIM[kind], LIT[kind]]);

  return (
    <motion.span
      className={token.isPlaceholder ? 'ph about__word' : 'about__word'}
      style={{ color: reduceMotion ? LIT[kind] : filled }}
    >
      {token.text}{' '}
    </motion.span>
  );
}

export default function About() {
  const bioRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: bioRef, offset: ['start 85%', 'end 55%'] });
  const tokens = tokenizeBio(about.bio);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        {/* The figure is observed unclipped. A fully clipped element never reports as
            intersecting, so the clip-path reveal lives on the inner panel instead. */}
        <motion.figure
          className="about__portrait"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="about__portrait-art"
            aria-hidden="true"
            variants={{
              hidden: { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
              show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', transition: { duration: 1.2, ease: EASE_OUT } },
            }}
          >
            <span className="about__initials">{site.monogram}</span>
            <span className="about__scan" />
            <span className="about__grid-lines" />
          </motion.div>
          <figcaption className="about__portrait-caption">{site.name} · {site.role}</figcaption>
        </motion.figure>

        <div className="about__content">
          <SectionHeading id="about-title" index="01" label="About" title="About me" variant="wipe" />

          <div ref={bioRef} className="about__bio-wrap">
            <p className="about__bio">
              {tokens.map((token, index) => (
                <WordToken
                  key={`${index}-${token.text}`}
                  token={token}
                  index={index}
                  total={tokens.length}
                  progress={scrollYProgress}
                  reduceMotion={reduceMotion}
                />
              ))}
            </p>
          </div>

          <ul className="about__stats">
            {about.stats.map((stat) => (
              <li key={stat.label} className="about__stat">
                <span className="about__stat-value">{renderPlaceholders(stat.value)}</span>
                <span className="about__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>

          <dl className="about__facts">
            {about.facts.map((fact) => (
              <div key={fact.label} className="about__fact">
                <dt>{fact.label}</dt>
                <dd>{renderPlaceholders(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

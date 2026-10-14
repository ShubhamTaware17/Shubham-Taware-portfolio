import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { experience } from '../data/experience.js';
import { renderPlaceholders } from '../utils/placeholders.jsx';
import { EASE_OUT } from '../utils/motion.js';

export default function Experience() {
  const listRef = useRef(null);
  // The timeline line is drawn as you scroll through the list.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 65%'] });
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading id="experience-title" index="04" label="Experience" title="Experience" variant="rise" />

        <div className="timeline" ref={listRef}>
          <div className="timeline__track" aria-hidden="true">
            <motion.span className="timeline__progress" style={{ scaleY: drawn }} />
          </div>

          <ol className="timeline__list">
            {experience.map((item, index) => (
              <motion.li
                key={`${item.role}-${index}`}
                className={`timeline__item timeline__item--${item.kind}`}
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.05, ease: EASE_OUT }}
              >
                <motion.span
                  className="timeline__dot"
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.2 }}
                />
                <div className="timeline__card">
                  <p className="timeline__period">
                    <span className="timeline__kind">{item.kind === 'education' ? 'Education' : 'Work'}</span>
                    {renderPlaceholders(item.period)}
                  </p>
                  <h3 className="timeline__role">{renderPlaceholders(item.role)}</h3>
                  <p className="timeline__company">
                    {renderPlaceholders(item.company)}
                    <span aria-hidden="true" className="timeline__sep">
                      /
                    </span>
                    {renderPlaceholders(item.location)}
                  </p>
                  <ul className="timeline__points">
                    {item.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{renderPlaceholders(point)}</li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading.jsx';
import { skillGroups, skills } from '../data/skills.js';
import { EASE_OUT } from '../utils/motion.js';

const INNER_RING_COUNT = 4;
const RING_RADIUS = { inner: '30cqi', outer: '44cqi' };
const RING_SPEED = { inner: '26s', outer: '38s' };

/** Skill icons orbit two rings. Hovering or focusing an icon pauses the orbit and names the skill. */
function SkillOrbit() {
  const [activeName, setActiveName] = useState(skills[0].name);
  const innerSkills = skills.slice(0, INNER_RING_COUNT);
  const outerSkills = skills.slice(INNER_RING_COUNT);

  const renderRing = (ringSkills, ring, startOffset) => (
    <div
      className={`orbit__ring orbit__ring--${ring}`}
      style={{ '--dur': RING_SPEED[ring] }}
     
    >
      {ringSkills.map((skill, index) => {
        const angle = startOffset + (360 / ringSkills.length) * index;
        const Icon = skill.icon;
        return (
          <div
            key={skill.name}
            className="orbit__item"
            style={{ '--a': `${angle}deg`, '--r': RING_RADIUS[ring] }}
          >
            <div className="orbit__upright">
              <div className="orbit__spin">
                <button
                  type="button"
                  className="orbit__btn"
                  style={{ '--c': skill.color }}
                  aria-label={skill.name}
                  onPointerEnter={() => setActiveName(skill.name)}
                  onFocus={() => setActiveName(skill.name)}
                  onClick={() => setActiveName(skill.name)}
                >
                  <Icon aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="orbit-card">
      <div className="orbit">
        <div className="orbit__stage">
          <span className="orbit__track orbit__track--inner" aria-hidden="true" />
          <span className="orbit__track orbit__track--outer" aria-hidden="true" />
          <div className="orbit__core" aria-hidden="true">
            <span>FE</span>
          </div>
          {renderRing(innerSkills, 'inner', 0)}
          {renderRing(outerSkills, 'outer', 18)}
        </div>
      </div>
      <p className="orbit__readout" aria-live="polite">
        <span className="orbit__readout-label">Now viewing</span>
        <span className="orbit__readout-name">{activeName}</span>
      </p>
    </div>
  );
}

/** A tech tile with a light that follows the pointer across it. */
function SkillTile({ skill }) {
  const Icon = skill.icon;
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--sx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--sy', `${event.clientY - rect.top}px`);
  };

  return (
    // Outer li: entrance animation (Framer owns its transform).
    // Inner div: hover lift and spotlight (CSS owns its transform).
    <motion.li
      className="tile-wrap"
      style={{ '--c': skill.color }}
      variants={{
        hidden: { opacity: 0, scale: 0.8, rotate: -8 },
        show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: EASE_OUT } },
      }}
    >
      <div className="tile" onPointerMove={handleMove}>
        <span className="tile__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="tile__name">{skill.name}</span>
      </div>
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading id="skills-title" index="02" label="Skills" title="Skills & Technologies" variant="blur" />

        <div className="skills__grid">
          <SkillOrbit />

          <div className="skills__groups">
            {skillGroups.map((group) => (
              <section key={group.title} className="skill-group" aria-labelledby={`group-${group.title.replace(/\W+/g, '-')}`}>
                <h3 id={`group-${group.title.replace(/\W+/g, '-')}`} className="skill-group__title">
                  {group.title}
                </h3>
                <motion.ul
                  className="skill-group__tiles"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
                >
                  {group.items.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} />
                  ))}
                </motion.ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

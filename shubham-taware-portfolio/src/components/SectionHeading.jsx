import { motion } from 'framer-motion';
import { EASE_OUT } from '../utils/motion.js';

/** Each variant gives its section a different entrance, so headings don't all animate alike. */
const TITLE_VARIANTS = {
  rise: {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
  },
  wipe: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.1, ease: EASE_OUT } },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(18px)', y: 20 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 1.2, ease: EASE_OUT } },
  },
  tracking: {
    hidden: { opacity: 0, letterSpacing: '0.32em' },
    show: { opacity: 1, letterSpacing: '-0.035em', transition: { duration: 1.3, ease: EASE_OUT } },
  },
};

export default function SectionHeading({ id, index, label, title, variant = 'rise' }) {
  return (
    <motion.header
      className="section-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.p
        className="eyebrow"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
      >
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__rule" aria-hidden="true" />
        <span>{label}</span>
      </motion.p>
      <motion.h2 id={id} className="section-title" variants={TITLE_VARIANTS[variant]}>
        {title}
      </motion.h2>
    </motion.header>
  );
}

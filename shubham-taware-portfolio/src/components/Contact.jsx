import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import SectionHeading from './SectionHeading.jsx';
import ContactForm from './ContactForm.jsx';
import { contact, isConfiguredEmail } from '../config/site.js';
import { renderPlaceholders } from '../utils/placeholders.jsx';

/** Slow-drifting colour fields behind the form. Still under reduced motion (the transforms are disabled there). */
function AuroraBackground() {
  return (
    <div className="contact__bg" aria-hidden="true">
      <motion.span
        className="blob blob--violet"
        animate={{ x: [0, 90, -40, 0], y: [0, -70, 50, 0], scale: [1, 1.12, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="blob blob--teal"
        animate={{ x: [0, -110, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.92, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="blob blob--coral"
        animate={{ x: [0, 60, -80, 0], y: [0, 40, 70, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="contact__lines" />
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event) => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;
    const rect = section.getBoundingClientRect();
    section.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    section.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section contact"
      onPointerMove={handlePointerMove}
      aria-labelledby="contact-title"
    >
      <AuroraBackground />
      <div className="container contact__inner">
        <SectionHeading id="contact-title" index="05" label="Contact" title={contact.heading} variant="blur" />

        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__intro">{contact.intro}</p>

            <ul className="contact__details">
              <li>
                <span className="contact__icon" aria-hidden="true">
                  <FaEnvelope />
                </span>
                <div>
                  <span className="contact__label">Email</span>
                  {isConfiguredEmail(contact.email) ? (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  ) : (
                    <span>{renderPlaceholders(contact.email)}</span>
                  )}
                </div>
              </li>
              <li>
                <span className="contact__icon" aria-hidden="true">
                  <FaLocationDot />
                </span>
                <div>
                  <span className="contact__label">Location</span>
                  <span>{renderPlaceholders(contact.location)}</span>
                </div>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

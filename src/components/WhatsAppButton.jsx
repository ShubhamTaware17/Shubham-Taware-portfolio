import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { contact, getWhatsAppUrl } from '../config/site.js';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const whatsappUrl = getWhatsAppUrl(contact.whatsapp || contact.phone, contact.whatsappMessage);

  if (!whatsappUrl) return null;

  return (
    <motion.aside
      className="wa-float"
      aria-label="Direct message option"
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`wa-float__btn ${isHovered ? 'wa-float__btn--hovered' : ''}`}
        aria-label="Chat with Shubham Taware on WhatsApp (opens in a new tab)"
        title="Chat on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <span className="wa-float__pulse" aria-hidden="true" />
        <span className="wa-float__icon-wrap">
          <FaWhatsapp className="wa-float__icon" aria-hidden="true" />
        </span>
        <span className="wa-float__badge" aria-hidden="true">
          <span className="wa-float__dot" />
          <span className="wa-float__text">Chat on WhatsApp</span>
        </span>
      </a>
    </motion.aside>
  );
}

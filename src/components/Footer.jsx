import { FaArrowUp, FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import Magnetic from './Magnetic.jsx';
import { contact, footerTicker, isConfiguredEmail, isConfiguredUrl, navItems, site, socials } from '../config/site.js';

const SOCIAL_ICONS = { github: FaGithub, linkedin: FaLinkedinIn, whatsapp: FaWhatsapp };

export default function Footer() {
  const year = new Date().getFullYear();
  const tickerItems = [...footerTicker, ...footerTicker];

  return (
    <footer className="footer">
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {tickerItems.map((item, index) => (
            <span key={`${item}-${index}`} className="ticker__item">
              {item}
              <i className="ticker__dot">✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            {site.name}
          </a>
          <p className="footer__tagline">{site.role}. Fast, accessible interfaces with considered motion.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social" role="group" aria-label="Social links">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            if (isConfiguredUrl(social.href)) {
              return (
                <Magnetic key={social.label}>
                  <a
                    className="social"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    title={social.label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </Magnetic>
              );
            }
            return (
              <span
                key={social.label}
                className="social social--pending"
                role="img"
                aria-label={`${social.label} link not set up yet`}
                title={`Add your ${social.label} URL in src/config/site.js or .env.local`}
              >
                <Icon aria-hidden="true" />
              </span>
            );
          })}
          {isConfiguredEmail(contact.email) && (
            <Magnetic>
              <a className="social" href={`mailto:${contact.email}`} aria-label="Send an email" title="Email">
                <span aria-hidden="true">@</span>
              </a>
            </Magnetic>
          )}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <a href="#home" className="to-top">
          Back to top <FaArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

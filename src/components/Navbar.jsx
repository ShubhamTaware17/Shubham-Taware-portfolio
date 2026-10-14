import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { navItems, site } from '../config/site.js';
import useMediaQuery from '../hooks/useMediaQuery.js';

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const isMobile = useMediaQuery('(max-width: 860px)');
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // The mobile menu only counts as open while the mobile layout is active.
  const isMenuOpen = open && isMobile;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link for whichever section sits near the middle of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: lock page scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      // Cycle Tab through the menu and its toggle ourselves. Relying on the browser's
      // native order fails when focus is outside the menu or the menu is still settling.
      event.preventDefault();
      const focusables = [
        toggleRef.current,
        ...(menuRef.current?.querySelectorAll(FOCUSABLE) ?? []),
      ].filter(Boolean);
      const index = focusables.indexOf(document.activeElement);
      const last = focusables.length - 1;
      let nextIndex;
      if (event.shiftKey) {
        nextIndex = index <= 0 ? last : index - 1;
      } else {
        nextIndex = index === -1 || index === last ? 0 : index + 1;
      }
      focusables[nextIndex].focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-open' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" onClick={closeMenu}>
          <span className="nav__mark" aria-hidden="true">
            {site.monogram}
          </span>
          {/* Stays in the accessibility tree even when visually hidden on small screens */}
          <span className="nav__name">{site.name}</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {isMenuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>

        <nav
          id="site-menu"
          ref={menuRef}
          className="nav__menu"
          aria-label="Primary"
          inert={isMobile && !isMenuOpen}
        >
          <ul className="nav__links">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={closeMenu}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="nav__pill"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="nav__link-label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="#contact" className="btn btn--ghost nav__cta" onClick={closeMenu}>
            Let&apos;s Connect
          </a>
        </nav>
      </div>
    </header>
  );
}

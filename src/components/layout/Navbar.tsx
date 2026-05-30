import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaBars, FaDownload, FaTimes } from 'react-icons/fa';
import { navLinks, personalInfo, sectionIds } from '../../data/resume';
import { useActiveSection } from '../../hooks/useActiveSection';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setIsOpen(false);
  };

  const navItems = navLinks.map((link) => (
    <button
      key={link.id}
      type="button"
      onClick={() => scrollToSection(link.id)}
      className={`relative px-1 py-2 text-sm font-semibold transition-colors ${
        activeSection === link.id ? 'text-navy' : 'text-mid hover:text-navy'
      }`}
    >
      {link.label}
      <span
        className={`absolute bottom-1 left-0 h-0.5 bg-teal transition-all duration-300 ${
          activeSection === link.id ? 'w-full' : 'w-0'
        }`}
      />
    </button>
  ));

  return (
    <header
      className={`fixed left-0 top-[3px] z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-sm backdrop-blur' : 'bg-white/70 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <button type="button" onClick={() => scrollToSection('hero')} className="flex items-center gap-3" aria-label="Go to top">
          <span className="relative grid h-10 w-10 place-items-center rounded bg-navy text-sm font-bold text-white">
            TS
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-teal" />
          </span>
          <span className="hidden text-sm font-semibold text-navy sm:block">Thara Sivanandam</span>
        </button>

        <div className="hidden items-center gap-5 lg:flex">{navItems}</div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={personalInfo.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            <FaDownload aria-hidden="true" />
            {personalInfo.ctas.resume}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-border text-navy lg:hidden"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-4 sm:px-6">
              {navItems}
              <a
                href={personalInfo.resumeUrl}
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy"
              >
                <FaDownload aria-hidden="true" />
                {personalInfo.ctas.resume}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


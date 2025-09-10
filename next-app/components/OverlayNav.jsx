"use client";
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createFocusTrap } from 'focus-trap';

const navVariants = {
  hidden: { y: -30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.1 },
  },
  exit: { y: -30, opacity: 0 },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/mission', label: 'Mission' },
  { to: '/approach', label: 'Approach' },
  { to: '/numbers', label: 'In Numbers' },
  { to: '/starters', label: 'Starters' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' }
];

export default function OverlayNav({ open, onLink }) {
  const navRef = useRef(null);

  useEffect(() => {
    let trap;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onLink();
      }
    };
    if (open && navRef.current) {
      document.addEventListener('keydown', handleKeyDown);
      trap = createFocusTrap(navRef.current, {
        initialFocus: navRef.current.querySelector('a'),
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        returnFocusOnDeactivate: true,
        onDeactivate: onLink,
      });
      trap.activate();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      trap?.deactivate();
    };
  }, [open, onLink]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onLink}
          />
          <motion.nav
            key="nav"
            ref={navRef}
            className="overlay-nav open space-y-6 text-2xl font-bold"
            aria-hidden={!open}
            role="dialog"
            aria-modal="true"
            variants={navVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {links.map((l) => (
              <motion.span key={l.to} variants={linkVariants}>
                <Link
                  href={l.to}
                  className="hover:text-red-600"
                  onClick={onLink}
                >
                  {l.label}
                </Link>
              </motion.span>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

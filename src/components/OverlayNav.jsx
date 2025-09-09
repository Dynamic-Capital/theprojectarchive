import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#mission', label: 'Mission' },
  { href: '#approach', label: 'Approach' },
  { href: '#numbers', label: 'In Numbers' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' }
];

export default function OverlayNav({ open, onLink }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          className="overlay-nav space-y-6 text-2xl font-bold"
          aria-hidden={!open}
          variants={navVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {links.map((l) => (
            <motion.a
              key={l.href}
              className="hover:text-red-600"
              href={l.href}
              onClick={onLink}
              variants={linkVariants}
            >
              {l.label}
            </motion.a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

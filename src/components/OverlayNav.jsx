import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              className="hover:text-red-600"
              href={l.href}
              onClick={onLink}
            >
              {l.label}
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

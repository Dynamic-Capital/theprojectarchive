'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createFocusTrap } from 'focus-trap';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/mission', label: 'Mission' },
  { to: '/approach', label: 'Approach' },
  { to: '/numbers', label: 'In Numbers' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function OverlayNav({ open, onLink }) {
  const trapRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const navVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduce
        ? { duration: 0 }
        : { when: 'beforeChildren', staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: shouldReduce ? 0 : -30 },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : -10 },
    show: { opacity: 1, y: 0, transition: shouldReduce ? { duration: 0 } : undefined },
  };

  useEffect(() => {
    if (!open) return;
    const trap = createFocusTrap(trapRef.current, {
      fallbackFocus: trapRef.current,
      initialFocus: '#overlay-nav a',
    });
    trap.activate();
    return () => trap.deactivate();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onLink();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onLink]);

  return (
    <AnimatePresence>
      {open && (
        <div ref={trapRef} role="dialog" aria-modal="true">
          <motion.div
            key="backdrop"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduce ? { duration: 0 } : undefined}
            onClick={onLink}
          />
          <motion.nav
            id="overlay-nav"
            key="nav"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'var(--fs-3)',
              fontWeight: 750,
              textAlign: 'center',
            }}
          >
            <motion.ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-5)',
              }}
              variants={navVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {links.map((l) => (
                <motion.li key={l.to} variants={linkVariants}>
                  <Link href={l.to} onClick={onLink}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}

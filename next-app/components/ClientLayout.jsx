"use client";
import { useState } from 'react';
import Header from './Header';
import OverlayNav from './OverlayNav';
import Footer from './Footer';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = (reduce) => ({
  initial: { opacity: 0, y: reduce ? 0 : 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: reduce
      ? { duration: 0 }
      : { type: 'spring', stiffness: 100, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: reduce ? 0 : -20,
    transition: reduce ? { duration: 0 } : { duration: 0.2 },
  },
});

export default function ClientLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Header onToggle={toggleNav} open={navOpen} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={pageVariants(reduceMotion)}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}

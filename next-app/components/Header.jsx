'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import styles from '../styles/Header.module.css';
import DesktopNav from './DesktopNav';

const topBar = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 7 },
};

const middleBar = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomBar = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -7 },
};

const headerVariants = {
  initial: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  hidden: { y: '-100%', opacity: 0 },
};

export default function Header({ onToggle, open }) {
  const { scrollY } = useScroll();
  const shouldReduce = useReducedMotion();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (shouldReduce) return;
    return scrollY.on('change', (latest) => {
      const previous = scrollY.getPrevious();
      if (latest > previous && latest > 50) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    });
  }, [scrollY, shouldReduce]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <motion.header
      className={`safe-p sticky top-0 w-full ${styles.header}`}
      variants={headerVariants}
      initial={shouldReduce ? false : 'initial'}
      animate={hidden && !shouldReduce ? 'hidden' : 'visible'}
      transition={shouldReduce ? { duration: 0 } : undefined}
    >
      <Link href="/" className={styles.brand}>
        The Project Archive
      </Link>
      <DesktopNav />
      <div className={styles.actions}>
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={styles.themeToggle}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        )}
        <motion.button
          className={styles.menuButton}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="overlay-nav"
          aria-expanded={open}
          onClick={onToggle}
          initial={false}
          animate={open ? 'open' : 'closed'}
          transition={shouldReduce ? { duration: 0 } : undefined}
        >
          <motion.span className={styles.bar} variants={topBar} transition={shouldReduce ? { duration: 0 } : undefined}></motion.span>
          <motion.span className={styles.bar} variants={middleBar} transition={shouldReduce ? { duration: 0 } : undefined}></motion.span>
          <motion.span className={styles.bar} variants={bottomBar} transition={shouldReduce ? { duration: 0 } : undefined}></motion.span>
        </motion.button>
      </div>
    </motion.header>
  );
}

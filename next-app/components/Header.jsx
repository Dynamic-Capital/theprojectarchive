'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import styles from '../styles/Header.module.css';

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

export default function Header({ onToggle, open }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -20]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <motion.header
      className={`safe-p sticky top-0 w-full ${styles.header}`}
      style={{ y }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link href="/" className={styles.brand}>
        The Project Archive
      </Link>
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
          onClick={onToggle}
          initial={false}
          animate={open ? 'open' : 'closed'}
        >
          <motion.span className={styles.bar} variants={topBar}></motion.span>
          <motion.span className={styles.bar} variants={middleBar}></motion.span>
          <motion.span className={styles.bar} variants={bottomBar}></motion.span>
        </motion.button>
      </div>
    </motion.header>
  );
}

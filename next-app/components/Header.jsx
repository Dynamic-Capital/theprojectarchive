'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

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
      className="site-header"
      style={{ y }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link href="/" className="site-header__brand">
        The Project Archive
      </Link>
      <div className="site-header__actions">
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
            className="theme-toggle"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        )}
        <motion.button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={onToggle}
          initial={false}
          animate={open ? 'open' : 'closed'}
        >
          <motion.span className="menu-bar" variants={topBar}></motion.span>
          <motion.span className="menu-bar" variants={middleBar}></motion.span>
          <motion.span className="menu-bar" variants={bottomBar}></motion.span>
        </motion.button>
      </div>
    </motion.header>
  );
}

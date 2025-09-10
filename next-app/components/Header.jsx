'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import navLinks from './navLinks';

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
      className="site-header fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-[var(--bg)]/80 backdrop-blur-md shadow z-50 text-[var(--text)]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ y }}
    >
      <Link href="/" className="logo text-xl font-bold">
        The Project Archive
      </Link>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex gap-4">
          {navLinks.map((l) => (
            <Link key={l.to} href={l.to} className="hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-xl"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        )}
        <motion.button
          className="hamburger md:hidden flex flex-col justify-between w-8 h-6"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={onToggle}
          initial={false}
          animate={open ? 'open' : 'closed'}
        >
          <motion.span
            className="block h-0.5 bg-[var(--text)]"
            variants={topBar}
          ></motion.span>
          <motion.span
            className="block h-0.5 bg-[var(--text)]"
            variants={middleBar}
          ></motion.span>
          <motion.span
            className="block h-0.5 bg-[var(--text)]"
            variants={bottomBar}
          ></motion.span>
        </motion.button>
      </div>
    </motion.header>
  );
}

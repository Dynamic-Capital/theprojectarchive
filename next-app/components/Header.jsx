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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4)',
        background: 'color-mix(in oklab, var(--bg), transparent 20%)',
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-1)',
        zIndex: 'var(--z-sticky)',
        color: 'var(--text)',
        y,
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link href="/" style={{ fontSize: 'var(--fs-2)', fontWeight: 750 }}>
        The Project Archive
      </Link>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}
      >
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ fontSize: 'var(--fs-2)' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        )}
        <motion.button
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '2rem',
            height: '1.5rem',
          }}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={onToggle}
          initial={false}
          animate={open ? 'open' : 'closed'}
        >
          <motion.span
            style={{
              display: 'block',
              height: '2px',
              background: 'var(--text)',
            }}
            variants={topBar}
          ></motion.span>
          <motion.span
            style={{
              display: 'block',
              height: '2px',
              background: 'var(--text)',
            }}
            variants={middleBar}
          ></motion.span>
          <motion.span
            style={{
              display: 'block',
              height: '2px',
              background: 'var(--text)',
            }}
            variants={bottomBar}
          ></motion.span>
        </motion.button>
      </div>
    </motion.header>
  );
}

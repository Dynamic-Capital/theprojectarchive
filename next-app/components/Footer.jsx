"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: 'var(--space-4)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p>
        Copyright &copy; {new Date().getFullYear()}{' '}
        <span
          style={{ color: 'var(--brand-500)', fontFamily: 'var(--font-sans)' }}
        >
          The Project Archive
        </span>
        . All rights reserved.
      </p>
      <nav
        aria-label="Footer"
        style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}
      >
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
      <div
        style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}
        aria-label="Social media links"
      >
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
    </motion.footer>
  );
}

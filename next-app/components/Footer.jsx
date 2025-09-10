"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="footer bg-[var(--bg)] text-[var(--text)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p>&copy; {new Date().getFullYear()} The Project Archive</p>
      <nav aria-label="Footer" className="footer-nav">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
      <div className="social-links" aria-label="Social media links">
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

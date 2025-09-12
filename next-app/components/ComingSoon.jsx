"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Layout from './Layout';

export default function ComingSoon() {
  return (
    <Layout
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: 'var(--space-5)',
        padding: 'var(--space-4)',
        textAlign: 'center'
      }}
    >
      <motion.h1
        style={{ fontSize: 'var(--fs-5)', fontWeight: 750 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Coming Soon
      </motion.h1>
      <motion.p
        style={{ fontSize: 'var(--fs-2)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Our new site is on the way. Stay tuned!
      </motion.p>
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>
          Contact us at{' '}
          <a href="mailto:info@theprojectarchives-4ud4t.ondigitalocean.app">
            info@theprojectarchives-4ud4t.ondigitalocean.app
          </a>
        </p>
        <p>
          Call{' '}
          <a href="tel:+9601234567">+960 123-4567</a>
        </p>
      </motion.div>
      <motion.div
        style={{ display: 'flex', gap: 'var(--space-4)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </motion.div>
    </Layout>
  );
}

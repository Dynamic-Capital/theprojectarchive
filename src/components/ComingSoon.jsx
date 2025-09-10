import React from 'react';
import { motion } from 'framer-motion';

export default function ComingSoon() {
  return (
    <motion.main
      className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Coming Soon
      </motion.h1>
      <motion.p
        className="text-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Our new site is on the way. Stay tuned!
      </motion.p>
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>
          Contact us at{' '}
          <a
            href="mailto:info@theprojectarchive.com"
            className="text-blue-500 hover:underline"
          >
            info@theprojectarchive.com
          </a>
        </p>
        <p>
          Call{' '}
          <a href="tel:+9601234567" className="text-blue-500 hover:underline">
            +960 123-4567
          </a>
        </p>
      </motion.div>
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Twitter
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Instagram
        </a>
      </motion.div>
    </motion.main>
  );
}

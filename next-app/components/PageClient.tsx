'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Hero from './Hero';
import Home from './Home';

export default function PageClient() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className="flex flex-col"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
    >
      <Hero />
      <Home />
    </motion.main>
  );
}

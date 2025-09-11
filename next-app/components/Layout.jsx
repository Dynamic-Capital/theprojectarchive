"use client";
import { motion, useReducedMotion } from 'framer-motion';

export default function Layout({ children, ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.main
      className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.5 }}
      {...props}
    >
      {children}
    </motion.main>
  );
}

"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { textVariants } from '../lib/animations';

export default function SectionHeader({ title, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <motion.h2
        style={{ marginBottom: 'var(--space-4)' }}
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {title}
      </motion.h2>
      {children && (
        <motion.p
          className="mx-auto max-w-3xl lg:max-w-5xl"
          variants={textVariants(reduceMotion)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {children}
        </motion.p>
      )}
    </>
  );
}

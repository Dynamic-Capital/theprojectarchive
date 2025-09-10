"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { textVariants } from '../lib/animations';

export default function SectionHeader({ title, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <motion.h2
        className="text-3xl font-bold mb-md"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {title}
      </motion.h2>
      {children && (
        <motion.p
          className="max-w-md mx-auto"
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

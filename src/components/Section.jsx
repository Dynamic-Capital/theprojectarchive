import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ id }) {
  return (
    <motion.section
      id={id}
      className="section glass fade-in"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.6 }}
    />
  );
}

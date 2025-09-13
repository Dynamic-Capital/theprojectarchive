"use client";
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function CompactEmailButton({
  email = 'hello@theprojectarchive.mv',
  label = 'Email Us',
  className = '',
  style,
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`mailto:${email}`}
      className={`button button--primary compact-email-button ${className}`.trim()}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={reduceMotion ? {} : { width: hovered ? '8rem' : '3rem' }}
      style={{ width: '3rem', overflow: 'hidden', ...style }}
      aria-label={label}
    >
      <span aria-hidden="true">✉</span>
      <motion.span
        className="label"
        aria-hidden="true"
        animate={reduceMotion ? {} : { opacity: hovered ? 1 : 0 }}
        style={{ whiteSpace: 'nowrap', marginLeft: 'var(--space-2)' }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

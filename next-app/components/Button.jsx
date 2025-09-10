"use client";
import { motion, useReducedMotion } from 'framer-motion';

export default function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const reduceMotion = useReducedMotion();
  const Component = href ? motion.a : motion.button;
  const variantClass = variant === 'secondary' ? 'btn--secondary' : 'btn--primary';
  return (
    <Component
      href={href}
      className={`btn ${variantClass} ${className}`.trim()}
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      {...props}
    >
      {children}
    </Component>
  );
}

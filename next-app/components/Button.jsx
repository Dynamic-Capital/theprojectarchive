'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function Button({
  href,
  variant = 'primary',
  className = '',
  style = undefined,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = href ? motion.a : motion.button;
  const variants = {
    primary: 'button button--primary',
    danger: 'button button--danger',
    secondary: 'button button--secondary',
    brand3d: 'button button--3d',
  };
  const variantClass = variants[variant] ?? 'button';
  return (
    <Component
      href={href}
      type={href ? undefined : 'button'}
      className={`${variantClass} ${className}`.trim()}
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

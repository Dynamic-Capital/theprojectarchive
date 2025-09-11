'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function Button({
  href,
  variant = 'primary',
  className = '',
  style,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = href ? motion.a : motion.button;
  const variantClass =
    variant === 'primary'
      ? 'button button--primary'
      : variant === 'danger'
        ? 'button button--danger'
        : 'button';
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

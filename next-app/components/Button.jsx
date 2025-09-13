'use client';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

// Centralized button style variants for reuse across components
export const buttonVariants = {
  primary: 'button button--primary',
  danger: 'button button--danger',
  secondary: 'button button--secondary',
  brand3d: 'button button--3d',
};

export default function Button({
  href,
  variant = 'primary',
  className,
  style,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = href ? motion.a : motion.button;
  const variantClass = buttonVariants[variant] ?? 'button';
  return (
    <Component
      href={href}
      type={href ? undefined : 'button'}
      className={clsx(variantClass, className)}
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

"use client";
import React from 'react';

/**
 * Component that adds default spacing combined with safe-area insets.
 *
 * @param {React.ElementType} [as='div'] - Component or tag to render.
 * @param {object} style - Additional inline styles.
 * @param {string} className - Additional class names.
 */
export default function SafeSpace({
  as: Component = 'div',
  children,
  style = {},
  className = '',
  ...props
}) {
  const padding = {
    paddingTop: `calc(var(--space-4) + var(--safe-top))`,
    paddingRight: `calc(var(--space-4) + var(--safe-right))`,
    paddingBottom: `calc(var(--space-4) + var(--safe-bottom))`,
    paddingLeft: `calc(var(--space-4) + var(--safe-left))`,
  };

  return (
    <Component className={className} style={{ ...padding, ...style }} {...props}>
      {children}
    </Component>
  );
}

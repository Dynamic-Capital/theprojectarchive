"use client";
import { motion } from 'framer-motion';

/**
 * LiquidGlass applies a morphing glassmorphic container using Framer Motion.
 * The container slowly animates its border radius and background color to
 * create a subtle "liquid" effect while preserving any passed motion props.
 */
export default function LiquidGlass({ className = '', children, animate = {}, transition = {}, ...props }) {
  const defaultAnimate = {
    borderRadius: [
      '40% 60% 60% 40% / 40% 40% 60% 60%',
      '60% 40% 40% 60% / 60% 60% 40% 40%',
      '40% 60% 60% 40% / 40% 40% 60% 60%'
    ],
    backgroundColor: [
      'rgba(255,255,255,0.1)',
      'rgba(255,255,255,0.15)',
      'rgba(255,255,255,0.1)'
    ]
  };

  const defaultTransition = {
    duration: 10,
    repeat: Infinity,
    repeatType: 'mirror'
  };

  return (
    <motion.div
      className={`glass ${className}`}
      animate={{ ...defaultAnimate, ...animate }}
      transition={{ ...defaultTransition, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

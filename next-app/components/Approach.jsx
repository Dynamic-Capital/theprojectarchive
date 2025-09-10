"use client";
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const spring = { type: 'spring', stiffness: 100, damping: 20 };
const textVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : spring,
  },
});

export default function Approach() {
  const reduceMotion = useReducedMotion();
  return (
    <ParallaxSection
      id="approach"
      image="https://picsum.photos/1920/1080?random=23"
      alt="Background image for Approach section"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Approach
      </motion.h2>
      <motion.p
        className="max-w-md mx-auto"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        We combine technical expertise with artistic vision to craft memorable
        imagery.
      </motion.p>
    </ParallaxSection>
  );
}

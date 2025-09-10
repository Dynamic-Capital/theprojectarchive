"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const textVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.5 },
  },
});

export default function About() {
  const reduceMotion = useReducedMotion();
  return (
    <ParallaxSection
      id="about"
      image="https://picsum.photos/1920/1080?random=21"
      alt="Background image for About section"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        About
      </motion.h2>
      <motion.p
        className="max-w-md mx-auto"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Learn more about our passion for capturing moments and the story behind
        our studio.
      </motion.p>
    </ParallaxSection>
  );
}

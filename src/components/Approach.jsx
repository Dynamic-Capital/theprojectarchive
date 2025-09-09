import React from 'react';
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Approach() {
  return (
    <ParallaxSection
      id="approach"
      image="https://picsum.photos/1920/1080?random=23"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Approach
      </motion.h2>
      <motion.p
        className="max-w-md mx-auto"
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        We combine technical expertise with artistic vision to craft memorable imagery.
      </motion.p>
    </ParallaxSection>
  );
}


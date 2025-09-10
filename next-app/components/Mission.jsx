"use client";
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Mission() {
  return (
    <ParallaxSection
      id="mission"
      image="/images/mission.svg"
      alt="Background image for Mission section"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Mission
      </motion.h2>
      <motion.p
        className="max-w-md mx-auto"
        variants={textVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Our mission is to deliver striking visuals that tell compelling stories
        for every client.
      </motion.p>
    </ParallaxSection>
  );
}

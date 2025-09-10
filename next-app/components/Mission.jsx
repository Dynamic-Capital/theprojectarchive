"use client";
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

export default function Mission() {
  const reduceMotion = useReducedMotion();
  return (
    <ParallaxSection
      id="mission"
      image="https://picsum.photos/1920/1080?random=22"
      alt="Background image for Mission section"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Mission
      </motion.h2>
      <motion.p
        className="max-w-md mx-auto"
        variants={textVariants(reduceMotion)}
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

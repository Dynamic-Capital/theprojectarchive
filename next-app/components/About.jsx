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

const containerVariants = (reduce) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: reduce ? 0 : 0.15 },
  },
});

const cardVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.4 },
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
      <motion.div
        className="grid gap-4 mt-8 sm:grid-cols-3"
        variants={containerVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {[
          {
            title: 'Our Story',
            text: 'From humble beginnings, we built a studio that celebrates creativity.',
          },
          {
            title: 'How We Work',
            text: 'A collaborative process that keeps you involved every step of the way.',
          },
          {
            title: 'The Team',
            text: 'A diverse crew of photographers, designers and storytellers.',
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            className="p-4 rounded-lg glass"
            variants={cardVariants(reduceMotion)}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </ParallaxSection>
  );
}

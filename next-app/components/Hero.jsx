"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import CurvedLoop from './CurvedLoopText.js';
import Hero3D from './Hero3D';
import Button from './Button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemUp = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : -20 },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6 } },
});

const itemDown = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6 } },
});

const ctaContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      id="home"
      className="hero fade-in relative min-h-screen flex items-center justify-center text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Image
        className="hero-media absolute inset-0 object-cover"
        src="https://picsum.photos/1920/1080?random=11"
        alt="A creative workspace with a camera and photo prints on a desk"
        fill
        sizes="100vw"
        priority
      />
      <div className="container relative z-10 bg-background/50 p-8 rounded-lg max-w-xl flex flex-col items-center justify-center text-center">
        <motion.h1 className="sr-only" variants={itemUp(reduceMotion)}>
          We're a Creative studio capturing stories in the Maldives
        </motion.h1>
        <motion.div
          className="mb-4"
          variants={itemUp(reduceMotion)}
          aria-hidden="true"
        >
          {reduceMotion ? (
            <span className="text-text text-xl tracking-widest">
              We're a Creative studio capturing stories in the Maldives
            </span>
          ) : (
            <CurvedLoop
              text={{
                text: "We're a Creative studio capturing stories in the Maldives",
                font: { fontFamily: 'sans-serif', fontWeight: '400', fontSize: 32 },
                color: 'var(--text)',
              }}
              direction="left"
              baseVelocity={50}
              curveAmount={300}
              draggable={false}
              fade={false}
            />
          )}
        </motion.div>
        <Hero3D />
        <motion.p
          className="tagline text-lg text-text mb-6"
          variants={itemDown(reduceMotion)}
        >
          Your journey fuels our achievements. Together, we create an impact, one at a time.
        </motion.p>
        <motion.div
          className="cta-group flex flex-col sm:flex-row gap-4 justify-center"
          variants={ctaContainer}
        >
          <Button
            href="#services"
            variant="primary"
            className="px-lg py-sm"
            variants={itemDown(reduceMotion)}
          >
            Explore Portfolio
          </Button>
          <Button
            href="#contact"
            variant="secondary"
            className="px-lg py-sm"
            variants={itemDown(reduceMotion)}
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

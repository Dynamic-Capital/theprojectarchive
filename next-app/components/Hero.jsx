"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

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

const curvedText = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : -20, rotate: 0 },
  show: {
    opacity: 1,
    y: 0,
    rotate: reduce ? 0 : 360,
    transition: {
      duration: reduce ? 0 : 0.6,
      rotate: reduce
        ? { }
        : { duration: 20, repeat: Infinity, ease: "linear" },
    },
  },
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
      <div className="container relative z-10 bg-black/50 p-8 rounded-lg max-w-xl flex flex-col items-center justify-center text-center">
        <motion.h1 className="sr-only" variants={itemUp(reduceMotion)}>
          The Project Archive
        </motion.h1>
        <motion.svg
          className="mb-4"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          variants={curvedText(reduceMotion)}
        >
          <path
            id="brandCircle"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            fill="none"
          />
          <motion.text className="fill-white text-xl tracking-widest">
            <textPath href="#brandCircle" startOffset="50%" textAnchor="middle">
              The Project Archive
            </textPath>
          </motion.text>
        </motion.svg>
        <motion.p
          className="tagline text-lg text-gray-200 mb-6"
          variants={itemDown(reduceMotion)}
        >
          Professional Photography
        </motion.p>
        <motion.div
          className="cta-group flex flex-col sm:flex-row gap-4 justify-center"
          variants={ctaContainer}
        >
          <motion.a
            className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
            href="#services"
            variants={itemDown(reduceMotion)}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            View Portfolio
          </motion.a>
          <motion.a
            className="btn bg-white text-gray-800 px-6 py-3 rounded hover:bg-gray-100"
            href="#contact"
            variants={itemDown(reduceMotion)}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

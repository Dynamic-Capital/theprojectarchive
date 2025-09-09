import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const itemDown = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ctaContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export default function Hero() {
  return (
    <motion.section
      id="home"
      className="hero fade-in relative min-h-screen flex items-center justify-center text-center"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <img
        className="hero-media absolute inset-0 w-full h-full object-cover"
        src="https://picsum.photos/1920/1080?random=11"
        alt="A creative workspace with a camera and photo prints on a desk"
      />
      <div className="container relative z-10 bg-black/50 p-8 rounded-lg max-w-xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          variants={itemUp}
        >
          The Project Archive
        </motion.h1>
        <motion.p
          className="tagline text-lg text-gray-200 mb-6"
          variants={itemDown}
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
            variants={itemDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
          </motion.a>
          <motion.a
            className="btn bg-white text-gray-800 px-6 py-3 rounded hover:bg-gray-100"
            href="#contact"
            variants={itemDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section
      id="home"
      className="hero fade-in relative min-h-screen flex items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img
        className="hero-media absolute inset-0 w-full h-full object-cover"
        src="https://picsum.photos/1920/1080?random=11"
        alt="A creative workspace with a camera and photo prints on a desk"
      />
      <div className="container relative z-10 bg-black/50 p-8 rounded-lg max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Project Archive</h1>
        <p className="tagline text-lg text-gray-200 mb-6">Professional Photography</p>
        <div className="cta-group flex flex-col sm:flex-row gap-4 justify-center">
          <a className="btn bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded" href="#services">View Portfolio</a>
          <a className="btn bg-white text-gray-800 px-6 py-3 rounded hover:bg-gray-100" href="#contact">Contact Me</a>
        </div>
      </div>
    </motion.section>
  );
}

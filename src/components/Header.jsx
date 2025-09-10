import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const topBar = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 7 },
};

const middleBar = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};

const bottomBar = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -7 },
};

export default function Header({ onToggle, open }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -20]);

  return (
    <motion.header
      className="site-header fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow z-50"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ y }}
    >
      <a href="#home" className="logo text-xl font-bold text-gray-800">The Project Archive</a>
      <motion.button
        className="hamburger flex flex-col justify-between w-8 h-6"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={onToggle}
        initial={false}
        animate={open ? 'open' : 'closed'}
      >
        <motion.span className="block h-0.5 bg-gray-800" variants={topBar}></motion.span>
        <motion.span className="block h-0.5 bg-gray-800" variants={middleBar}></motion.span>
        <motion.span className="block h-0.5 bg-gray-800" variants={bottomBar}></motion.span>
      </motion.button>
    </motion.header>
  );
}

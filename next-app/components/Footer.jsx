"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    />
  );
}

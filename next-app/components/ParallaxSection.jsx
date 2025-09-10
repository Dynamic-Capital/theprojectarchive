"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxSection({ id, image, alt = '', children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : y }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={true}
        />
      </motion.div>
      <motion.div
        className="relative z-10 glass p-8 text-center"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

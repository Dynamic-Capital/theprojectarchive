import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({ id, image, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section
      id={id}
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y }}
      />
      <motion.div
        className="relative z-10 glass p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  );
}


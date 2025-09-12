"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from './SectionHeader';

export default function ParallaxSection({
  id,
  image,
  alt = '',
  title,
  description,
  children,
  priority = false,
}) {
  if (!id || !image) {
    return null;
  }
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
      className="scroll-mt-header"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: reduceMotion ? 0 : y
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'color-mix(in oklab, var(--surface), transparent 30%)',
          backdropFilter: 'blur(8px)',
          padding: 'var(--space-6)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
      >
        {title && (
          <SectionHeader title={title}>{description}</SectionHeader>
        )}
        {children}
      </motion.div>
    </section>
  );
}

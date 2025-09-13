"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from './SectionHeader';

/**
 * Section with a parallax background image.
 * @param {string} id - Unique id used for anchor navigation.
 * @param {string} image - Background image URL.
 * @param {string} alt - Descriptive alternative text for the image.
 */
export default function ParallaxSection({
  id,
  image,
  alt = '',
  decorative = false,
  title,
  description,
  children,
  priority = false,
  overlay = false,
  maxWidth = 'max-w-3xl lg:max-w-5xl',
}) {
  // Allow the section to render even if the author forgets an alt text.
  // When no alt is provided we fall back to treating the image as
  // decorative instead of hiding the entire section which previously
  // caused parts of the landing page to disappear.
  if (!id || !image) {
    return null;
  }
  const isDecorative = decorative || !alt;
  const imageAlt = isDecorative ? '' : alt;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      ref={ref}
      className="scroll-mt-header relative flex min-h-[80dvh] md:min-h-[90dvh] lg:min-h-[100dvh] items-center justify-center overflow-hidden py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduceMotion ? 0 : 0.6 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: reduceMotion ? 0 : y
        }}
      >
        <Image
          src={image}
          alt={imageAlt}
          aria-hidden={isDecorative ? true : undefined}
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover"
        />
      </motion.div>
      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{
            background:
              typeof overlay === 'string'
                ? overlay
                : 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))'
          }}
        />
      )}
      <motion.div
        className={`relative z-20 text-center glass card mx-auto w-full ${maxWidth}`}
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
    </motion.section>
  );
}

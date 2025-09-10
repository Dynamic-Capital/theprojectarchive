"use client";
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const spring = { type: 'spring', stiffness: 100, damping: 20 };
const cardVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : spring,
  },
});
const slideVariants = (reduce) => ({
  enter: {
    x: reduce ? 0 : '100%',
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: reduce ? { duration: 0 } : spring,
  },
  exit: {
    x: reduce ? 0 : '-100%',
    opacity: 0,
    transition: reduce ? { duration: 0 } : spring,
  },
});

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'The team captured our vision perfectly and delivered beyond expectations.',
      author: 'Aisha R.',
    },
    {
      quote: 'Professional, creative, and a pleasure to work with from start to finish.',
      author: 'Luca M.',
    },
    {
      quote: 'Their attention to detail made our project shine.',
      author: 'Sara T.',
    },
  ];

  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  const reduceMotion = useReducedMotion();
  return (
    <ParallaxSection
      id="testimonials"
      image="https://picsum.photos/1920/1080?random=40"
      alt="Background image for Testimonials section"
    >
      <motion.h2
        className="text-3xl font-bold mb-8"
        variants={cardVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Testimonials
      </motion.h2>
      <div className="relative mt-8 mx-auto max-w-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            className="testimonial-card text-center"
            variants={slideVariants(reduceMotion)}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <blockquote>“{testimonials[index].quote}”</blockquote>
            <figcaption>— {testimonials[index].author}</figcaption>
          </motion.figure>
        </AnimatePresence>
        <motion.button
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
          aria-label="Previous testimonial"
          onClick={prev}
          whileHover={reduceMotion ? undefined : { scale: 1.1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        >
          &#8592;
        </motion.button>
        <motion.button
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
          aria-label="Next testimonial"
          onClick={next}
          whileHover={reduceMotion ? undefined : { scale: 1.1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        >
          &#8594;
        </motion.button>
      </div>
    </ParallaxSection>
  );
}

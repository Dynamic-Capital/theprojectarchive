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
      image="https://picsum.photos/id/1057/1600/900"
      alt=""
      decorative
      overlay
    >
      <motion.h2
        style={{ fontSize: 'var(--fs-4)', fontWeight: 750, marginBottom: 'var(--space-6)' }}
        variants={cardVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Testimonials
      </motion.h2>
      <div role="region" aria-label="Testimonials">
        <p className="sr-only" aria-live="polite">
          {`Showing testimonial ${index + 1} of ${testimonials.length}`}
        </p>
        <div
          style={{
            position: 'relative',
            marginTop: 'var(--space-6)',
            marginInline: 'auto',
            maxWidth: '36rem',
            overflow: 'hidden'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              style={{
                textAlign: 'center',
                padding: 'var(--space-5)',
                background: 'var(--surface)',
                border: 'var(--border-1)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-1)'
              }}
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
            style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', padding: 'var(--space-2)' }}
            aria-label="Previous testimonial"
            onClick={prev}
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            type="button"
          >
            &#8592;
          </motion.button>
          <motion.button
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', padding: 'var(--space-2)' }}
            aria-label="Next testimonial"
            onClick={next}
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            type="button"
          >
            &#8594;
          </motion.button>
        </div>
        <div
          style={{
            marginTop: 'var(--space-4)',
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-2)'
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                background: i === index ? 'var(--brand-500)' : 'var(--muted)'
              }}
            />
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}

"use client";
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

const cardVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.5 },
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
      <div className="testimonials-grid mt-8 text-left">
        {testimonials.map((t, idx) => (
          <motion.figure
            key={idx}
            className="testimonial-card"
            variants={cardVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>— {t.author}</figcaption>
          </motion.figure>
        ))}
      </div>
    </ParallaxSection>
  );
}

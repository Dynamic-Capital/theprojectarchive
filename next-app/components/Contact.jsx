'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { textVariants } from '../lib/animations';
import Button from './Button';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const reduceMotion = useReducedMotion();

  return (
    <ParallaxSection
      id="contact"
      image="https://picsum.photos/1920/1080?random=25"
      alt="Background image for Contact section"
      title="Contact"
    >
      <motion.form
        onSubmit={handleSubmit}
        style={{ maxWidth: '32rem', marginInline: 'auto', textAlign: 'left' }}
        className="space-y-4"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="form-input w-full"
        />

        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="form-input w-full"
        />

        <label htmlFor="message" className="block">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          className="form-textarea w-full"
        />

        <Button type="submit" style={{ marginTop: 'var(--space-2)' }}>
          Send Message
        </Button>
      </motion.form>
    </ParallaxSection>
  );
}

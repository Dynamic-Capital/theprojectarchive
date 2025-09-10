"use client";
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
        className="form max-w-md mx-auto text-left"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" className="input" required />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="input"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="textarea"
          rows="5"
          required
        />

        <Button type="submit" className="mt-xs">
          Send Message
        </Button>
      </motion.form>
    </ParallaxSection>
  );
}

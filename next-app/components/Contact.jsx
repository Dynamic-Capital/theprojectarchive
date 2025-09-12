"use client";
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { textVariants } from '../lib/animations';
import Button from './Button';
import CompactEmailButton from './CompactEmailButton';

export default function Contact() {
  const [status, setStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
        />

        <Button type="submit" style={{ marginTop: 'var(--space-2)' }}>
          Send Message
        </Button>
        {status === 'success' && (
          <p role="status" style={{ marginTop: 'var(--space-2)' }}>
            Message sent!
          </p>
        )}
        {status === 'error' && (
          <p role="status" style={{ marginTop: 'var(--space-2)' }}>
            Failed to send message.
          </p>
        )}
      </motion.form>
      <CompactEmailButton style={{ marginTop: 'var(--space-4)' }} />
    </ParallaxSection>
  );
}

"use client";
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { textVariants } from '../lib/animations';
import Button from './Button';
import CompactEmailButton from './CompactEmailButton';

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const newErrors = { name: '', email: '', message: '' };
    if (!data.name?.trim()) newErrors.name = 'Please enter your name.';
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Please enter a valid email address.';
    if (!data.message?.trim()) newErrors.message = 'Please enter a message.';

    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.message) return;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const contentType = res.headers?.get?.('content-type');
      const isJson = contentType ? contentType.includes('application/json') : true;
      if (res.ok && isJson) {
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
      image="https://picsum.photos/id/1027/1600/900"
      alt="Background image for Contact section"
      title="Contact"
      overlay
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
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
          onChange={() => setErrors((e) => ({ ...e, name: '' }))}
        />
        <span id="name-error" className="error-text">
          {errors.name}
        </span>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          onChange={() => setErrors((e) => ({ ...e, email: '' }))}
        />
        <span id="email-error" className="error-text">
          {errors.email}
        </span>

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
          onChange={() => setErrors((e) => ({ ...e, message: '' }))}
        />
        <span id="message-error" className="error-text">
          {errors.message}
        </span>

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

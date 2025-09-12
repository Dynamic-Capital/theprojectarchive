"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import { textVariants } from '../lib/animations';
import Button from './Button';
import CompactEmailButton from './CompactEmailButton';

export default function Contact() {
  const [status, setStatus] = useState(null);

  const schema = z.object({
    name: z.string().trim().min(1, 'Please enter your name.'),
    email: z
      .string()
      .trim()
      .email('Please enter a valid email address.'),
    message: z.string().trim().min(1, 'Please enter a message.'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
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
      alt=""
      decorative
      title="Contact"
      overlay
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '32rem', marginInline: 'auto', textAlign: 'left' }}
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register('name', { onChange: () => setStatus(null) })}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
          required
          autoComplete="name"
        />
        <span id="name-error" className="error-text">
          {errors.name?.message}
        </span>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', { onChange: () => setStatus(null) })}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          required
          autoComplete="email"
        />
        <span id="email-error" className="error-text">
          {errors.email?.message}
        </span>

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="5"
          {...register('message', { onChange: () => setStatus(null) })}
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
          required
          autoComplete="off"
        />
        <span id="message-error" className="error-text">
          {errors.message?.message}
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

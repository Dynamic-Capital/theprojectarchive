"use client";
import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function Approach() {
  const steps = [
    {
      icon: '🗺️',
      title: 'Consult',
      text: 'We start by learning about your goals and creative vision.'
    },
    {
      icon: '🎬',
      title: 'Create',
      text: 'Our team plans and captures each moment with precision and style.'
    },
    {
      icon: '📦',
      title: 'Deliver',
      text: 'Polished images are edited and delivered ready to share.'
    }
  ];

  return (
    <ParallaxSection
      id="approach"
      image="https://picsum.photos/id/1018/1600/900"
      alt=""
      decorative
      overlay
      title="Approach"
      description="We combine technical expertise with artistic vision to craft memorable imagery."
    >
      <ol
        style={{
          display: 'grid',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-6)',
          textAlign: 'left',
          maxWidth: '32rem',
          marginInline: 'auto'
        }}
      >
        {steps.map(({ icon, title, text }) => (
          <li
            key={title}
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              alignItems: 'flex-start'
            }}
          >
            <span
              aria-hidden="true"
              style={{ fontSize: 'var(--fs-3)' }}
            >
              {icon}
            </span>
            <span>
              <strong>{title}.</strong> {text}
            </span>
          </li>
        ))}
      </ol>
    </ParallaxSection>
  );
}

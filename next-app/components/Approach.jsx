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
      overlay="linear-gradient(135deg, color-mix(in oklab, var(--brand-600), transparent 20%), color-mix(in oklab, var(--brand-500), transparent 80%))"
      title="Approach"
      description="We combine technical expertise with artistic vision to craft memorable imagery."
    >
      <ol
        className="mt-6 grid grid-cols-1 gap-4 text-left mx-auto w-full max-w-3xl md:max-w-5xl md:grid-cols-3"
      >
        {steps.map(({ icon, title, text }) => (
          <li key={title} className="flex items-start gap-3">
            <span aria-hidden="true" className="text-[var(--fs-3)]">
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

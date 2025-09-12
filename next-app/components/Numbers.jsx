"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useInView, animate, useReducedMotion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

function Counter({ value = 0, label = '' }) {
  const target = Number(value) || 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplay(target);
      return;
    }

    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, target, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      aria-live="polite"
      aria-label={`${target} ${label}`.trim()}
      style={{ fontSize: 'var(--fs-5)', fontWeight: 750, display: 'block' }}
    >
      {display}
    </span>
  );
}

export default function Numbers() {
  const stats = [
    { label: 'Projects', value: 150 },
    { label: 'Clients', value: 85 },
    { label: 'Awards', value: 12 },
  ];

  return (
    <ParallaxSection
      id="numbers"
      image="https://picsum.photos/id/1045/1600/900"
      alt="Background image for In Numbers section"
      overlay
    >
      <h2 style={{ fontSize: 'var(--fs-4)', fontWeight: 750, marginBottom: 'var(--space-6)' }}>
        In Numbers
      </h2>
      <div
        style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center' }}
      >
        {stats.map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <Counter value={value} label={label} />
            <p>{label}</p>
          </div>
        ))}
      </div>
    </ParallaxSection>
  );
}

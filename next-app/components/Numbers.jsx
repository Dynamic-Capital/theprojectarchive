"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

function Counter({ value = 0 }) {
  const target = Number(value) || 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <span
      ref={ref}
      style={{ fontSize: 'var(--fs-5)', fontWeight: 750, display: 'block' }}
    >
      {display}
    </span>
  );
}

export default function Numbers() {
  return (
    <ParallaxSection
      id="numbers"
      image="https://picsum.photos/1920/1080?random=30"
      alt="Background image for In Numbers section"
    >
      <h2 style={{ fontSize: 'var(--fs-4)', fontWeight: 750, marginBottom: 'var(--space-6)' }}>
        In Numbers
      </h2>
      <div
        style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center' }}>
          <Counter value={150} />
          <p>Projects</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Counter value={85} />
          <p>Clients</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Counter value={12} />
          <p>Awards</p>
        </div>
      </div>
    </ParallaxSection>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';
import ParallaxSection from './ParallaxSection';

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-bold block">
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
      <h2 className="text-3xl font-bold mb-8">In Numbers</h2>
      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <Counter value={150} />
          <p>Projects</p>
        </div>
        <div className="text-center">
          <Counter value={85} />
          <p>Clients</p>
        </div>
        <div className="text-center">
          <Counter value={12} />
          <p>Awards</p>
        </div>
      </div>
    </ParallaxSection>
  );
}

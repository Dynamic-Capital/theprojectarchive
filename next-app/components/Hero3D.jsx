"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';

function RotatingBox({ reduceMotion }) {
  const ref = useRef();
  useFrame(() => {
    if (!reduceMotion && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0080" />
    </mesh>
  );
}

export default function Hero3D({ className = 'w-48 h-48 mb-6' }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <Canvas className={className} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <RotatingBox reduceMotion={reduceMotion} />
    </Canvas>
  );
}

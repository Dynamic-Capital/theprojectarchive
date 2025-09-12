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

export default function Hero3D({ style = { width: '12rem', height: '12rem', marginBottom: 'var(--space-5)' } }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div style={style} aria-hidden="true" />;
  }

  return (
    <Canvas style={style} camera={{ position: [0, 0, 5] }} aria-hidden="true">
      <ambientLight intensity={0.5} />
      <RotatingBox reduceMotion={reduceMotion} />
    </Canvas>
  );
}

'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

export default function Hero3D({
  style = { width: '12rem', height: '12rem', marginBottom: 'var(--space-5)' },
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div style={style} aria-hidden="true" />;
  }

  return (
    <Canvas style={style} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Box args={[2, 2, 2]}>
        <meshStandardMaterial color="#ff0080" />
      </Box>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduceMotion}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

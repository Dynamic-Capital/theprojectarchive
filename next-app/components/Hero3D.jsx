"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';

function RotatingBox({ reduceMotion, Motion }) {
  const ref = useRef();
  useFrame(() => {
    if (!reduceMotion && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });
  const Mesh = Motion ? Motion.mesh : 'mesh';
  return (
    <Mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff0080" />
    </Mesh>
  );
}

export default function Hero3D({ className = 'w-48 h-48 mb-6' }) {
  const reduceMotion = useReducedMotion();
  const [Motion, setMotion] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('framer-motion-3d')
      .then((mod) => {
        if (mounted) setMotion(() => mod.motion);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (reduceMotion) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <Canvas className={className} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <RotatingBox reduceMotion={reduceMotion} Motion={Motion} />
    </Canvas>
  );
}

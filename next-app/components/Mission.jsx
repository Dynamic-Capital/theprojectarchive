"use client";
import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function Mission() {
  return (
    <ParallaxSection
      id="mission"
      image="https://picsum.photos/id/1035/1600/900"
      alt=""
      decorative
      overlay="linear-gradient(to top, color-mix(in oklab, var(--accent-500), transparent 20%), color-mix(in oklab, var(--brand-500), transparent 80%))"
      title="Mission"
      description="Our mission is to deliver striking visuals that tell compelling stories for every client."
    />
  );
}

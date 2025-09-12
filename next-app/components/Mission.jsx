"use client";
import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function Mission() {
  return (
    <ParallaxSection
      id="mission"
      image="https://picsum.photos/id/1035/1600/900"
      alt="Background image for Mission section"
      overlay
      title="Mission"
      description="Our mission is to deliver striking visuals that tell compelling stories for every client."
    />
  );
}

import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function Mission() {
  return (
    <ParallaxSection
      id="mission"
      image="https://picsum.photos/1920/1080?random=22"
    >
      <h2 className="text-3xl font-bold mb-4">Mission</h2>
      <p className="max-w-md mx-auto">
        Our mission is to deliver striking visuals that tell compelling stories for every client.
      </p>
    </ParallaxSection>
  );
}


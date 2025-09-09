import React from 'react';
import ParallaxSection from './ParallaxSection.jsx';

export default function Approach() {
  return (
    <ParallaxSection
      id="approach"
      image="https://picsum.photos/1920/1080?random=23"
    >
      <h2 className="text-3xl font-bold mb-4">Approach</h2>
      <p className="max-w-md mx-auto">
        We combine technical expertise with artistic vision to craft memorable imagery.
      </p>
    </ParallaxSection>
  );
}


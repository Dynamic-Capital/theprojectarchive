import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function About() {
  return (
    <ParallaxSection
      id="about"
      image="https://picsum.photos/1920/1080?random=21"
    >
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="max-w-md mx-auto">
        Learn more about our passion for capturing moments and the story behind our studio.
      </p>
    </ParallaxSection>
  );
}


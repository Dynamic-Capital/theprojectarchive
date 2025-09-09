import React from 'react';
import ParallaxSection from './ParallaxSection.jsx';

export default function Services() {
  return (
    <ParallaxSection
      id="services"
      image="https://picsum.photos/1920/1080?random=24"
    >
      <h2 className="text-3xl font-bold mb-4">Services</h2>
      <p className="max-w-md mx-auto">
        Explore the range of photography services we offer for individuals and businesses.
      </p>
    </ParallaxSection>
  );
}


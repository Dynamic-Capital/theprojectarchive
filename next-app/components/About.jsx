"use client";
import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function About() {
  return (
    <ParallaxSection
      id="about"
      image="https://picsum.photos/1920/1080?random=21"
      alt="Background image for About section"
      title="About"
      description="Learn more about our passion for capturing moments and the story behind our studio."
    />
  );
}

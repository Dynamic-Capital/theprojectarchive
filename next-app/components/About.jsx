"use client";
import React from 'react';
import ParallaxSection from './ParallaxSection';

export default function About() {
  return (
    <ParallaxSection
      id="about"
      image="https://picsum.photos/id/1011/1600/900"
      alt=""
      decorative
      overlay
      title="About"
      description="Learn more about our passion for capturing moments and the story behind our studio."
    />
  );
}

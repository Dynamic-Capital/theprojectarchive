import React from 'react';
import ParallaxSection from './ParallaxSection.jsx';

export default function Contact() {
  return (
    <ParallaxSection
      id="contact"
      image="https://picsum.photos/1920/1080?random=25"
    >
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
      <p className="max-w-md mx-auto">
        Get in touch to discuss your project or schedule a session with our team.
      </p>
    </ParallaxSection>
  );
}


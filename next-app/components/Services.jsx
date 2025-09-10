"use client";
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { stackCardVariants } from '../lib/animations';

export default function Services({ openLightbox, images = [] }) {
  const reduceMotion = useReducedMotion();
  const [cards, setCards] = useState(
    images.length > 0
      ? images
      : [
          'https://picsum.photos/400/300?random=31',
          'https://picsum.photos/400/300?random=32',
          'https://picsum.photos/400/300?random=33',
          'https://picsum.photos/400/300?random=34',
          'https://picsum.photos/400/300?random=35',
          'https://picsum.photos/400/300?random=36',
        ]
  );

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      setCards((c) => [...c.slice(1), c[0]]);
    }
  };

  return (
    <ParallaxSection
      id="services"
      image="https://picsum.photos/1920/1080?random=24"
      alt="Background image for Services section"
      title="Services"
      description="Explore the range of photography services we offer for individuals and businesses."
    >
      <div className="relative w-72 h-52 md:w-[400px] md:h-[300px] mx-auto mt-lg">
        {cards.slice(0, 3).map((img, i) => (
          <motion.div
            key={img}
            className="absolute inset-0 rounded-lg shadow-lg overflow-hidden cursor-grab"
            style={{ zIndex: cards.length - i, top: i * 6, left: i * 6 }}
            variants={stackCardVariants(i, reduceMotion)}
            initial="initial"
            animate="animate"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            whileDrag={{ rotate: 5 }}
            onDragEnd={handleDragEnd}
            onClick={() => openLightbox && openLightbox(img)}
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="100%"
              className="object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
    </ParallaxSection>
  );
}

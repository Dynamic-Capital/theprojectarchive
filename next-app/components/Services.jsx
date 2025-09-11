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
          {
            src: 'https://picsum.photos/400/300?random=31',
            alt: 'Bride and groom pose on a sunny beach during a wedding shoot',
          },
          {
            src: 'https://picsum.photos/400/300?random=32',
            alt: 'Product photo of a wristwatch on a wooden table',
          },
          {
            src: 'https://picsum.photos/400/300?random=33',
            alt: 'Aerial drone shot of a tropical island resort',
          },
          {
            src: 'https://picsum.photos/400/300?random=34',
            alt: 'Corporate portrait of a smiling entrepreneur in an office',
          },
          {
            src: 'https://picsum.photos/400/300?random=35',
            alt: 'Interior photo of a modern workspace with natural light',
          },
          {
            src: 'https://picsum.photos/400/300?random=36',
            alt: 'Food photography of a gourmet dish on a plate',
          },
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
      <div
        style={{
          position: 'relative',
          width: '18rem',
          height: '13rem',
          marginInline: 'auto',
          marginTop: 'var(--space-6)'
        }}
      >
        {cards.slice(0, 3).map((img, i) => (
          <motion.div
            key={img.src}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-2)',
              overflow: 'hidden',
              cursor: 'grab',
              zIndex: cards.length - i,
              top: i * 6,
              left: i * 6
            }}
            variants={stackCardVariants(i, reduceMotion)}
            initial="initial"
            animate="animate"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            whileDrag={{ rotate: 5 }}
            onDragEnd={handleDragEnd}
            onClick={() => openLightbox && openLightbox(img.src)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
              sizes="100%"
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
    </ParallaxSection>
  );
}

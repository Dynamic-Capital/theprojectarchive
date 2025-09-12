"use client";
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import { stackCardVariants } from '../lib/animations';
import serviceImages from '../lib/serviceImages';

export default function Services({ openLightbox, images = [] }) {
  const reduceMotion = useReducedMotion();
  const [cards, setCards] = useState(
    images.length > 0 ? images : serviceImages
  );

  // Keep the displayed cards in sync with the `images` prop. Without this
  // effect the component would continue to show the initial images even if
  // a new set is provided by the parent after the first render.
  useEffect(() => {
    setCards(images.length > 0 ? images : serviceImages);
  }, [images]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) {
      setCards((c) => [...c.slice(1), c[0]]);
    }
  };

  return (
      <ParallaxSection
        id="services"
        image="https://picsum.photos/id/1050/1600/900"
        alt=""
        decorative
        title="Services"
        description="Explore the range of photography services we offer for individuals and businesses."
        overlay
      >
        <div
          className="relative mx-auto mt-[var(--space-6)] w-full max-w-sm h-52 sm:max-w-md sm:h-56"
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
            onClick={() => openLightbox && openLightbox(img.src, img.alt)}
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

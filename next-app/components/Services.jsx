"use client";
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';

const textVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: { opacity: 1, y: 0 },
});

const cardVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 40 },
  show: { opacity: 1, y: 0 },
});

export default function Services({ openLightbox, images = [] }) {
  const reduceMotion = useReducedMotion();
  const cards =
    images.length > 0
      ? images
      : [
          '/images/service1.svg',
          '/images/service2.svg',
          '/images/service3.svg',
          '/images/service4.svg',
          '/images/service5.svg',
          '/images/service6.svg',
        ];

  return (
    <ParallaxSection
      id="services"
      image="/images/services-bg.svg"
      alt="Background image for Services section"
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Services
      </motion.h2>
      <motion.p
        className="max-w-md mx-auto"
        variants={textVariants(reduceMotion)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        Explore the range of photography services we offer for individuals and
        businesses.
      </motion.p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {cards.map((img, i) => (
          <motion.button
            key={img}
            type="button"
            className="srv-card cursor-pointer overflow-hidden rounded shadow focus:outline-none"
            variants={cardVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => openLightbox && openLightbox(img)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox && openLightbox(img);
              }
            }}
            aria-label={`View gallery image ${i + 1}`}
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-full"
            />
          </motion.button>
        ))}
      </div>
    </ParallaxSection>
  );
}

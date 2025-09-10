"use client";
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';

const spring = { type: 'spring', stiffness: 100, damping: 20 };
const textVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : spring,
  },
});

const cardVariants = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0 } : spring,
  },
});

export default function Services({ openLightbox, images = [] }) {
  const reduceMotion = useReducedMotion();
  const cards =
    images.length > 0
      ? images
      : [
          'https://picsum.photos/400/300?random=31',
          'https://picsum.photos/400/300?random=32',
          'https://picsum.photos/400/300?random=33',
          'https://picsum.photos/400/300?random=34',
          'https://picsum.photos/400/300?random=35',
          'https://picsum.photos/400/300?random=36',
        ];

  return (
    <ParallaxSection
      id="services"
      image="https://picsum.photos/1920/1080?random=24"
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
          <motion.div
            key={img}
            className="srv-card cursor-pointer overflow-hidden rounded shadow"
            variants={cardVariants(reduceMotion)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => openLightbox && openLightbox(img)}
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </ParallaxSection>
  );
}

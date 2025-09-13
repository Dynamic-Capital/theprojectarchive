"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Hero from '../components/Hero';
import Home from '../components/Home';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'The Project Archive | Creative studio in the Maldives',
  description:
    'Discover The Project Archive, a creative studio offering design, development, and photography services in the Maldives.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Project Archive',
    description:
      'Creative studio in the Maldives offering design, development, and photography services.',
    url: siteUrl,
    siteName: 'The Project Archive',
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'The Project Archive preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Project Archive',
    description:
      'Creative studio in the Maldives offering design, development, and photography services.',
    images: [`${siteUrl}/og-image.svg`],
  },
};

export default function Page() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      className="flex flex-col"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
    >
      <Hero />
      <Home />
    </motion.main>
  );
}

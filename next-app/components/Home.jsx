'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import PortfolioPreview from './PortfolioPreview';
import Testimonials from './Testimonials';
import About from './About';
import Mission from './Mission';
import Approach from './Approach';
import Numbers from './Numbers';
import ServicesStack from './ServicesStack';
import Contact from './Contact';
import TiltCard from './TiltCard';

const serviceItems = [
  {
    title: 'Portrait Photography',
    description: 'Professional headshots and portrait sessions.',
    cta: 'Book a session',
    href: '#contact',
  },
  {
    title: 'Event Coverage',
    description: 'Document corporate events or family gatherings with style.',
  },
  {
    title: 'Product Shoots',
    description: 'Clean and vibrant images to showcase your products online.',
    cta: 'Get a quote',
    href: '#contact',
  },
  {
    title: 'Drone Photography',
    description: 'Aerial imagery capturing unique perspectives from above.',
  },
];

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [100, 0]);
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setShowButton(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);
  const reduceMotion = useReducedMotion();

  const pathname = usePathname();

  const supportsSmoothScroll =
    typeof document !== 'undefined' &&
    'scrollBehavior' in document.documentElement.style;

  useEffect(() => {
    const section = pathname.slice(1);
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        try {
          el.scrollIntoView({
            behavior: supportsSmoothScroll ? 'smooth' : 'auto',
          });
        } catch (err) {
          console.error('Scroll into view failed', err);
        }
      }
    } else {
      try {
        window.scrollTo({
          top: 0,
          behavior: supportsSmoothScroll ? 'smooth' : 'auto',
        });
      } catch (err) {
        console.error('Scroll to top failed', err);
      }
    }
  }, [pathname, supportsSmoothScroll]);

  return (
    <>
      <PortfolioPreview />
      <Testimonials />
      <About />
      <Mission />
      <Approach />
      <Numbers />
      <p className="mx-auto max-w-2xl text-center">
        We offer a full suite of creative services tailored to your brand.
      </p>
      <ServicesStack items={serviceItems} />
      <Contact />
      <TiltCard className="mx-auto my-16 max-w-sm p-8 glass rounded-xl text-center">
        <h3 className="text-lg font-semibold">Interactive Card</h3>
        <p className="mt-2 text-sm">Move your cursor to tilt.</p>
      </TiltCard>
      <motion.button
        style={{
          position: 'fixed',
          bottom: 'max(var(--space-4), env(safe-area-inset-bottom))',
          right: 'var(--space-4)',
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          border: 'var(--border-1)',
          background: 'var(--surface)',
          color: 'var(--text)',
          boxShadow: 'var(--shadow-1)',
          y,
          opacity,
          pointerEvents: showButton ? 'auto' : 'none',
        }}
        aria-label="Scroll to top"
        aria-hidden={!showButton}
        tabIndex={showButton ? 0 : -1}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: supportsSmoothScroll ? 'smooth' : 'auto',
          })
        }
        whileHover={reduceMotion ? undefined : { scale: 1.1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      >
        &#8679;
      </motion.button>
    </>
  );
}


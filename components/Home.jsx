"use client";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Hero from './Hero';
import About from './About';
import Mission from './Mission';
import Approach from './Approach';
import Numbers from './Numbers';
import Starters from './Starters';
import Services from './Services';
import Contact from './Contact';

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const openLightbox = (img) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [100, 0]);
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);

  const pathname = usePathname();

  useEffect(() => {
    const section = pathname.slice(1);
    if (section && section !== 'main') {
      const el = document.getElementById(section);
      if (el) {
        try {
          el.scrollIntoView({ behavior: 'smooth' });
        } catch {
          /* empty */
        }
      }
    } else {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        /* empty */
      }
    }
  }, [pathname]);

  const serviceImages = [
    'https://picsum.photos/400/300?random=31',
    'https://picsum.photos/400/300?random=32',
    'https://picsum.photos/400/300?random=33',
    'https://picsum.photos/400/300?random=34',
    'https://picsum.photos/400/300?random=35',
    'https://picsum.photos/400/300?random=36',
  ];

  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Approach />
      <Numbers />
      <Starters />
      <Services openLightbox={openLightbox} images={serviceImages} />
      <Contact />
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-hidden={!lightboxOpen}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={closeLightbox}
          >
            <img
              src={lightboxImg}
              alt="Selected service image"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.button
              className="close-btn"
              aria-label="Close image"
              onClick={closeLightbox}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              &times;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="scroll-top"
        aria-label="Scroll to top"
        style={{ y, opacity }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        &#8679;
      </motion.button>
    </>
  );
}

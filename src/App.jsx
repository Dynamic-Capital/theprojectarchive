import React, { useState } from 'react';
import './styles.css';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Header from './components/Header';
import OverlayNav from './components/OverlayNav';
import Hero from './components/Hero';
import About from './components/About';
import Mission from './components/Mission';
import Approach from './components/Approach';
import Numbers from './components/Numbers';
import Starters from './components/Starters';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const openLightbox = (img) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [100, 0]);
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);

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
      <Header onToggle={toggleNav} open={navOpen} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      <Hero />
      <About />
      <Mission />
      <Approach />
      <Numbers />
      <Starters />
      <Services openLightbox={openLightbox} images={serviceImages} />
      <Contact />
      <Footer />
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="lightbox"
            aria-hidden={!lightboxOpen}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <img src={lightboxImg} alt="Selected service image" />
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

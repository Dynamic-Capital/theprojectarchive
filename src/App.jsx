import React, { useState } from 'react';
import './styles.css';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header.jsx';
import OverlayNav from './components/OverlayNav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Mission from './components/Mission.jsx';
import Approach from './components/Approach.jsx';
import Numbers from './components/Numbers.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [100, 0]);
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <>
      <Header onToggle={toggleNav} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      <Hero />
      <About />
      <Mission />
      <Approach />
      <Numbers />
      <Services />
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
            <img src="https://picsum.photos/400/300?random=12" alt="" />
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

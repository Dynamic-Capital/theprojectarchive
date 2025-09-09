import React, { useState } from 'react';
import './styles.css';
import Header from './components/Header.jsx';
import OverlayNav from './components/OverlayNav.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);

  return (
    <>
      <Header onToggle={toggleNav} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      <Hero />
      <Section id="about" />
      <Section id="mission" />
      <Section id="approach" />
      <Section id="numbers" />
      <Section id="services" />
      <Section id="contact" />
      <Footer />
      <div className="lightbox" aria-hidden="true">
        <img src="https://picsum.photos/400/300?random=12" alt="" />
        <button className="close-btn" aria-label="Close image">&times;</button>
      </div>
      <button className="scroll-top" aria-label="Scroll to top">&#8679;</button>
    </>
  );
}

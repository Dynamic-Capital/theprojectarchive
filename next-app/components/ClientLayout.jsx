"use client";
import { useState } from 'react';
import Header from './Header';
import OverlayNav from './OverlayNav';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);

  return (
    <>
      <Header onToggle={toggleNav} open={navOpen} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      {children}
      <Footer />
    </>
  );
}

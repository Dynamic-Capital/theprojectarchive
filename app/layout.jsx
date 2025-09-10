"use client";
import './globals.css';
import { useState } from 'react';
import Header from '../components/Header';
import OverlayNav from '../components/OverlayNav';
import Footer from '../components/Footer';

export const metadata = {
  title: 'The Project Archive',
};

export default function RootLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);

  return (
    <html lang="en">
      <body>
        <Header onToggle={toggleNav} open={navOpen} />
        <OverlayNav open={navOpen} onLink={closeNav} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

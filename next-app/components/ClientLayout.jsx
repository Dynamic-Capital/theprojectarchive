"use client";
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from './Header';
import OverlayNav from './OverlayNav';
import Footer from './Footer';
import PageTransition from './PageTransition';
import ChatWidget from './ChatWidget';

export default function ClientLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);
  return (
    <SessionProvider>
      <Header onToggle={toggleNav} open={navOpen} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <ChatWidget />
    </SessionProvider>
  );
}

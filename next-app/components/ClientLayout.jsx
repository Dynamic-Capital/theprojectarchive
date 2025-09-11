'use client';
import { useState } from 'react';
import Header from './Header';
import OverlayNav from './OverlayNav';
import Footer from './Footer';
import PageTransition from './PageTransition';
import dynamic from 'next/dynamic';
import SEO from '../next-seo.config';

const DefaultSeo = dynamic(() => import('next-seo').then((m) => m.DefaultSeo), {
  ssr: false,
});

export default function ClientLayout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen((o) => !o);
  const closeNav = () => setNavOpen(false);
  return (
    <>
      <DefaultSeo {...SEO} />
      <Header onToggle={toggleNav} open={navOpen} />
      <OverlayNav open={navOpen} onLink={closeNav} />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}

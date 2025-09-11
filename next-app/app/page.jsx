'use client';
import Home from '../components/Home';
import dynamic from 'next/dynamic';

const NextSeo = dynamic(() => import('next-seo').then((m) => m.NextSeo), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <NextSeo title="Home | The Project Archive" />
      <Home />
    </>
  );
}

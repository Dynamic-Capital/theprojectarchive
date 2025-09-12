'use client';
import { useEffect } from 'react';
import Error from '../components/Error';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Error',
  description: 'An unexpected error occurred.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Error',
    description: 'An unexpected error occurred.',
    url: `${siteUrl}/error`,
  },
  twitter: {
    card: 'summary',
    title: 'Error',
    description: 'An unexpected error occurred.',
  },
};

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error reset={reset} />;
}


'use client';
import { useEffect } from 'react';
import Error from '../components/Error';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error reset={reset} />;
}


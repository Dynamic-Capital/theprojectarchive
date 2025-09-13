'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PortfolioPreview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  if (loading) {
    return <p className="text-center" aria-live="polite">Loading portfolio...</p>;
  }
  return (
    <section className="mt-8" aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading" className="text-center">Recent Work</h2>
      <div className="grid grid--3 mt-4">
        <Image
          src="https://picsum.photos/seed/portfolio1/400/300"
          alt="Portrait session"
          width={400}
          height={300}
        />
        <Image
          src="https://picsum.photos/seed/portfolio2/400/300"
          alt="Beach wedding"
          width={400}
          height={300}
        />
        <Image
          src="https://picsum.photos/seed/portfolio3/400/300"
          alt="Corporate meeting"
          width={400}
          height={300}
        />
      </div>
    </section>
  );
}

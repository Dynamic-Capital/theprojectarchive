'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPreview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  if (loading) {
    return <p className="text-center" aria-live="polite">Loading portfolio...</p>;
  }
  const items = [
    {
      src: 'https://picsum.photos/seed/portfolio1/400/300',
      alt: 'Portrait session',
      title: 'Portrait Session',
    },
    {
      src: 'https://picsum.photos/seed/portfolio2/400/300',
      alt: 'Beach wedding',
      title: 'Beach Wedding',
    },
    {
      src: 'https://picsum.photos/seed/portfolio3/400/300',
      alt: 'Corporate meeting',
      title: 'Corporate Meeting',
    },
  ];

  return (
    <section className="mt-8" aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading" className="text-center">Recent Work</h2>
      <div className="grid grid--3 mt-4 gap-4">
        {items.map((item) => (
          <figure key={item.src} className="text-center">
            <Link href="/portfolio" className="group block">
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={300}
                className="rounded-md"
              />
              <figcaption className="mt-2 text-sm group-hover:underline">
                {item.title}
              </figcaption>
            </Link>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-center">
        <Link href="/portfolio" className="underline">
          View full portfolio <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}

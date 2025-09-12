import Home from '../../components/Home';
import { notFound } from 'next/navigation';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const sections = [
  'about',
  'mission',
  'approach',
  'numbers',
  'services',
  'testimonials',
  'contact',
];

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export function generateMetadata({ params }) {
  const section = params.section.toLowerCase();
  const capitalized = section.charAt(0).toUpperCase() + section.slice(1);
  const title = `${capitalized} - The Project Archive`;
  const description = `Learn more about ${section} at The Project Archive.`;
  return {
    title,
    description,
    alternates: { canonical: `/${section}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${section}`,
      siteName: 'The Project Archive',
      images: [`${siteUrl}/og-image.svg`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/og-image.svg`],
    },
  };
}

export default function SectionPage({ params }) {
  const section = params?.section?.toLowerCase();
  if (!section || !sections.includes(section)) {
    notFound();
  }
  return <Home />;
}


import PageClient from '../components/PageClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'The Project Archive | Creative studio in the Maldives',
  description:
    'Discover The Project Archive, a creative studio offering design, development, and photography services in the Maldives.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Project Archive',
    description:
      'Creative studio in the Maldives offering design, development, and photography services.',
    url: siteUrl,
    siteName: 'The Project Archive',
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: 'The Project Archive preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Project Archive',
    description:
      'Creative studio in the Maldives offering design, development, and photography services.',
    images: [`${siteUrl}/og-image.svg`],
  },
};

export default function Page() {
  return <PageClient />;
}

import '../styles/reset.css';
import '../styles/tokens.css';
import '../styles/globals.css';
import ClientLayout from '../components/ClientLayout';
import { ThemeProvider } from 'next-themes';
import { logRuntimeInfo } from '../lib/logRuntime';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'The Project Archive',
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Malé',
    addressCountry: 'MV',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '4.175278',
    longitude: '73.508889',
  },
  sameAs: [
    'https://www.instagram.com/theprojectarchive',
    'https://twitter.com/theprojectarchive',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Design' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Development' },
    },
    {
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: 'Photography' },
    },
  ],
};

logRuntimeInfo();

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title:
    'The Project Archive - Creative studio for design, development, and photography',
  description:
    'Creative studio in the Maldives offering design, development, and photography services.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title:
      'The Project Archive - Creative studio for design, development, and photography',
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
    title:
      'The Project Archive - Creative studio for design, development, and photography',
    description:
      'Creative studio in the Maldives offering design, development, and photography services.',
    images: [`${siteUrl}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

import '../styles/reset.css';
import '../styles/tokens.css';
import '../styles/globals.css';
import ClientLayout from '../components/ClientLayout';
import { ThemeProvider } from 'next-themes';
import { logRuntimeInfo } from '../lib/logRuntime';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Use provided NEXT_PUBLIC_SITE_URL or default to localhost for development
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      url: siteUrl,
      name: 'The Project Archive',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}#business`,
      name: 'The Project Archive',
      url: siteUrl,
      logo: `${siteUrl}/logo-dark.svg`,
      telephone: '+9607495687',
      email: 'hello@theprojectarchive.mv',
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
        'https://www.instagram.com/theprojectarchive.mv/',
        'https://www.facebook.com/61570311241783',
        'https://www.tiktok.com/@theprojectarchive.mv',
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
  keywords: [
    'design',
    'development',
    'photography',
    'Maldives',
    'creative studio',
  ],
  authors: [{ name: 'The Project Archive', url: siteUrl }],
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
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    },
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
        <a href="#home" className="sr-only focus:not-sr-only">Skip to main content</a>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

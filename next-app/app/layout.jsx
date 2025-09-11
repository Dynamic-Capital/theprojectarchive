import '../styles/reset.css';
import '../styles/tokens.css';
import '../styles/globals.css';
import ClientLayout from '../components/ClientLayout';
import { ThemeProvider } from 'next-themes';
import { logRuntimeInfo } from '../lib/logRuntime';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Project Archive',
  url: 'https://theprojectarchive.com',
  logo: 'https://theprojectarchive.com/favicon.svg',
  sameAs: [
    'https://www.instagram.com/theprojectarchive',
    'https://twitter.com/theprojectarchive',
  ],
};

logRuntimeInfo();

export const metadata = {
  metadataBase: new URL('https://theprojectarchive.com'),
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
    url: 'https://theprojectarchive.com',
    siteName: 'The Project Archive',
    images: [
      {
        url: 'https://theprojectarchive.com/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'The Project Archive logo',
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
    images: ['https://theprojectarchive.com/favicon.svg'],
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

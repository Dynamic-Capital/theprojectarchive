import ComingSoon from '../../components/ComingSoon';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: 'Coming Soon - The Project Archive',
  description: 'We are working on something great. Stay tuned!',
  alternates: {
    canonical: '/coming-soon',
  },
  openGraph: {
    title: 'Coming Soon - The Project Archive',
    description: 'We are working on something great. Stay tuned!',
    url: `${siteUrl}/coming-soon`,
    siteName: 'The Project Archive',
    images: [`${siteUrl}/og-image.svg`],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coming Soon - The Project Archive',
    description: 'We are working on something great. Stay tuned!',
    images: [`${siteUrl}/og-image.svg`],
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ComingSoon />;
}

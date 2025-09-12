import NotFound from '../components/NotFound';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: false },
  openGraph: {
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
    url: `${siteUrl}/404`,
  },
  twitter: {
    card: 'summary',
    title: '404 - Page Not Found',
    description: 'The page you are looking for could not be found.',
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}

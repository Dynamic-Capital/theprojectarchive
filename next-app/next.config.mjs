/* eslint-env node */
import bundleAnalyzer from '@next/bundle-analyzer';
/** @type {import('next').NextConfig} */
// Allow Next.js Image component to load from the DigitalOcean Space
// configured in SPACE_BUCKET_URL in addition to the default sample images.
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const bucketUrl = process.env.SPACE_BUCKET_URL;

const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'picsum.photos',
  },
];

if (bucketUrl) {
  try {
    const { hostname } = new URL(bucketUrl);
    remotePatterns.push({ protocol: 'https', hostname });
  } catch {
    // ignore invalid SPACE_BUCKET_URL values
  }
}

export default function () {
  const nextConfig = {
    reactStrictMode: true,
    images: {
      loader: 'akamai',
      path: '',
      remotePatterns,
      unoptimized: true,
    },
    trailingSlash: true,
    output: 'export',
    // Build output is exported to static HTML for deployment.
  };

  const commonRewrites = [
    { source: '/favicon.ico', destination: '/favicon.svg' },
    // Route the landing page to a static HTML file so the app behaves
    // like a traditional static site.
    { source: '/', destination: '/index.html' },
  ];

  nextConfig.rewrites = async () => commonRewrites;

  return withBundleAnalyzer(nextConfig);
}

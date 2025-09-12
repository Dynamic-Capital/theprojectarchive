/* eslint-env node */
import bundleAnalyzer from '@next/bundle-analyzer';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
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

/** @param {string} phase */
export default function (phase) {
  const nextConfig = {
    reactStrictMode: true,
    images: {
      loader: 'akamai',
      path: '',
      remotePatterns,
      unoptimized: true,
    },
    trailingSlash: true,
    // Build output will run on a Node.js server rather than generating a
    // purely static export.
  };

  const commonRewrites = [
    { source: '/favicon.ico', destination: '/favicon.svg' },
  ];

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Serve the root page when requesting `/index.html` so the app
    // behaves like a traditional static site during development.
    nextConfig.rewrites = async () => [
      ...commonRewrites,
      { source: '/index.html', destination: '/' },
    ];
  } else {
    nextConfig.rewrites = async () => commonRewrites;
  }

  return withBundleAnalyzer(nextConfig);
}

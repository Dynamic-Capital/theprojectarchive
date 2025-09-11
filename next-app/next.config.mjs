/* eslint-env node */
/** @type {import('next').NextConfig} */
// Allow Next.js Image component to load from the DigitalOcean Space
// configured in SPACE_BUCKET_URL in addition to the default sample images.
import nextPWA from 'next-pwa';

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

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/picsum\.photos\/.*$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 50,
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    remotePatterns,
    unoptimized: true,
  },
};

export default withPWA(nextConfig);

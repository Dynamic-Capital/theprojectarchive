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

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: 'akamai',
    path: '',
    remotePatterns,
    // Disable the Image Optimization API when using static exports
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withBundleAnalyzer(nextConfig);

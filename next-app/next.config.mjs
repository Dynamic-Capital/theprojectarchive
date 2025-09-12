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
  images: {
    loader: 'akamai',
    path: '',
    remotePatterns,
    unoptimized: true,
  },
  trailingSlash: true,
  // Generate a static export so the build creates an `out` directory
  // that can be moved to `/_static` for deployment.
  output: 'export',
  // Serve the root page when requesting `/index.html` so the app
  // behaves like a traditional static site during development.
  async rewrites() {
    return [{ source: '/index.html', destination: '/' }];
  },
};

export default withBundleAnalyzer(nextConfig);

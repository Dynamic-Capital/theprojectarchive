/* eslint-env node */
/** @type {import('next').NextConfig} */
const allowedOrigin = process.env.NEXT_ALLOWED_ORIGIN ?? 'https://theprojectarchive.com';

// Allow Next.js Image component to load from the DigitalOcean Space
// configured in SPACE_BUCKET_URL in addition to the default sample images.
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
    remotePatterns,
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: allowedOrigin },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, Content-Type, Accept, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

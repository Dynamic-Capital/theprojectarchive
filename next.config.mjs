/* eslint-env node */
/* global process */
/** @type {import('next').NextConfig} */
const allowedOrigin = process.env.NEXT_ALLOWED_ORIGIN ?? 'https://theprojectarchive.com';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: allowedOrigin },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST',
          },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

export default nextConfig;

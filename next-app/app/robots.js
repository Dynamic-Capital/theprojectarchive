/** @type {import('next').MetadataRoute.Robots} */
export default function robots() {
  // Fall back to localhost if NEXT_PUBLIC_SITE_URL is missing
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

const sections = [
  'about',
  'mission',
  'approach',
  'numbers',
  'services',
  'testimonials',
  'contact',
];

/** @type {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', ...sections];

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
  }));
}

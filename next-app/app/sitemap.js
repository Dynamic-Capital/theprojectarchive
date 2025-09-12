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
  // Default to localhost when NEXT_PUBLIC_SITE_URL is not set
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', ...sections];

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    changefreq: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route === 'services' ? 0.8 : 0.5,
  }));
}

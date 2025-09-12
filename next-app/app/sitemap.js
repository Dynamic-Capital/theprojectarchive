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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined');
  }
  const routes = ['', ...sections];

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    changefreq: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route === 'services' ? 0.8 : 0.5,
  }));
}

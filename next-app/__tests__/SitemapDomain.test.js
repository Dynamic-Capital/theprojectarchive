import { describe, it, expect, afterEach } from 'vitest';
import sitemap from '../app/sitemap.js';

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
});

describe('sitemap domain generation', () => {
  it('uses NEXT_PUBLIC_SITE_URL for all URLs', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
    const entries = sitemap();
    entries.forEach((entry) => {
      expect(entry.url.startsWith('https://example.com/')).toBe(true);
    });
  });
});

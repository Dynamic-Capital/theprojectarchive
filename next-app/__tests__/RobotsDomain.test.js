import { describe, it, expect, afterEach } from 'vitest';
import robots from '../app/robots.js';

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
});

describe('robots sitemap URL', () => {
  it('uses NEXT_PUBLIC_SITE_URL', () => {
    const domain = 'https://fake.test';
    process.env.NEXT_PUBLIC_SITE_URL = domain;
    const result = robots();
    expect(result.sitemap).toBe(`${domain}/sitemap.xml`);
  });

  it('disallows non-public routes', () => {
    const result = robots();
    const disallowed = result.rules[0].disallow;
    expect(disallowed).toContain('/api');
    expect(disallowed).toContain('/coming-soon');
  });
});

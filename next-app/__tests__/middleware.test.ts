import { describe, it, expect, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

describe('middleware', () => {
  afterEach(() => {
    delete process.env.MAINTENANCE_MODE;
  });

  it('redirects when MAINTENANCE_MODE is true regardless of case', () => {
    process.env.MAINTENANCE_MODE = 'TrUe';
    const res = middleware(new NextRequest('https://example.com/'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('https://example.com/coming-soon');
  });

  it('continues when MAINTENANCE_MODE is not true', () => {
    process.env.MAINTENANCE_MODE = 'false';
    const res = middleware(new NextRequest('https://example.com/'));
    expect(res.status).toBe(200);
  });
});

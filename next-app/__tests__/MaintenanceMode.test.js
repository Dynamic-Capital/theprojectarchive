import { describe, it, expect, afterEach } from 'vitest';
import { NextRequest } from 'next/server.js';
import { middleware } from '../middleware.js';

afterEach(() => {
  delete process.env.MAINTENANCE_MODE;
});

describe('maintenance mode middleware', () => {
  it('redirects to /coming-soon when enabled', () => {
    process.env.MAINTENANCE_MODE = 'true';
    const request = new NextRequest('https://example.com/');
    const response = middleware(request);
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://example.com/coming-soon');
  });

  it('allows normal routing when disabled', () => {
    process.env.MAINTENANCE_MODE = 'false';
    const request = new NextRequest('https://example.com/');
    const response = middleware(request);
    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });
});

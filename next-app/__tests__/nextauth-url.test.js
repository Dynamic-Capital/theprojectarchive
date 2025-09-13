import { describe, it, expect, vi } from 'vitest';

describe('NextAuth configuration', () => {
  it('defaults NEXTAUTH_URL when invalid', async () => {
    process.env.NEXTAUTH_URL = '::::';
    process.env.GITHUB_ID = 'id';
    process.env.GITHUB_SECRET = 'secret';
    process.env.NEXTAUTH_SECRET = 'secret';
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const mod = await import('../app/api/auth/[...nextauth]/route.js?c=' + Date.now());
    expect(typeof mod.GET).toBe('function');
    expect(process.env.NEXTAUTH_URL).toBe('http://localhost:3000');
    expect(warnSpy).toHaveBeenCalledWith(
      '[Auth] NEXTAUTH_URL is invalid, defaulting to http://localhost:3000',
    );
    warnSpy.mockRestore();
    delete process.env.NEXTAUTH_URL;
    delete process.env.GITHUB_ID;
    delete process.env.GITHUB_SECRET;
    delete process.env.NEXTAUTH_SECRET;
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';

let POST;

describe('POST /api/contact', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    process.env.SUPABASE_SAVE_CONTACT_FUNCTION_URL = 'http://function';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'key';
    delete process.env.RECAPTCHA_SECRET;
    vi.resetModules();
    ({ POST } = await import('../../app/api/contact/route.js'));
  });

  it('calls Supabase function on success', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue({ ok: true });
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com',
        message: 'Hi there',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledWith(
      'http://function',
      expect.objectContaining({ method: 'POST' }),
    );
    fetchSpy.mockRestore();
  });

  it('validates input', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'bad', message: '' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('handles function errors', async () => {
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockRejectedValue(new Error('fail'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bob',
        email: 'bob@example.com',
        message: 'Hello',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(errorSpy).toHaveBeenCalled();
    fetchSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('returns 500 when function URL is missing', async () => {
    delete process.env.SUPABASE_SAVE_CONTACT_FUNCTION_URL;
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ann',
        email: 'ann@example.com',
        message: 'Hello',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('rate limits repeated requests', async () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '1.2.3.4',
      },
      body: JSON.stringify({
        name: 'Bob',
        email: 'bob@example.com',
        message: 'Hello',
      }),
    };
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue({ ok: true });
    for (let i = 0; i < 5; i++) {
      const res = await POST(new Request('http://localhost/api/contact', init));
      expect(res.status).toBe(200);
    }
    const res = await POST(new Request('http://localhost/api/contact', init));
    expect(res.status).toBe(429);
    fetchSpy.mockRestore();
  });

  it('verifies captcha when secret is set', async () => {
    process.env.HCAPTCHA_SECRET = 'secret';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementation((url) => {
        if (url === 'http://function') {
          return Promise.resolve({ ok: true });
        }
        return Promise.resolve({ json: async () => ({ success: true }) });
      });
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Eve',
        email: 'eve@example.com',
        message: 'Hello',
        token: 'abc',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    fetchSpy.mockRestore();
  });

  it('rejects invalid captcha', async () => {
    process.env.HCAPTCHA_SECRET = 'secret';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockImplementation((url) => {
        if (url === 'http://function') {
          return Promise.resolve({ ok: true });
        }
        return Promise.resolve({ json: async () => ({ success: false }) });
      });
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Mallory',
        email: 'mallory@example.com',
        message: 'Hello',
        token: 'abc',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    fetchSpy.mockRestore();
  });
});

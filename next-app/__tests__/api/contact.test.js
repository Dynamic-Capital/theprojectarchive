import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '../../app/api/contact/route.js';
import nodemailer from 'nodemailer';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({}),
    })),
  },
}));

describe('POST /api/contact', () => {
  beforeEach(() => {
    process.env.BUSINESS_EMAIL = 'biz@example.com';
    process.env.BUSINESS_EMAIL_APP_PASSWORD = 'app-pass';
    delete process.env.RECAPTCHA_SECRET;
  });

  it('sends an email on success', async () => {
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
    expect(nodemailer.createTransport).toHaveBeenCalled();
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

  it('handles sendMail errors', async () => {
    nodemailer.createTransport.mockReturnValueOnce({
      sendMail: vi.fn().mockRejectedValue(new Error('fail')),
    });
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
  });

  it('verifies captcha when secret is set', async () => {
    process.env.RECAPTCHA_SECRET = 'secret';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: async () => ({ success: true }) });
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
    process.env.RECAPTCHA_SECRET = 'secret';
    const fetchSpy = vi
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: async () => ({ success: false }) });
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

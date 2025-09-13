import nodemailer from 'nodemailer';
import { z } from 'zod';
import { Redis } from '@upstash/redis';

const rateLimitWindowMs = 60_000;
const rateLimitMax = 5;
const rateLimitMap = new Map();
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

function getIp(req) {
  return (
    req.ip ||
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'local'
  );
}

async function isRateLimited(ip) {
  if (redis) {
    const key = `rate_limit:${ip}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.pexpire(key, rateLimitWindowMs);
    }
    return count > rateLimitMax;
  }

  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now - entry.start >= rateLimitWindowMs) {
      rateLimitMap.delete(key);
    }
  }
  const entry = rateLimitMap.get(ip);
  if (entry && now - entry.start < rateLimitWindowMs) {
    if (entry.count >= rateLimitMax) {
      return true;
    }
    entry.count += 1;
    return false;
  }
  rateLimitMap.set(ip, { count: 1, start: now });
  return false;
}

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  token: z.string().optional(),
});

export async function POST(req) {
  try {
    let data;
    try {
      data = await req.json();
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    const { name, email, message, token } = schema.parse(data);

    const ip = getIp(req);
    if (await isRateLimited(ip)) {
      return new Response(null, { status: 429 });
    }

    if (
      !process.env.BUSINESS_EMAIL ||
      !process.env.BUSINESS_EMAIL_APP_PASSWORD
    ) {
      console.error('Business email is not configured');
      return Response.json({ error: 'Email not configured' }, { status: 500 });
    }

    if (process.env.RECAPTCHA_SECRET) {
      if (!token) {
        return Response.json({ error: 'Missing captcha token' }, { status: 400 });
      }
      const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET,
        response: token,
      });
      const verifyRes = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        },
      );
      const verify = await verifyRes.json();
      const expectedHostname = process.env.RECAPTCHA_HOSTNAME;
      const expectedAction = process.env.RECAPTCHA_ACTION;
      if (
        !verify.success ||
        (expectedHostname && verify.hostname !== expectedHostname) ||
        (expectedAction && verify.action !== expectedAction)
      ) {
        return Response.json(
          { error: 'Captcha verification failed' },
          { status: 400 },
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.BUSINESS_EMAIL,
        pass: process.env.BUSINESS_EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.BUSINESS_EMAIL,
      to: process.env.BUSINESS_EMAIL,
      subject: `New contact from ${name}`,
      replyTo: email,
      text: message,
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }
    console.error('Failed to send contact email', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

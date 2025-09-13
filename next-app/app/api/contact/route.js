import { z } from 'zod';
import { Redis } from '@upstash/redis';
// Contact messages are persisted via a Supabase Edge Function to offload
// database work from the Next.js runtime.

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

    if (!process.env.SUPABASE_SAVE_CONTACT_FUNCTION_URL) {
      console.error('Contact function is not configured');
      return Response.json(
        { error: 'Contact function not configured' },
        { status: 500 },
      );
    }

    if (process.env.HCAPTCHA_SECRET) {
      if (!token) {
        return Response.json({ error: 'Missing captcha token' }, { status: 400 });
      }
      const params = new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET,
        response: token,
      });
      const verifyRes = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      const verify = await verifyRes.json();
      if (!verify.success) {
        return Response.json(
          { error: 'Captcha verification failed' },
          { status: 400 },
        );
      }
    }

    try {
      const res = await fetch(process.env.SUPABASE_SAVE_CONTACT_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.SUPABASE_SERVICE_ROLE_KEY
            ? { Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` }
            : {}),
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        console.error('Supabase function returned', res.status);
        return Response.json(
          { error: 'Failed to send message' },
          { status: 500 },
        );
      }
    } catch (error) {
      console.error('Failed to store contact message', error);
      return Response.json(
        { error: 'Failed to send message' },
        { status: 500 },
      );
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }
    console.error('Failed to send contact message', err);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

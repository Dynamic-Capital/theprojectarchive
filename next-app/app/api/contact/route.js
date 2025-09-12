import nodemailer from 'nodemailer';
import { z } from 'zod';

const rateLimitWindowMs = 60_000;
const rateLimitMax = 5;
const rateLimitMap = new Map();

function getIp(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'
  );
}

function isRateLimited(ip) {
  const now = Date.now();
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

export function _clearRateLimit() {
  rateLimitMap.clear();
}

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  token: z.string().optional(),
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, message, token } = schema.parse(data);

    const ip = getIp(req);
    if (isRateLimited(ip)) {
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
      if (!verify.success) {
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

import { NextResponse } from 'next/server.js';

export function middleware(request) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }
  const res = NextResponse.next();
  res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  );
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'no-referrer');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return res;
}

export const config = {
  matcher: '/((?!_next|coming-soon).*)',
};

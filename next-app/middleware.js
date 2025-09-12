import { NextResponse } from 'next/server.js';

export function middleware(request) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|coming-soon).*)',
};

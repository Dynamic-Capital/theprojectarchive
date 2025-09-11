import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === 'true';
  if (maintenance && !req.nextUrl.pathname.startsWith('/coming-soon')) {
    return NextResponse.redirect(new URL('/coming-soon', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};

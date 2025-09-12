import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    const url = req.nextUrl.clone();
    url.pathname = '/coming-soon';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|coming-soon).*)'],
};

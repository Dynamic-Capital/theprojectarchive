import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === 'true') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|coming-soon|favicon.ico).*)'],
};

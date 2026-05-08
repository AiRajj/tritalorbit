import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/platform', '/pricing', '/demo', '/contact', '/privacy', '/terms'];
const roleRouteMap: Record<string, string[]> = {
  SUPER_ADMIN: ['/admin'],
  AGENCY_OWNER: ['/agency'],
  RECRUITER: ['/recruiter', '/agency'],
  CONCIERGE_MANAGER: ['/concierge'],
  MSP_VIEWER: ['/msp'],
  CANDIDATE: ['/candidate'],
  VENDOR: ['/vendor'],
};

const defaultRoutes: Record<string, string> = {
  SUPER_ADMIN: '/admin',
  AGENCY_OWNER: '/agency',
  RECRUITER: '/recruiter',
  CONCIERGE_MANAGER: '/concierge',
  MSP_VIEWER: '/msp',
  CANDIDATE: '/candidate',
  VENDOR: '/vendor',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    publicRoutes.some(r => pathname === r) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/solutions') ||
    pathname.startsWith('/features') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/candidate/offer/')) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

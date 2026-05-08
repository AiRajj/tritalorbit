import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

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

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (publicRoutes.some(r => pathname === r) ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/solutions') ||
      pathname.startsWith('/features') ||
      pathname.includes('.')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/candidate/offer/')) {
    return NextResponse.next();
  }

  if (!req.auth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const role = (req.auth.user as any)?.role;
  if (!role) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (role === 'SUPER_ADMIN') return NextResponse.next();

  const allowedPrefixes = roleRouteMap[role] || [];
  const hasAccess = allowedPrefixes.some(prefix => pathname.startsWith(prefix));

  if (!hasAccess) {
    const defaultRoutes: Record<string, string> = {
      AGENCY_OWNER: '/agency',
      RECRUITER: '/recruiter',
      CONCIERGE_MANAGER: '/concierge',
      MSP_VIEWER: '/msp',
      CANDIDATE: '/candidate',
      VENDOR: '/vendor',
    };
    return NextResponse.redirect(new URL(defaultRoutes[role] || '/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { canAccessPath, getRoleHome, protectedRouteRoles } from "@/lib/rbac";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRouteRoles.some((route) => pathname.startsWith(route.prefix));
  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const publicCandidateOffer = pathname.startsWith("/candidate/offer/") || pathname.startsWith("/candidate/booking-request/");
  if (publicCandidateOffer) return NextResponse.next();

  if (!token) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  if (!canAccessPath(pathname, token.role)) {
    return NextResponse.redirect(new URL(getRoleHome(token.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/agency/:path*", "/recruiter/:path*", "/candidate/:path*", "/concierge/:path*", "/vendor/:path*", "/msp/:path*"]
};

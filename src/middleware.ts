import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import { canAccessPath } from "@/lib/rbac";

const PUBLIC_PATHS = [
  "/",
  "/platform",
  "/pricing",
  "/demo",
  "/contact",
  "/privacy",
  "/terms",
  "/login",
  "/register",
  "/forgot-password",
  "/candidate/offer",
  "/candidate/booking-request",
  "/solutions",
  "/features",
  "/api/leads",
  "/api/demo-requests",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!canAccessPath(String(token.role), pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};

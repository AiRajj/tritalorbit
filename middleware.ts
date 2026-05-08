import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canAccessPath, roleRedirectMap } from "@/lib/rbac";

const publicPaths = [
  "/",
  "/platform",
  "/solutions",
  "/features",
  "/pricing",
  "/demo",
  "/contact",
  "/privacy",
  "/terms",
  "/api/leads",
  "/api/demo-requests",
  "/api/contact",
  "/login",
  "/register",
  "/forgot-password",
  "/candidate/offer"
];

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isPublic = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const continueResponse = () => NextResponse.next({ request: { headers: requestHeaders } });

  if (pathname.startsWith("/api/auth")) {
    return continueResponse();
  }

  if (!req.auth?.user && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.auth?.user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL(roleRedirectMap[req.auth.user.role], req.url));
  }

  if (req.auth?.user && !canAccessPath(pathname, req.auth.user.role)) {
    return NextResponse.redirect(new URL(roleRedirectMap[req.auth.user.role], req.url));
  }

  return continueResponse();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};

import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/admin",
  "/agency",
  "/recruiter",
  "/candidate",
  "/concierge",
  "/vendor",
  "/msp",
];

const roleRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ["/admin", "/agency", "/recruiter", "/candidate", "/concierge", "/vendor", "/msp"],
  AGENCY_OWNER: ["/agency", "/recruiter"],
  RECRUITER: ["/recruiter", "/agency"],
  CONCIERGE_MANAGER: ["/concierge"],
  MSP_VIEWER: ["/msp"],
  CANDIDATE: ["/candidate"],
  VENDOR: ["/vendor"],
};

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = !!req.auth?.user;
  const userRole = req.auth?.user?.role;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    const role = userRole ?? "CANDIDATE";
    const redirectMap: Record<string, string> = {
      SUPER_ADMIN: "/admin",
      AGENCY_OWNER: "/agency",
      RECRUITER: "/recruiter",
      CONCIERGE_MANAGER: "/concierge",
      MSP_VIEWER: "/msp",
      CANDIDATE: "/candidate",
      VENDOR: "/vendor",
    };
    return NextResponse.redirect(new URL(redirectMap[role] ?? "/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)"],
};

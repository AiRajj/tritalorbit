import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PROTECTED = ["/admin", "/agency", "/recruiter", "/concierge", "/msp", "/vendor"];
const CANDIDATE_PROTECTED_REGEX = /^\/candidate(?!\/offer\/[^/]+$)(?!\/booking-request\/[^/]+$)/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected =
    PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    CANDIDATE_PROTECTED_REGEX.test(pathname);

  if (!isProtected) return NextResponse.next();

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  const role = (token as { role?: string }).role;
  const matrix: Record<string, string[]> = {
    "/admin": ["SUPER_ADMIN"],
    "/agency": ["SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"],
    "/recruiter": ["SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"],
    "/concierge": ["SUPER_ADMIN", "AGENCY_OWNER", "CONCIERGE_MANAGER"],
    "/msp": ["SUPER_ADMIN", "MSP_VIEWER", "AGENCY_OWNER"],
    "/vendor": ["SUPER_ADMIN", "VENDOR", "LANDLORD"],
    "/candidate": ["SUPER_ADMIN", "CANDIDATE", "AGENCY_OWNER", "RECRUITER"],
  };

  const matchKey = Object.keys(matrix).find(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (matchKey && role && !matrix[matchKey].includes(role)) {
    const url = req.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/agency/:path*",
    "/recruiter/:path*",
    "/concierge/:path*",
    "/msp/:path*",
    "/vendor/:path*",
    "/candidate/:path*",
  ],
};

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicPaths = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
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
  "/api/auth",
  "/api/ai",
  "/candidate/offer",
]

function isPublic(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

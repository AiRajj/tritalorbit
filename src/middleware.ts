import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/contact",
  "/pricing",
  "/features",
  "/about",
  "/demo",
  "/privacy",
  "/terms",
]

const apiAuthRoutes = ["/api/auth"]

const roleRouteAccess: Record<string, string[]> = {
  "/dashboard": ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/candidates": ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/offers": ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/assignments": ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/ai-agents": ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/bookings": ["ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/leads": ["ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/clients": ["ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  "/dashboard/reports": ["MSP_ADMIN", "ADMIN"],
  "/admin": ["ADMIN", "MSP_ADMIN"],
  "/admin/users": ["ADMIN"],
  "/admin/organizations": ["ADMIN"],
  "/admin/settings": ["ADMIN"],
  "/admin/notifications": ["ADMIN", "MSP_ADMIN"],
}

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
}

function isApiAuthRoute(pathname: string): boolean {
  return apiAuthRoutes.some((route) => pathname.startsWith(route))
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") 
  )
}

function hasRouteAccess(pathname: string, role: string): boolean {
  const matchingRoute = Object.keys(roleRouteAccess)
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname === route || pathname.startsWith(route + "/"))

  if (!matchingRoute) return true

  return roleRouteAccess[matchingRoute].includes(role)
}

export default auth((req) => {
  const { nextUrl } = req
  const pathname = nextUrl.pathname
  const isLoggedIn = !!req.auth

  if (isStaticAsset(pathname) || isApiAuthRoute(pathname)) {
    return NextResponse.next()
  }

  if (isPublicRoute(pathname)) {
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    )
  }

  const userRole = (req.auth?.user as Record<string, unknown>)?.role as string

  if (userRole && !hasRouteAccess(pathname, userRole)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}

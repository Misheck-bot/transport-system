import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    // Check if user is accessing dashboard
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // Role-based access control
      if (pathname.startsWith("/dashboard/driver") && token.role !== "driver") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      if (pathname.startsWith("/dashboard/agent") && token.role !== "agent") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      if (pathname.startsWith("/dashboard/admin") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to public routes
        if (pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname.startsWith("/register")) {
          return true
        }

        // Require authentication for dashboard routes
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
}

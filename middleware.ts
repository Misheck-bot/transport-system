import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    console.log("Middleware - Path:", pathname, "Token role:", token?.role)

    // Allow access to public routes without any redirects
    if (
      pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon")
    ) {
      return NextResponse.next()
    }

    // Protect dashboard routes
    if (pathname.startsWith("/dashboard")) {
      if (!token) {
        console.log("No token, redirecting to login")
        return NextResponse.redirect(new URL("/login", req.url))
      }

      const role = token.role as string
      console.log("User role:", role, "Accessing:", pathname)

      // Handle base dashboard route - redirect to role-specific dashboard
      if (pathname === "/dashboard") {
        if (role === "admin") {
          return NextResponse.redirect(new URL("/dashboard/admin", req.url))
        } else if (role === "agent") {
          return NextResponse.redirect(new URL("/dashboard/agent", req.url))
        } else if (role === "driver") {
          return NextResponse.redirect(new URL("/dashboard/driver", req.url))
        }
      }

      // Prevent access to wrong role dashboards
      if (pathname.startsWith("/dashboard/driver") && role !== "driver") {
        console.log("Driver dashboard access denied for role:", role)
        if (role === "admin") {
          return NextResponse.redirect(new URL("/dashboard/admin", req.url))
        } else if (role === "agent") {
          return NextResponse.redirect(new URL("/dashboard/agent", req.url))
        }
        return NextResponse.redirect(new URL("/login", req.url))
      }

      if (pathname.startsWith("/dashboard/agent") && role !== "agent") {
        console.log("Agent dashboard access denied for role:", role)
        if (role === "admin") {
          return NextResponse.redirect(new URL("/dashboard/admin", req.url))
        } else if (role === "driver") {
          return NextResponse.redirect(new URL("/dashboard/driver", req.url))
        }
        return NextResponse.redirect(new URL("/login", req.url))
      }

      if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        console.log("Admin dashboard access denied for role:", role)
        if (role === "driver") {
          return NextResponse.redirect(new URL("/dashboard/driver", req.url))
        } else if (role === "agent") {
          return NextResponse.redirect(new URL("/dashboard/agent", req.url))
        }
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow all public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/signup") ||
          pathname.startsWith("/_next") ||
          pathname.startsWith("/favicon")
        ) {
          return true
        }

        // Require authentication for dashboard routes only
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }

        // Allow everything else
        return true
      },
    },
  },
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}

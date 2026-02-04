import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const adminPath = process.env.ADMIN_PANEL_URL || "/studio";
  const path = request.nextUrl.pathname;

  // Only protect routes under the admin path
  if (path.startsWith(adminPath)) {
    // Skip login page itself
    if (path === `${adminPath}/login`) {
      return NextResponse.next();
    }

    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`${adminPath}/login`, request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      // Token invalid or expired
      const response = NextResponse.redirect(new URL(`${adminPath}/login`, request.url));
      response.cookies.delete("auth_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

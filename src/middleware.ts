import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, adminToken } from "@/lib/adminAuth";
import { CREW_COOKIE, crewToken } from "@/lib/crewAuth";

// Cookie-based gates:
//  - /admin (single ADMIN_PASSWORD)
//  - /carlisle-vs-steven, the crew-only game (single CREW_PASSWORD)
// Login pages/APIs are excluded so people can reach them unauthenticated.

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/carlisle-vs-steven", "/api/crew/login"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Crew gate for the game (the /gate page + login API stay open).
  if (pathname === "/carlisle-vs-steven") {
    const cookie = req.cookies.get(CREW_COOKIE)?.value;
    const expected = await crewToken();
    if (!cookie || cookie !== expected) {
      const url = req.nextUrl.clone();
      url.pathname = "/carlisle-vs-steven/gate";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
  if (pathname === "/api/crew/login") {
    return NextResponse.next();
  }

  // Admin gate — allow the login page and login API through unauthenticated.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = await adminToken();

  if (!cookie || cookie !== expected) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

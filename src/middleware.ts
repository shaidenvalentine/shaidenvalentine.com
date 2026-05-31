import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// HTTP Basic Auth gate for /admin. No DB — credentials come from env.
// Set ADMIN_USER + ADMIN_PASSWORD locally (.env.local) and in Vercel.

export const config = { matcher: "/admin/:path*" };

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  // If unconfigured, lock it down rather than leaving it open.
  const challenge = () =>
    new NextResponse("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="admin", charset="UTF-8"' },
    });

  if (!user || !pass) return challenge();

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return challenge();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return challenge();
  }
  const i = decoded.indexOf(":");
  const u = decoded.slice(0, i);
  const p = decoded.slice(i + 1);

  if (u !== user || p !== pass) return challenge();

  return NextResponse.next();
}

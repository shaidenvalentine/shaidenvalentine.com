import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken, getAdminPassword } from "@/lib/adminAuth";

export const runtime = "edge";

export async function POST(req: Request) {
  let body: { password?: string; next?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
  const password = String(body.password ?? "");
  if (password !== getAdminPassword()) {
    return NextResponse.json({ ok: false, message: "Wrong password." }, { status: 401 });
  }
  const token = await adminToken();
  const res = NextResponse.json({ ok: true, next: body.next || "/admin" });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}

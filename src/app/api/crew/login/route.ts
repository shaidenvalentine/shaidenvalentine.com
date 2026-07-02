import { NextResponse } from "next/server";
import { CREW_COOKIE, crewToken, getCrewPassword } from "@/lib/crewAuth";

export const runtime = "edge";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }
  const password = String(body.password ?? "").trim();
  if (password.toLowerCase() !== getCrewPassword().toLowerCase()) {
    return NextResponse.json({ ok: false, message: "Nope. Ask the group chat." }, { status: 401 });
  }
  const token = await crewToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(CREW_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // a year
  });
  return res;
}

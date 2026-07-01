import { NextResponse } from "next/server";
import { insertIdea } from "@/lib/store";

// Idea capture endpoint. Lives under /api/admin so the existing middleware
// gate protects it (admin cookie required). A stable URL, unlike a Server
// Action, so it never goes stale across deploys.
export async function POST(req: Request) {
  let title = "";
  let idea = "";
  try {
    const body = await req.json();
    title = String(body.title ?? "").trim();
    idea = String(body.idea ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request." }, { status: 400 });
  }

  if (!title || !idea) {
    return NextResponse.json({ ok: false, message: "Add a title and an idea." }, { status: 400 });
  }

  const result = await insertIdea({ title, idea });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

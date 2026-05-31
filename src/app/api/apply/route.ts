import { NextResponse } from "next/server";
import { sendMail, esc } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Pretend success, send nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: "Sent." }, { status: 200 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const role = String(body.role ?? "").trim();
  const link = String(body.link ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2) return NextResponse.json({ message: "Add your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ message: "Add a valid email." }, { status: 400 });
  if (message.length < 20)
    return NextResponse.json({ message: "Tell me a little more (at least a sentence or two)." }, { status: 400 });

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 4px">New application — Work With Me</h2>
      <p style="margin:0 0 16px;color:#666">From shaidenvalentine.com</p>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Reaching out as:</strong> ${esc(role || "—")}</p>
      ${link ? `<p><strong>Link:</strong> <a href="${esc(link)}">${esc(link)}</a></p>` : ""}
      <p><strong>Why us / what they bring:</strong></p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
    </div>`;

  const result = await sendMail(`Application: ${name} (${role || "—"})`, html, email);
  return NextResponse.json({ message: result.message }, { status: result.status });
}

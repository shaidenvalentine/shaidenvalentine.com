import { NextResponse } from "next/server";
import { sendMail, esc } from "@/lib/email";
import { insertLead, isConfigured } from "@/lib/store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lead capture for waitlists + gated ebook downloads.
// Primary: write to Postgres. Backup: email (so leads aren't lost if DB ever fails).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: "Saved." }, { status: 200 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const whatsapp = String(body.whatsapp ?? "").trim();
  const instagram = String(body.instagram ?? "").trim();
  const intent = String(body.intent ?? "Lead").trim();

  if (name.length < 2) return NextResponse.json({ message: "Add your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ message: "Add a valid email." }, { status: 400 });
  if (whatsapp.replace(/[^\d]/g, "").length < 6)
    return NextResponse.json({ message: "Add a valid WhatsApp number." }, { status: 400 });

  const r = await insertLead({ name, email, whatsapp, instagram, intent });

  // Best-effort email backup. Don't block the response on email failure.
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 4px">New lead — ${esc(intent)}</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>WhatsApp:</strong> ${esc(whatsapp)}</p>
      ${instagram ? `<p><strong>Instagram:</strong> ${esc(instagram)}</p>` : ""}
      <p><strong>Interest:</strong> ${esc(intent)}</p>
    </div>`;
  sendMail(`Lead: ${intent} — ${name}`, html, email).catch(() => undefined);

  if (r.ok) return NextResponse.json({ message: "Saved." }, { status: 200 });
  if (!isConfigured())
    return NextResponse.json(
      { message: "Lead capture isn't fully wired yet. Try again in a moment." },
      { status: 503 }
    );
  return NextResponse.json({ message: r.message }, { status: 500 });
}

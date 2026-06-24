import { NextResponse } from "next/server";
import { sendMail, esc } from "@/lib/email";
import { insertRsvp, isConfigured, type Tier } from "@/lib/events";
import { THRESHOLD_SLUG } from "@content/threshold";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public RSVP intake for THRESHOLD. Anon INSERT only — this route never reads
// the guest list back. Capacity is enforced softly in insertRsvp (full tier →
// waitlisted, not an error). Primary store: Postgres. Backup: email.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill it, humans never see it.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: "Saved.", status: "rsvp_received" }, { status: 200 });
  }

  const tier = String(body.tier ?? "").trim() as Tier;
  if (tier !== "inner" && tier !== "outer") {
    return NextResponse.json({ message: "Pick a circle." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const whatsapp = String(body.whatsapp ?? "").trim();

  if (name.length < 2) return NextResponse.json({ message: "Add your name." }, { status: 400 });

  const hasEmail = email !== "" && EMAIL_RE.test(email);
  const hasWhatsapp = whatsapp.replace(/[^\d]/g, "").length >= 6;
  if (email !== "" && !hasEmail)
    return NextResponse.json({ message: "That email doesn't look right." }, { status: 400 });
  if (!hasEmail && !hasWhatsapp)
    return NextResponse.json(
      { message: "Add an email or a WhatsApp number so I can reach you." },
      { status: 400 }
    );

  const adventures = Array.isArray(body.adventures)
    ? (body.adventures as unknown[]).map((a) => String(a)).filter(Boolean).slice(0, 12)
    : [];
  const plusOnesRaw = Number(body.plus_ones ?? 0);
  const plus_ones = Number.isFinite(plusOnesRaw) ? Math.max(0, Math.min(10, Math.floor(plusOnesRaw))) : 0;

  const r = await insertRsvp({
    event_slug: THRESHOLD_SLUG,
    tier,
    name,
    email: hasEmail ? email : undefined,
    whatsapp: hasWhatsapp ? whatsapp : undefined,
    plus_ones: tier === "outer" ? plus_ones : 0,
    bed_pref: tier === "inner" ? String(body.bed_pref ?? "").trim() || undefined : undefined,
    arrival: tier === "inner" ? String(body.arrival ?? "").trim() || undefined : undefined,
    adventures: tier === "inner" ? adventures : undefined,
    dietary: tier === "inner" ? String(body.dietary ?? "").trim() || undefined : undefined,
    costume_note: tier === "outer" ? String(body.costume_note ?? "").trim() || undefined : undefined,
    guest_note: String(body.guest_note ?? "").trim() || undefined,
  });

  // Best-effort email backup so an RSVP is never lost if the DB hiccups.
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 4px">THRESHOLD RSVP — ${esc(tier === "inner" ? "Inner Circle" : "Outer Circle")}</h2>
      <p><strong>Status:</strong> ${esc(r.status ?? "—")}</p>
      <p><strong>Name:</strong> ${esc(name)}</p>
      ${hasEmail ? `<p><strong>Email:</strong> ${esc(email)}</p>` : ""}
      ${hasWhatsapp ? `<p><strong>WhatsApp:</strong> ${esc(whatsapp)}</p>` : ""}
      ${tier === "outer" && plus_ones ? `<p><strong>+1s:</strong> ${plus_ones}</p>` : ""}
      ${tier === "inner" && body.bed_pref ? `<p><strong>Bed pref:</strong> ${esc(String(body.bed_pref))}</p>` : ""}
      ${tier === "inner" && body.arrival ? `<p><strong>Arrival:</strong> ${esc(String(body.arrival))}</p>` : ""}
      ${tier === "inner" && adventures.length ? `<p><strong>Adventures:</strong> ${esc(adventures.join(", "))}</p>` : ""}
      ${tier === "inner" && body.dietary ? `<p><strong>Dietary:</strong> ${esc(String(body.dietary))}</p>` : ""}
      ${tier === "outer" && body.costume_note ? `<p><strong>Costume:</strong> ${esc(String(body.costume_note))}</p>` : ""}
      ${body.guest_note ? `<p><strong>Note:</strong> ${esc(String(body.guest_note))}</p>` : ""}
    </div>`;
  sendMail(`THRESHOLD RSVP: ${name} (${tier})`, html, hasEmail ? email : undefined).catch(() => undefined);

  if (r.ok) return NextResponse.json({ message: "Saved.", status: r.status }, { status: 200 });
  if (!isConfigured())
    return NextResponse.json(
      { message: "RSVPs aren't fully wired yet. Try again in a moment." },
      { status: 503 }
    );
  return NextResponse.json({ message: r.message }, { status: 500 });
}

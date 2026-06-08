import { NextResponse } from "next/server";
import { sendMail, esc } from "@/lib/email";
import { insertFeedback } from "@/lib/store";

// Anonymous by design: we accept only a message + optional topic. No name,
// no email, no IP — nothing that identifies the sender is read or stored.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ message: "Sent." }, { status: 200 });
  }

  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (message.length < 10)
    return NextResponse.json({ message: "Add a little more so it lands." }, { status: 400 });
  if (message.length > 5000)
    return NextResponse.json({ message: "That's longer than the limit — trim it down a touch." }, { status: 400 });

  // Persist anonymously — only topic + message + timestamp.
  await insertFeedback({ topic, message });

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 4px">Anonymous feedback</h2>
      <p style="margin:0 0 16px;color:#666">From shaidenvalentine.com · sender not identified</p>
      <p><strong>Topic:</strong> ${esc(topic || "General")}</p>
      <p style="white-space:pre-wrap">${esc(message)}</p>
    </div>`;
  sendMail(`Anonymous feedback — ${topic || "General"}`, html).catch(() => undefined);

  return NextResponse.json({ message: "Sent." }, { status: 200 });
}

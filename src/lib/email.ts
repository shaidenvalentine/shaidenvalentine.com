import { Resend } from "resend";
import { profile } from "@content/profile";

// Shared Resend sender for the form route handlers. No data is stored —
// each submission is emailed and discarded.

const FROM = process.env.RESEND_FROM || "Portal <onboarding@resend.dev>";
const TO = process.env.CONTACT_EMAIL || profile.vcard.email;

export interface SendResult {
  ok: boolean;
  status: number;
  message: string;
}

export async function sendMail(subject: string, html: string, replyTo?: string): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return {
      ok: false,
      status: 503,
      message: "Email isn't configured yet. Add RESEND_API_KEY to enable submissions.",
    };
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      return { ok: false, status: 502, message: "Couldn't send right now. Try again in a moment." };
    }
    return { ok: true, status: 200, message: "Sent." };
  } catch {
    return { ok: false, status: 502, message: "Couldn't send right now. Try again in a moment." };
  }
}

// Minimal HTML-escape so submitted text can't inject markup into the email.
export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

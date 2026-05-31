import type { Profile } from "@content/types";

// Build a vCard 3.0 string from profile data — no backend.
export function buildVCard(p: Profile["vcard"], socials: { label: string; href: string }[]): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${p.lastName};${p.firstName};;;`,
    `FN:${p.firstName} ${p.lastName}`,
    `ORG:${p.org}`,
    `TITLE:${p.title}`,
    `EMAIL;TYPE=INTERNET,PREF:${p.email}`,
    p.phone ? `TEL;TYPE=CELL:${p.phone}` : null,
    `URL:${p.url}`,
    ...socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => `URL;TYPE=${s.label.toUpperCase()}:${s.href}`),
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\r\n");
}

// Trigger a client-side download of the vCard via a Blob URL.
export function downloadVCard(vcard: string, filename = "Shaiden-Valentine.vcf") {
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Crew gate for the Carlisle vs Steven game — a single shared password so
// only the Raja Ampat boys can get in. Default "oldman" (Sasha's 40th);
// override with the CREW_PASSWORD env var in Vercel for a real secret, since
// the repo is public. Web Crypto SHA-256 works in the edge runtime.

export const CREW_COOKIE = "sv_crew";

export function getCrewPassword(): string {
  return process.env.CREW_PASSWORD || "oldman";
}

export async function crewToken(): Promise<string> {
  const data = new TextEncoder().encode(`sv-crew::${getCrewPassword()}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

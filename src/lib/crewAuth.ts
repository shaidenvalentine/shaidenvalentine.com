// Crew gate for the Carlisle vs Steven game — a single shared password so
// only the Raja Ampat boys can get in. Default "annebonnie"; override with the
// CREW_PASSWORD env var in Vercel (the repo is public, so set a real one).
// Web Crypto SHA-256 is edge-runtime compatible (works in middleware).

export const CREW_COOKIE = "sv_crew";

export function getCrewPassword(): string {
  return process.env.CREW_PASSWORD || "annebonnie";
}

export async function crewToken(): Promise<string> {
  const data = new TextEncoder().encode(`sv-crew::${getCrewPassword()}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Shared admin auth helpers.
// Single password (no username). Default "password"; override via ADMIN_PASSWORD env.
// Web Crypto SHA-256 is edge-runtime compatible (works in middleware).

export const ADMIN_COOKIE = "sv_admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "password";
}

export async function adminToken(): Promise<string> {
  const data = new TextEncoder().encode(`sv-admin::${getAdminPassword()}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

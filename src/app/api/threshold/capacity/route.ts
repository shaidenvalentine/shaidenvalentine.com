import { NextResponse } from "next/server";
import { capacity } from "@/lib/events";
import { THRESHOLD_SLUG } from "@content/threshold";

// Public, aggregate-only slot counts. Never returns guest rows — just the
// taken/remaining tallies the page uses to show availability and flip a full
// tier to its waitlist state.
export const dynamic = "force-dynamic";

export async function GET() {
  const cap = await capacity(THRESHOLD_SLUG);
  return NextResponse.json(cap, {
    headers: { "Cache-Control": "no-store" },
  });
}

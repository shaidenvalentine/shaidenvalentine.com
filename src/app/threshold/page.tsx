import type { Metadata } from "next";
import { getEvent, capacity, type Capacity } from "@/lib/events";
import { THRESHOLD_SEED, THRESHOLD_SLUG, threshold } from "@content/threshold";
import { Gate } from "./Gate";

// Invite-only — keep it out of search + social previews.
export const metadata: Metadata = {
  title: "THRESHOLD — by invitation",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Serializable slice of the event config handed to the client. Caps/prices/
// dates/invite word come from the editable `events` row (seed as fallback).
export interface PublicEvent {
  name: string;
  subtitle: string;
  venue: string;
  startsOn: string;
  endsOn: string;
  inviteWord: string;
  innerPrice: number;
  innerCap: number;
  outerPrice: number;
  outerCap: number;
  depositAmount: number;
  paymentDetails: string;
}

export default async function ThresholdRoute() {
  const ev = await getEvent(THRESHOLD_SLUG);
  const cap: Capacity = await capacity(THRESHOLD_SLUG);

  const event: PublicEvent = {
    name: ev?.name ?? THRESHOLD_SEED.name,
    subtitle: ev?.subtitle ?? THRESHOLD_SEED.subtitle,
    venue: ev?.venue ?? THRESHOLD_SEED.venue,
    startsOn: ev?.starts_on ?? THRESHOLD_SEED.startsOn,
    endsOn: ev?.ends_on ?? THRESHOLD_SEED.endsOn,
    inviteWord: ev?.invite_word ?? THRESHOLD_SEED.inviteWord,
    innerPrice: ev?.inner_price ?? THRESHOLD_SEED.innerPrice,
    innerCap: ev?.inner_cap ?? THRESHOLD_SEED.innerCap,
    outerPrice: ev?.outer_price ?? THRESHOLD_SEED.outerPrice,
    outerCap: ev?.outer_cap ?? THRESHOLD_SEED.outerCap,
    depositAmount: ev?.deposit_amount ?? THRESHOLD_SEED.depositAmount,
    paymentDetails: ev?.payment_details ?? THRESHOLD_SEED.paymentDetails,
  };

  return <Gate event={event} initialCapacity={cap} copy={threshold} />;
}

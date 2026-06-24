import { getEvent, isConfigured, type EventConfigInput } from "@/lib/events";
import { THRESHOLD_SEED, THRESHOLD_SLUG } from "@content/threshold";
import { ConfigForm } from "./ConfigForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const dateStr = (v: string | null | undefined) => (v ? String(v).slice(0, 10) : "");

export default async function ConfigPage() {
  if (!isConfigured()) {
    return (
      <p className="body-sm max-w-[64ch]">
        Database not connected — connect Postgres in Vercel and the editable THRESHOLD config appears here.
      </p>
    );
  }

  const ev = await getEvent(THRESHOLD_SLUG);
  const s = THRESHOLD_SEED;

  const initial: EventConfigInput = {
    name: ev?.name ?? s.name,
    subtitle: ev?.subtitle ?? s.subtitle,
    venue: ev?.venue ?? s.venue,
    starts_on: dateStr(ev?.starts_on ?? s.startsOn),
    ends_on: dateStr(ev?.ends_on ?? s.endsOn),
    invite_word: ev?.invite_word ?? s.inviteWord,
    inner_price: ev?.inner_price ?? s.innerPrice,
    inner_cap: ev?.inner_cap ?? s.innerCap,
    outer_price: ev?.outer_price ?? s.outerPrice,
    outer_cap: ev?.outer_cap ?? s.outerCap,
    deposit_amount: ev?.deposit_amount ?? s.depositAmount,
    deposit_by: dateStr(ev?.deposit_by ?? s.depositBy),
    balance_by: dateStr(ev?.balance_by ?? s.balanceBy),
    rooming_by: dateStr(ev?.rooming_by ?? s.roomingBy),
    estate_beds: ev?.estate_beds ?? s.estateBeds,
    payment_details: ev?.payment_details ?? s.paymentDetails,
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="body-sm max-w-[68ch]">
        Edit caps, prices, the invite word, dates and payment copy without redeploying. These feed the public
        /threshold page and every stat in this dashboard. The <code>outer_price</code> is a placeholder ($50) —
        confirm it before sharing the link.
      </p>
      <ConfigForm initial={initial} />
    </div>
  );
}

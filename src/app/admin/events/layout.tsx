import { getEvent } from "@/lib/events";
import { THRESHOLD_SEED, THRESHOLD_SLUG } from "@content/threshold";
import { EventNav } from "./EventNav";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EventsLayout({ children }: { children: React.ReactNode }) {
  const ev = await getEvent(THRESHOLD_SLUG);
  const name = ev?.name ?? THRESHOLD_SEED.name;
  const subtitle = ev?.subtitle ?? THRESHOLD_SEED.subtitle;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <span className="label-eyebrow">Events</span>
        <h1 className="display-1 mt-3 max-w-[14ch] text-[var(--color-ink)]">{name}.</h1>
        <p className="body-lg mt-3 max-w-[60ch] text-[var(--color-ink-muted)]">{subtitle}</p>
      </header>
      <EventNav />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

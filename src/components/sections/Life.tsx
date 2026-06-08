import { life } from "@content/personal";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImg } from "@/components/ui/SafeImg";

export function Life({ bare = false }: { bare?: boolean } = {}) {
  const gallery = (
    <div className="grid grid-cols-2 gap-3">
      {life.gallery.map((g, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl glass ${
            i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
          }`}
        >
          <div className="absolute inset-0 bg-grad-ember" />
          <SafeImg src={g.src} alt={g.caption} className="relative h-full w-full object-cover" />
          <span className="label-mono absolute bottom-3 left-3 z-10">{g.caption}</span>
        </div>
      ))}
    </div>
  );

  const cta = life.ctaLabel && life.ctaHref ? (
    <a
      href={life.ctaHref}
      target={life.ctaHref.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
    >
      {life.ctaLabel}
      <span aria-hidden>{life.ctaHref.startsWith("http") ? "↗" : "→"}</span>
    </a>
  ) : null;

  if (bare) {
    return (
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <p className="body-lg max-w-[46ch] text-[var(--color-ink-muted)]">{life.sub}</p>
          {cta}
        </Reveal>
        <Reveal delay={0.1}>{gallery}</Reveal>
      </div>
    );
  }

  return (
    <Section id="life" eyebrow={life.eyebrow} index="07 — Life">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <h2 className="display-2 max-w-[12ch]">{life.headline}</h2>
          <p className="body-lg mt-10 max-w-[46ch] text-[var(--color-ink-muted)]">{life.sub}</p>
          {cta}
        </Reveal>

        <Reveal delay={0.1}>{gallery}</Reveal>
      </div>
    </Section>
  );
}

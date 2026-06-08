import { profile } from "@content/profile";
import { chapters } from "@content/personal";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Story({ bare = false }: { bare?: boolean } = {}) {
  const body = (
    <div className={`grid gap-12 md:grid-cols-[1.05fr_1fr] md:items-start ${bare ? "" : "mt-8"}`}>
      <Reveal>
        <div className="flex flex-col gap-5">
          {profile.bio.map((para, i) => (
            <p key={i} className="body-lg text-[var(--color-ink-muted)]">
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ol className="relative flex flex-col gap-10 border-l border-[var(--color-line-strong)] pl-6 md:pl-8">
          {chapters.map((c, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.85rem] top-2 grid h-3 w-3 place-items-center rounded-full bg-[var(--color-brass)] ring-4 ring-[var(--color-bg)] md:-left-[2.3rem]"
              />
              <span className="label-mono">{c.era}</span>
              <h4 className="display-3 mt-2 max-w-[28ch] text-[var(--color-ink)]">{c.title}</h4>
              <p className="body-base mt-3 max-w-[52ch] text-[var(--color-ink-muted)]">{c.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );

  if (bare) return body;

  return (
    <Section id="story" eyebrow="Story" index="05 — Who">
      <Reveal>
        <h2 className="display-2 max-w-[14ch]">The arc.</h2>
      </Reveal>
      {body}
    </Section>
  );
}

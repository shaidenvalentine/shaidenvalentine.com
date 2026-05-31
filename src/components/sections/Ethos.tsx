import { ethos } from "@content/personal";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Ethos() {
  return (
    <Section id="ethos" eyebrow={ethos.eyebrow} index="06 — Ethos">
      <Reveal>
        <h2 className="display-2 max-w-[16ch]">{ethos.headline}</h2>
        <p className="body-lg mt-5 max-w-[52ch] text-[var(--color-ink-muted)]">{ethos.sub}</p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        {ethos.principles.map((p, i) => (
          <Reveal key={i} delay={(i % 2) * 0.08}>
            <div className="flex h-full flex-col gap-3 bg-[var(--color-bg)] p-7 md:p-9">
              <span className="signature text-3xl text-[var(--color-brass)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display-3 text-[var(--color-ink)]">{p.title}</h3>
              <p className="body-base text-[var(--color-ink-muted)]">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

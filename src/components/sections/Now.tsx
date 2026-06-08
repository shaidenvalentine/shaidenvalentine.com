import { now } from "@content/now";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

// Compact "in motion" feed — short, current beats only. Anything past
// belongs in the Story timeline.
export function Now() {
  return (
    <Section id="now" eyebrow="In Motion" index="04 — Now">
      <Reveal>
        <h2 className="display-2 max-w-[14ch]">In motion.</h2>
      </Reveal>

      <ul className="mt-10 flex flex-col gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)]">
        {now.map((item, i) => (
          <Reveal as="li" key={i} delay={i * 0.06}>
            <div className="grid grid-cols-[6rem_1fr] items-baseline gap-4 bg-[var(--color-bg)] p-5 md:grid-cols-[10rem_1fr] md:gap-8 md:p-6">
              <span className="label-mono text-[var(--color-brass)]">{item.date}</span>
              <p className="body-base text-[var(--color-ink)]">{item.line}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

import { now } from "@content/now";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Now() {
  return (
    <Section id="now" eyebrow="In Motion" index="05 — Now">
      <Reveal>
        <h2 className="display-2 max-w-[16ch]">What I&apos;m moving on right now.</h2>
      </Reveal>

      <ul className="mt-12 flex flex-col">
        {now.map((item, i) => (
          <Reveal as="li" key={i} delay={i * 0.05}>
            <div className="grid grid-cols-[6rem_1fr] gap-4 border-t border-[var(--color-line)] py-5 md:grid-cols-[10rem_1fr] md:gap-8">
              <span className="label-mono pt-1">{item.date}</span>
              <p className="body-base text-[var(--color-ink)]">{item.line}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

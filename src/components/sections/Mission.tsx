import { profile } from "@content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

// Mission pull-quote — sits right after the Hero so the positioning leads,
// before the work itself (Ventures, Investing, Press). The full bio + chapters
// arc lives further down in Story for people who want to go deeper.
export function Mission() {
  return (
    <Section id="mission" eyebrow="Mission" index="00 — Why" className="py-32 md:py-40">
      <Reveal>
        <blockquote className="mx-auto max-w-[34ch]">
          <p className="text-2xl font-normal leading-[1.4] tracking-tight text-[var(--color-ink)] md:text-3xl lg:text-4xl">
            {profile.mission}
          </p>
        </blockquote>
      </Reveal>
    </Section>
  );
}

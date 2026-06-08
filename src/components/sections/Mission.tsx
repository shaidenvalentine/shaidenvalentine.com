import { profile } from "@content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

// Mission — a typographic transition between the hero and the work, not a
// second essay. Short headline, quieter support line, generous space.
export function Mission() {
  return (
    <Section id="mission" eyebrow="Mission" index="00 — Why" className="py-32 md:py-40">
      <Reveal>
        <blockquote className="mx-auto max-w-3xl text-center text-balance">
          <p className="display-2 text-[var(--color-ink)]">{profile.mission}</p>
          {profile.missionSub && (
            <p className="body-lg mx-auto mt-7 max-w-[44ch] text-[var(--color-ink-muted)]">
              {profile.missionSub}
            </p>
          )}
        </blockquote>
      </Reveal>
    </Section>
  );
}

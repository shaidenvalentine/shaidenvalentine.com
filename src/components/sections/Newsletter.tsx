import { site } from "@content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  return (
    <Section id="newsletter" eyebrow="Newsletter" index="11 — Subscribe">
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-3xl glass-strong p-8 text-center md:p-12">
          <h2 className="display-2">{site.newsletterHeadline}</h2>
          <p className="body-lg mx-auto mt-4 max-w-[48ch] text-[var(--color-ink-muted)]">
            {site.newsletterSub}
          </p>

          <div className="mt-8">
            {site.beehiivEmbedUrl ? (
              <iframe
                src={site.beehiivEmbedUrl}
                title="Subscribe"
                scrolling="no"
                className="h-[120px] w-full rounded-xl"
                style={{ border: "none", background: "transparent" }}
              />
            ) : (
              <span className="inline-flex items-center justify-center rounded-full glass px-6 py-3 text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
                Coming soon
              </span>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

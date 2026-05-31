import { site } from "@content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Newsletter() {
  return (
    <Section id="newsletter" eyebrow="Newsletter" index="05 — Subscribe">
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
              // Placeholder until the beehiiv embed URL is added to content/site.ts
              <div className="rounded-xl border border-dashed border-[var(--color-line-strong)] p-6 text-left">
                <p className="body-sm">
                  beehiiv embed slot — paste your embed URL into{" "}
                  <code className="text-[var(--color-brass)]">content/site.ts</code>{" "}
                  (<code className="text-[var(--color-brass)]">beehiivEmbedUrl</code>)
                  and the live form renders here.
                </p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

import { profile } from "@content/profile";
import { site } from "@content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SaveContactButton } from "@/components/ui/SaveContactButton";
import { QRCode } from "@/components/ui/QRCode";

export function Connect() {
  return (
    <Section id="connect" eyebrow="Connect" index="06 — Card">
      <Reveal>
        <div className="grid gap-10 rounded-3xl glass-strong p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div className="flex flex-col">
            <h2 className="display-2">Let&apos;s stay in orbit.</h2>
            <p className="body-lg mt-4 max-w-[42ch] text-[var(--color-ink-muted)]">
              Save my card, or find me anywhere below. Everything routes back here.
            </p>

            <div className="mt-7">
              <SaveContactButton variant="solid" />
            </div>

            <ul className="mt-9 grid grid-cols-2 gap-x-8 gap-y-4">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex flex-col"
                  >
                    <span className="label-mono">{s.label}</span>
                    <span className="link-underline w-fit text-sm text-[var(--color-ink)]">
                      {s.handle ?? s.href}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3 md:border-l md:border-[var(--color-line)] md:pl-12">
            <QRCode value={site.baseUrl} size={150} />
            <span className="label-mono">scan to open · {site.domain}</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

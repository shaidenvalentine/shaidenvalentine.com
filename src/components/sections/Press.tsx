"use client";

import { track } from "@vercel/analytics";
import { press } from "@content/press";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Press() {
  if (!press.items.length) return null;

  return (
    <Section id="press" eyebrow={press.eyebrow} index="03 — Press">
      <Reveal>
        <h2 className="display-2 max-w-[14ch]">{press.headline}</h2>
        <p className="body-lg mt-10 max-w-[52ch] text-[var(--color-ink-muted)]">{press.sub}</p>
      </Reveal>

      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {press.items.map((item, i) => {
          const external = item.href.startsWith("http");
          return (
            <Reveal as="li" key={i} delay={i * 0.06}>
              <a
                href={item.href}
                target={external ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => track("press_click", { outlet: item.outlet })}
                className="group flex h-full flex-col rounded-3xl glass p-6 transition duration-500 hover:-translate-y-0.5 md:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="label-eyebrow">{item.outlet}</span>
                  {item.kind && (
                    <span className="label-mono rounded-full border border-[var(--color-line-strong)] px-2.5 py-0.5">
                      {item.kind}
                    </span>
                  )}
                </div>

                <p className="display-3 mt-5 flex-1 text-[var(--color-ink)]">{item.title}</p>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--color-line)] pt-4">
                  {item.date && <span className="label-mono">{item.date}</span>}
                  <span className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] transition group-hover:text-[var(--color-ink)]">
                    {external ? "Read" : "Coming soon"}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

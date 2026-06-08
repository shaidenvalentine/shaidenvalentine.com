"use client";

import { useState } from "react";
import { products } from "@content/shop";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImg } from "@/components/ui/SafeImg";
import { LeadModal } from "@/components/ui/LeadModal";

export function Shop() {
  const [active, setActive] = useState<{ title: string; url: string } | null>(null);

  if (!products.length) return null;

  return (
    <Section id="shop" eyebrow="Shop" index="12 — Products">
      <Reveal>
        <h2 className="display-2 max-w-[16ch]">Books I&apos;ve written.</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.title} delay={i * 0.08}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl glass">
              <div className="relative aspect-[16/10] overflow-hidden bg-grad-ember">
                <SafeImg src={product.image} alt={product.title} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <span className="label-eyebrow">Digital product</span>
                <h3 className="display-3 mt-3 text-[var(--color-ink)]">{product.title}</h3>
                <p className="body-base mt-10 flex-1 text-[var(--color-ink-muted)]">{product.blurb}</p>

                {product.downloadUrl ? (
                  <div className="mt-7 flex items-center gap-5">
                    <span className="font-mono text-2xl text-[var(--color-ink)]">Free</span>
                    <button
                      type="button"
                      onClick={() =>
                        setActive({ title: product.title, url: product.downloadUrl! })
                      }
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
                    >
                      Download
                      <span aria-hidden>↓</span>
                    </button>
                  </div>
                ) : product.price.includes("—") || product.checkoutUrl === "#" ? (
                  <div className="mt-7">
                    <span className="inline-flex items-center justify-center rounded-full glass px-6 py-3 text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
                      Coming soon
                    </span>
                  </div>
                ) : (
                  <div className="mt-7 flex items-center gap-5">
                    <span className="font-mono text-2xl text-[var(--color-ink)]">{product.price}</span>
                    <a
                      href={product.checkoutUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
                    >
                      Buy now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <LeadModal
        open={active !== null}
        onClose={() => setActive(null)}
        intent={active ? `Ebook download — ${active.title}` : ""}
        eyebrow="Free download"
        headline={active ? `Get “${active.title}”` : "Get the book"}
        blurb="Tell me where to send it and I'll send it your way. The download starts as soon as you submit."
        downloadUrl={active?.url}
      />
    </Section>
  );
}

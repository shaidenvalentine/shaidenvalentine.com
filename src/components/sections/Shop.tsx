import { products } from "@content/shop";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImg } from "@/components/ui/SafeImg";

export function Shop() {
  const product = products[0];
  if (!product) return null;

  return (
    <Section id="shop" eyebrow="Shop" index="09 — Products">
      <Reveal>
        <div className="grid gap-8 rounded-3xl glass p-6 md:grid-cols-[1fr_1.2fr] md:items-center md:p-8">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-grad-ember">
            <SafeImg src={product.image} alt={product.title} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col">
            <span className="label-eyebrow">Digital product</span>
            <h2 className="display-3 mt-3 text-[var(--color-ink)]">{product.title}</h2>
            <p className="body-base mt-4 text-[var(--color-ink-muted)]">{product.blurb}</p>

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
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

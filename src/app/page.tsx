import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Ventures } from "@/components/sections/Ventures";
import { Investing } from "@/components/sections/Investing";
import { Press } from "@/components/sections/Press";
import { Now } from "@/components/sections/Now";
import { Story } from "@/components/sections/Story";
import { Ethos } from "@/components/sections/Ethos";
import { Life } from "@/components/sections/Life";
import { Coaching } from "@/components/sections/Coaching";
import { Course } from "@/components/sections/Course";
import { WorkWithMe } from "@/components/sections/WorkWithMe";
import { Newsletter } from "@/components/sections/Newsletter";
import { Shop } from "@/components/sections/Shop";
import { Feedback } from "@/components/sections/Feedback";
import { Connect } from "@/components/sections/Connect";
import { Collapsible } from "@/components/ui/Collapsible";
import { profile } from "@content/profile";
import { site } from "@content/site";

// Layout philosophy: keep the visual / action surfaces visible (work, offers,
// signup forms), and collapse the heavy-prose sections (story, ethos, life)
// behind dropdowns so the page reads as a clean, browseable site rather than
// a long essay.
export default function Home() {
  return (
    <main>
      <Hero />

      {/* Mission stays visible — it's the spine */}
      <Mission />

      {/* Work — what I'm building, backing, and moving on now */}
      <Ventures />
      <Investing />
      <Press />
      <Now />

      {/* For people who want to go deeper — collapsed by default */}
      <Collapsible
        id="story"
        eyebrow="Story"
        index="05 — Who"
        headline="The arc."
        preview="Raised by a photographer dad and flight attendant mom. Left school early, 80 countries through my 20s, a viral van, then Bali. The full timeline."
      >
        <Story bare />
      </Collapsible>

      <Collapsible
        id="ethos"
        eyebrow="Principles"
        index="06 — Lens"
        headline="Principles I live by."
        preview="The core ideas from The Game of Life — only play moves you want, integrity is the cheat code, environment is an input, money is a byproduct."
      >
        <Ethos bare />
      </Collapsible>

      <Collapsible
        id="life"
        eyebrow="Life"
        index="07 — Bali"
        headline="I live in Bali."
        preview="Why Bali, the rhythm, the scene — and how to find your own place to land."
      >
        <Life bare />
      </Collapsible>

      {/* Offers — the things you can engage with */}
      <Coaching />
      <Course />

      {/* Take action — these are the conversion surfaces */}
      <Collapsible
        id="work"
        eyebrow="Work with me"
        index="10 — Collaborate"
        headline="Want to build together?"
        preview="If you have a skill set, a network, or capital that moves one of my projects forward — or a pitch I should hear — open this and make the case."
      >
        <WorkWithMe bare />
      </Collapsible>

      <Newsletter />
      <Shop />

      <Collapsible
        id="feedback"
        eyebrow="Anonymous feedback"
        index="13 — Honest"
        headline="Tell me what I need to hear."
        preview="Fully anonymous — no name, email, or IP. Open this if there's something you want me to know."
      >
        <Feedback bare />
      </Collapsible>

      <Connect />

      <footer className="border-t border-[var(--color-line)] py-10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="label-mono">
            © {profile.name} · {site.domain}
          </span>
          <div className="flex items-center gap-6">
            <a href="/carousels" className="label-mono link-underline">
              carousels →
            </a>
            <a href="#top" className="label-mono link-underline">
              back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

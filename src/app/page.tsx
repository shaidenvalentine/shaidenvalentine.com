import { Hero } from "@/components/sections/Hero";
import { Ventures } from "@/components/sections/Ventures";
import { Now } from "@/components/sections/Now";
import { Story } from "@/components/sections/Story";
import { WorkWithMe } from "@/components/sections/WorkWithMe";
import { Newsletter } from "@/components/sections/Newsletter";
import { Shop } from "@/components/sections/Shop";
import { Feedback } from "@/components/sections/Feedback";
import { Connect } from "@/components/sections/Connect";
import { profile } from "@content/profile";
import { site } from "@content/site";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ventures />
      <Now />
      <Story />
      <WorkWithMe />
      <Newsletter />
      <Shop />
      <Feedback />
      <Connect />

      <footer className="border-t border-[var(--color-line)] py-10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <span className="label-mono">
            © {profile.name} · {site.domain}
          </span>
          <a href="#top" className="label-mono link-underline">
            back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

import type { Metadata, Viewport } from "next";
import Game from "./Game";

export const metadata: Metadata = {
  title: "Carlisle vs Steven 🦀",
  description:
    "A hermit crab showdown from the Raja Ampat boys' dive trip. Scurry the maze, gobble crumbs, grab a glowing shell and chomp your rival. Play on your phone — solo vs CPU or two players on one screen.",
  applicationName: "Carlisle vs Steven",
  appleWebApp: { capable: true, title: "Carlisle vs Steven", statusBarStyle: "black-translucent" },
  openGraph: {
    title: "Carlisle vs Steven 🦀",
    description:
      "Hermit crab arena brawl. Eat crumbs, grab a shell, chomp your rival. Solo or 2-player on one phone.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlisle vs Steven 🦀",
    description: "Hermit crab arena brawl. Can you out-crab your friends?",
  },
};

// iOS web-app viewport: fill the notch, lock zoom so swipes steer instead of
// pinch-zooming the board.
export const viewport: Viewport = {
  themeColor: "#04263b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function Page() {
  return <Game />;
}

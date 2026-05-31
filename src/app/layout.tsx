import type { Metadata, Viewport } from "next";
import { Orbitron, Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@content/site";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import "./globals.css";

// Signature — Orbitron. Geometric futuristic display sans, sci-fi/tech feel.
// Used for Shaiden's name as the hero display moment.
const signature = Orbitron({
  subsets: ["latin"],
  variable: "--font-signature",
  weight: ["500", "600", "700"],
  display: "swap",
});

// Display — Space Grotesk. Modern geometric sans for headings.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Body — Geist. Clean, modern, neutral UI sans.
const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

// Mono — for indices and technical labels.
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: { default: site.seoTitle, template: "%s · Shaiden Valentine" },
  description: site.seoDescription,
  applicationName: "Shaiden Valentine",
  appleWebApp: { capable: true, title: "Shaiden Valentine", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  openGraph: {
    title: site.seoTitle,
    description: site.seoDescription,
    type: "website",
    url: site.baseUrl,
    siteName: "Shaiden Valentine",
    locale: "en_US",
    images: [{ url: site.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.seoDescription,
    creator: "@shaidenvalentine",
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${signature.variable} ${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}

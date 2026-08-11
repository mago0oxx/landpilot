import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import PostHogProvider from "@/components/PostHogProvider";
import { SITE_URL } from "@/lib/siteUrl";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  // Secondary/accent font (score displays, badges) — not always rendered above the
  // fold, so preloading it on every route just trips the "unused preload" warning.
  preload: false,
});

const SITE_DESCRIPTION =
  "Check a vacant lot before you buy it. LandPilot pulls flood zone, legal access, utilities and zoning data from FEMA, Census and county GIS, and tells you what you're really getting into.";

export const metadata: Metadata = {
  // Resolves every relative OG/canonical URL below — without it Next emits warnings and
  // social scrapers get relative paths they can't fetch.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LandPilot — Know what you're buying before you buy the land",
    // Page-level `title` strings get this suffix automatically, so individual pages no
    // longer need to hand-write "— LandPilot".
    template: "%s — LandPilot",
  },
  description: SITE_DESCRIPTION,
  applicationName: "LandPilot",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "LandPilot",
    title: "LandPilot — Know what you're buying before you buy the land",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LandPilot — Know what you're buying before you buy the land",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-lp-cream text-lp-ink">
        <SessionProvider>
          <PostHogProvider>{children}</PostHogProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

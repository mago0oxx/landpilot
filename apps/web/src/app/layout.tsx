import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import PostHogProvider from "@/components/PostHogProvider";
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

export const metadata: Metadata = {
  title: "LandPilot",
  description: "The intelligent platform for land investment analysis.",
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

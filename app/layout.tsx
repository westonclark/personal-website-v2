import "./global.css";
import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Weston Clark",
    template: "%s | Weston Clark",
  },
  description: "Software engineer",
  openGraph: {
    title: "Weston Clark",
    description: "Software engineer",
    url: baseUrl,
    siteName: "Weston Clark",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const stixTwoText = STIX_Two_Text({
  subsets: ["latin"],
  display: "swap",
});

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-neutral-800 dark:text-amber-50/90 text-lg",
        stixTwoText.className,
      )}
    >
      <body className="antialiased bg-[#f0efea] dark:bg-zinc-950 mx-auto px-8 py-24 md:px-16 md:py-60 md:max-w-2xl ">
        <main className="">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

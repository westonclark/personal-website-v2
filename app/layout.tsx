import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Weston Clark - Software Engineer",
      template: "%s | Weston Clark",
    },
    description: "Software engineer portfolio and personal website of Weston Clark.",
    openGraph: {
      title: "Weston Clark - Software Engineer",
      description: "Portfolio and personal website of Weston Clark.",
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

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html
  lang="en"
  className={cx(
    "text-black bg-white dark:text-white dark:bg-black",
    GeistSans.variable,
    GeistMono.variable,
  )}
>
  <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto min-h-screen flex flex-col">
    <main className="flex-1 flex flex-col px-2 md:px-0">
      <Navbar />
      {children}
    </main>
    <Footer />
    <Analytics />
    <SpeedInsights />
  </body>
</html>
  );
}

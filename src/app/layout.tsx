import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { allowIndexing, siteUrl } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz"] });
const ethiopic = Noto_Sans_Ethiopic({ subsets: ["ethiopic"], variable: "--font-noto-ethiopic", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: allowIndexing ? undefined : { index: false, follow: false },
  title: {
    default: "Ethiopian Seed Association (ESA)",
    template: "%s | Ethiopian Seed Association",
  },
  description:
    "The Ethiopian Seed Association unites 60 public, private, multinational and cooperative seed businesses to supply quality seed to Ethiopian farmers.",
  icons: { icon: "/images/esa-logo.png" },
};

// N1 / N3: zoom is never restricted
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d2617",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} ${ethiopic.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-wheat-400 px-4 py-2 font-semibold text-forest-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {!allowIndexing && (
          <div role="note" className="bg-wheat-400 px-4 py-2 text-center text-xs font-bold text-forest-950 sm:text-sm">
            Prototype – not an official ESA website. Content is for review and awaiting ESA verification.
          </div>
        )}
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

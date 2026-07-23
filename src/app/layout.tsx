import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCta from "@/components/layout/FloatingCta";
import JsonLd from "@/components/seo/JsonLd";
import {
  organizationJsonLd,
  localBusinessJsonLd,
  personJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld";
import { site, siteUrl } from "@/config/site";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.tagline}｜${site.name}`,
    template: `%s｜${site.name}`,
  },
  description:
    "沖縄県那覇市を中心に沖縄本島へ訪問する、わんnessの出張トリミング。身体の左右差や動かしやすさを確認し、スキンケアとボディケアを取り入れたベーシックケアトリミングを提供しています。",
  openGraph: {
    siteName: site.name,
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="antialiased">
        <JsonLd
          data={[
            organizationJsonLd(),
            localBusinessJsonLd(),
            personJsonLd(),
            websiteJsonLd(),
          ]}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main-content" className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}

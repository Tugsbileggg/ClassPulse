import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

// Монгол кириллийн Ө, Ү үсэг "cyrillic-ext" subset-д байдаг тул заавал нэмнэ.
const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "ClassPulse",
    "ангийн оролцоо",
    "багш",
    "сургууль",
    "хиймэл оюун ухаан",
    "сурагчийн идэвх",
    "боловсролын технологи",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={manrope.variable}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}

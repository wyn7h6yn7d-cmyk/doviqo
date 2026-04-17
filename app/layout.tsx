import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { siteMeta, skipLink } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a10",
};

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: [...siteMeta.keywords],
  metadataBase: new URL("https://doviqo.com"),
  applicationName: "Doviqo",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    type: "website",
    url: "/",
    siteName: "Doviqo",
    locale: "et_EE",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="et"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gradient-to-r focus:from-[rgb(124,92,255)] focus:to-[rgb(99,102,241)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white focus:shadow-glow-accent focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-cyan)/0.45)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
        >
          {skipLink}
        </a>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}

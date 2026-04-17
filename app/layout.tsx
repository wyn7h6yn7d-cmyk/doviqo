import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doviqo — vestlustest selged järgmised sammud",
  description:
    "Koosolek lõpeb — töö ei tohiks kaduda. Doviqo muudab koosoleku märkmed ja üleskirjutuse minutitega vastutajateks, tähtaegadeks, järeltegevuseks ja järgmiste sammude plaaniks.",
  metadataBase: new URL("https://doviqo.com"),
  applicationName: "Doviqo",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Doviqo — vestlustest selged järgmised sammud",
    description:
      "Koosolek lõpeb — töö ei tohiks kaduda. Doviqo muudab koosoleku märkmed ja üleskirjutuse minutitega vastutajateks, tähtaegadeks ja järeltegevuseks.",
    type: "website",
    url: "/",
    siteName: "Doviqo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doviqo — vestlustest selged järgmised sammud",
    description:
      "Koosoleku märkmed ja üleskirjutus → vastutajad, tähtajad ja järeltegevus mõne minutiga.",
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:shadow-lg"
        >
          Liigu sisu juurde
        </a>
        {children}
      </body>
    </html>
  );
}

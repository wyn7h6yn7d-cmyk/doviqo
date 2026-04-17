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
  title: "Doviqo — From meeting to momentum",
  description:
    "Doviqo turns meeting notes and transcripts into clear owners, deadlines, follow-ups, and next steps—fast.",
  metadataBase: new URL("https://doviqo.com"),
  openGraph: {
    title: "Doviqo — From meeting to momentum",
    description:
      "Meetings end. Work slips. Doviqo fixes that. Turn meeting notes into clear next steps with owners and deadlines.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doviqo — From meeting to momentum",
    description:
      "Turn meeting notes and transcripts into clear owners, deadlines, follow-ups, and next steps in minutes.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-white/15 selection:text-white">
        {children}
      </body>
    </html>
  );
}

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
  title: "Doviqo — turn conversations into clear next steps",
  description:
    "Meetings end. Work slips. Doviqo fixes that. Turn meeting notes and transcripts into clear owners, deadlines, follow-ups, and next steps in minutes.",
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
    title: "Doviqo — turn conversations into clear next steps",
    description:
      "Meetings end. Work slips. Doviqo fixes that. Turn meeting notes and transcripts into clear owners, deadlines, follow-ups, and next steps in minutes.",
    type: "website",
    url: "/",
    siteName: "Doviqo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doviqo — turn conversations into clear next steps",
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

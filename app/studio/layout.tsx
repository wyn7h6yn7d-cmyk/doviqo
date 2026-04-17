import type { Metadata } from "next";

import { studioMeta } from "@/lib/studio/copy";

export const metadata: Metadata = {
  title: { absolute: studioMeta.title },
  description: studioMeta.description,
  openGraph: {
    title: studioMeta.title,
    description: studioMeta.description,
    type: "website",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { hreflangMap, siteUrl } from "@/data/site";
import "../globals.css";

const dict = getDictionary("ru");

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: dict.gate.title,
  description: dict.gate.subtitle,
  alternates: siteUrl
    ? {
        canonical: `${siteUrl}/`,
        languages: hreflangMap(),
      }
    : undefined,
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
};

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

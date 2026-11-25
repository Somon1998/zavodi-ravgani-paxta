import type { Metadata } from "next";
import { site, siteUrl } from "@/data/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: `${site.name} — хлопковое масло в Таджикистане`,
  description: site.description,
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: {
    siteName: site.name,
    title: `${site.name} — готовимся к открытию`,
    description: site.description,
    locale: "ru_RU",
    type: "website",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/images/hero.webp",
              width: 1536,
              height: 1024,
              alt: "Иллюстрация производства растительного масла",
            },
          ],
        }
      : {}),
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

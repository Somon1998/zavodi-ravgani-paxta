import { notFound } from "next/navigation";
import {
  isLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from "@/i18n/config";
import { buildLocaleMetadata } from "@/lib/seo";
import "../../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildLocaleMetadata(raw);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <html lang={localeHtmlLang[locale]}>
      <body>{children}</body>
    </html>
  );
}

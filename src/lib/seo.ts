import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { localeOpenGraph } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { hreflangMap, localeUrl, siteAssets, siteUrl } from "@/data/site";

export function buildLocaleMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const canonical = localeUrl(locale);
  const languages = hreflangMap();

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: dict.seo.title,
    description: dict.seo.description,
    alternates: canonical
      ? {
          canonical,
          languages,
        }
      : undefined,
    robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
    openGraph: {
      siteName: dict.brand.name,
      title: dict.seo.ogTitle,
      description: dict.seo.description,
      locale: localeOpenGraph[locale],
      type: "website",
      ...(canonical
        ? {
            url: canonical,
            images: [
              {
                url: siteAssets.heroImage,
                width: 1536,
                height: 1024,
                alt: dict.seo.ogImageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.twitterTitle,
      description: dict.seo.description,
      ...(siteUrl
        ? {
            images: [siteAssets.heroImage],
          }
        : {}),
    },
  };
}

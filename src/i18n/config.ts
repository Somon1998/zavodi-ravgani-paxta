export const locales = ["ru", "tg", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "RU",
  tg: "TJ",
  en: "EN",
};

export const localeHtmlLang: Record<Locale, string> = {
  ru: "ru",
  tg: "tg",
  en: "en",
};

export const localeOpenGraph: Record<Locale, string> = {
  ru: "ru_RU",
  tg: "tg_TJ",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, hash = ""): string {
  const normalized = hash && !hash.startsWith("#") ? `#${hash}` : hash;
  return `/${locale}/${normalized}`;
}

import type { Dictionary } from "@/i18n/get-dictionary";
import { locales, type Locale } from "@/i18n/config";

/** SVG-знак пока временный. Подтверждённые контактные данные — единый источник. */
export const siteAssets = {
  logo: "/logo/cotton.svg",
  heroImage: "/images/hero.webp",
  productImage: "/images/vakhsh-sanoat-product.webp",
} as const;

export const siteContacts = {
  phone: "+992 88 844 3588",
  whatsapp: "+992 88 844 3588",
  email: "",
} as const;

function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:")
    throw new Error("NEXT_PUBLIC_SITE_URL должен начинаться с https://");
  return url.origin;
}

export const siteUrl = getSiteUrl();

export function localeUrl(locale: Locale): string | undefined {
  if (!siteUrl) return undefined;
  return `${siteUrl}/${locale}/`;
}

export function hreflangMap(): Record<string, string> | undefined {
  if (!siteUrl) return undefined;
  const map: Record<string, string> = {
    "x-default": `${siteUrl}/ru/`,
  };
  for (const locale of locales) {
    map[locale] = `${siteUrl}/${locale}/`;
  }
  return map;
}

export type ContactLink = {
  id: "phone" | "whatsapp" | "email";
  label: string;
  text: string;
  href: string;
};

export function contactLinks(dict: Dictionary): ContactLink[] {
  const { phone, whatsapp, email } = siteContacts;
  const links: ContactLink[] = [];
  if (phone) {
    links.push({
      id: "phone",
      label: dict.contacts.phoneLabel,
      text: phone,
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
    });
  }
  if (whatsapp) {
    links.push({
      id: "whatsapp",
      label: dict.contacts.whatsappLabel,
      text: dict.contacts.whatsappCta,
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(dict.contacts.whatsappMessage)}`,
    });
  }
  if (email) {
    links.push({
      id: "email",
      label: "Email",
      text: email,
      href: `mailto:${email}`,
    });
  }
  return links;
}

export function navigation(dict: Dictionary) {
  return [
    { href: "#home", label: dict.nav.home },
    { href: "#about", label: dict.nav.about },
    { href: "#production", label: dict.nav.production },
    { href: "#products", label: dict.nav.products },
    { href: "#contacts", label: dict.nav.contacts },
  ] as const;
}

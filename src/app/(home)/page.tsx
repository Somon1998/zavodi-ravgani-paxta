import Image from "next/image";
import type { Metadata } from "next";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteAssets } from "@/data/site";

export const metadata: Metadata = {
  title: "Vakhsh Sanoat / Вахш Саноат",
  description: "Choose language / Забонро интихоб кунед / Выберите язык",
};

const languageLabels: Record<Locale, string> = {
  ru: getDictionary("ru").gate.languages.ru,
  tg: getDictionary("tg").gate.languages.tg,
  en: getDictionary("en").gate.languages.en,
};

export default function LanguageGatePage() {
  const dict = getDictionary("ru");

  return (
    <main className="lang-gate">
      <div className="lang-gate-shade" />
      <div className="lang-gate-panel">
        <Image
          src={siteAssets.logo}
          width={64}
          height={74}
          alt=""
          priority
        />
        <h1>{dict.gate.title}</h1>
        <p>{dict.gate.subtitle}</p>
        <p className="lang-gate-choose">{dict.gate.choose}</p>
        <ul className="lang-gate-list">
          {locales.map((locale) => (
            <li key={locale}>
              <a href={`/${locale}/`} hrefLang={locale} lang={locale}>
                <span className="lang-gate-code">{localeNames[locale]}</span>
                <span className="lang-gate-name">{languageLabels[locale]}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

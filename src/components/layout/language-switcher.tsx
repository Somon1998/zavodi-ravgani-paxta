"use client";

import { useEffect, useState } from "react";
import {
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";

type Props = {
  locale: Locale;
  label: string;
  variant?: "header";
};

export function LanguageSwitcher({
  locale,
  label,
  variant = "header",
}: Props) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <nav
      className={`lang-switcher lang-switcher-${variant}`}
      aria-label={label}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <a
            key={code}
            href={`/${code}/${hash}`}
            hrefLang={code}
            lang={code}
            aria-current={active ? "page" : undefined}
            aria-label={localeNames[code]}
            className={active ? "is-active" : undefined}
          >
            {localeNames[code]}
          </a>
        );
      })}
    </nav>
  );
}

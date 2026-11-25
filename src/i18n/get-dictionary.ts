import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { ru } from "./dictionaries/ru";
import { tg } from "./dictionaries/tg";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = {
  ru,
  tg,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

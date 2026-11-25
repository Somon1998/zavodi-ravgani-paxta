# TASK #003.5 — Premium Contact Section Redesign

Дата: 25 ноября 2026 года.

## Результат

Секция «Контакты» переработана визуально: три согласованных элемента (Адрес, Телефон, WhatsApp) с иконками в фирменном зелёном стиле. Двухколоночная композиция на Desktop сохранена. Header, Hero, Производство, Продукция, Footer, логотип, SEO, домен и QR-код не менялись. Push и деплой не выполнялись.

## Структура контактного блока

| Элемент | Иконка | Данные | Ссылка |
| --- | --- | --- | --- |
| Адрес | MapPin (inline SVG) | `site.contacts.address` | — |
| Телефон | Phone (inline SVG) | `site.contacts.phone` | `tel:+992888443588` |
| WhatsApp | Официальный glyph (inline SVG) | «Написать в WhatsApp» | `https://wa.me/992888443588` + сохранённый `text` |

Адрес в `src/data/site.ts`:

`Республика Таджикистан, Хатлонская область, Кушониёнский район, Джамоат посёлок Бохтариён, село С.Шерози`

## Стиль

- Фон секции — существующий светлый (`--paper`)
- Текст и подписи — тёмно-зелёный (`--green` / `--ink`)
- Иконки — фирменный зелёный (`--leaf`) на светло-зелёном фоне
- Скругления 12–14 px
- Hover только у кликабельных строк (Телефон, WhatsApp)
- Без золотого/оранжевого/жёлтого в контактных элементах
- Без тёмного фона референса

## Изменённые файлы

- `src/components/sections/home.tsx` — разметка Contacts
- `src/app/globals.css` — стили контактного списка
- `src/data/site.ts` — уточнение адреса (Джамоат)
- `tests/site.spec.ts` — проверки нового блока
- `docs/TASK-003.5-REPORT.md` — отчёт

## Проверки

| Проверка | Результат |
| --- | --- |
| ESLint | OK |
| TypeScript | OK |
| Production build | OK |
| Playwright | **9/9** |
| Desktop 2 колонки | OK |
| Mobile вертикально | OK |
| `tel:` / WhatsApp + prefilled text | OK |
| Полный адрес без горизонтального скролла | OK |

## Скриншоты

- Desktop (секция): `artifacts/task-003-5/contacts-section-desktop.png`
- Mobile (секция): `artifacts/task-003-5/contacts-section-mobile.png`
- Desktop (viewport): `artifacts/task-003-5/contacts-desktop.png`
- Mobile (viewport): `artifacts/task-003-5/contacts-mobile.png`

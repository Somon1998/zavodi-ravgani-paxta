# TASK #003.4 — Обновление официального адреса «Вахш Саноат»

Дата: 25 ноября 2026 года.

## Результат

Официальный адрес предприятия размещён в разделе «Контакты» и в Footer. Заглушка «Точный адрес будет опубликован после подтверждения» удалена. Адрес хранится в одном месте (`src/data/site.ts`). Телефон, WhatsApp, название предприятия, Header и Hero не менялись. Карта и координаты не добавлялись. Push и деплой не выполнялись.

## Официальный адрес

`Республика Таджикистан, Хатлонская область, Кушониёнский район, посёлок Бохтариён, село С.Шерози`

## Где обновлён адрес

| Место | Источник данных |
| --- | --- |
| Единый конфиг | константа `address` в `src/data/site.ts` → `site.contacts.address` / `site.location` |
| Раздел «Контакты» | `site.contacts.address` через класс `.contact-address` |
| Footer | `site.contacts.address` через класс `.footer-location` |

Hero и блок «О предприятии» по-прежнему показывают только `region` / `district` (коротко), без длинного адреса.

## Изменённые файлы

- `src/data/site.ts` — централизованный официальный адрес;
- `src/components/sections/home.tsx` — Contacts: убрана заглушка, показан адрес;
- `src/components/layout/site-layout.tsx` — Footer: местоположение из `site.contacts.address`;
- `src/app/globals.css` — перенос длинного адреса на desktop/mobile;
- `tests/site.spec.ts` — проверки адреса, отсутствия заглушки, разрешения «Бохтариён»;
- `docs/TASK-003.4-REPORT.md` — этот отчёт.

## Проверки

| Проверка | Результат |
| --- | --- |
| `npm run lint` | успешно |
| `npm run typecheck` | успешно |
| `npm run build` | успешно |
| `npm run test:e2e` | 9/9 прошли |
| Заглушка о неподтверждённом адресе | отсутствует |
| Адрес в `#contacts` и `.footer` | совпадает с официальным |
| Адаптив 320–1920 | адрес переносится, overflow нет |

## Скриншоты

- Desktop Contacts: `artifacts/task-003-4/contacts-desktop.png`
- Mobile Contacts: `artifacts/task-003-4/contacts-mobile.png`
- Desktop Footer: `artifacts/task-003-4/footer-desktop.png`
- Mobile Footer: `artifacts/task-003-4/footer-mobile.png`

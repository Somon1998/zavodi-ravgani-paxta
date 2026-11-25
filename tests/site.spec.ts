import { test, expect, type Page } from "@playwright/test";

const locales = [
  {
    code: "ru",
    brand: "Вахш Саноат",
    h1: "Растительное масло от производителя",
    about: "О компании «Вахш Саноат»",
    product: "Хлопковое масло «Вахш Саноат»",
    secondary: "Равғани пахта",
    secondaryLang: "tg",
    address:
      "Республика Таджикистан, Хатлонская область, Кушониёнский район, Джамоат посёлок Бохтариён, село С.Шерози",
    addressSnippet: "Джамоат посёлок Бохтариён, село С.Шерози",
    contactLabels: ["Адрес", "Телефон", "WhatsApp"],
    whatsappCta: "Написать в WhatsApp",
    whatsappText:
      "Здравствуйте! Меня интересует продукция „Вахш Саноат“. Хотел бы получить дополнительную информацию",
    openMenu: "Открыть меню",
    mobileNav: "Мобильная навигация",
    mainNav: "Основная навигация",
    footerNav: "Навигация в подвале",
    aboutNav: "О компании",
    contactsNav: "Контакты",
    productsCta: "Наша продукция",
    homeAria: "Вахш Саноат — на главную",
    htmlLang: "ru",
    forbidden: [/Маслозавод/i, /Preparing to open/i, /Cottonseed oil production enterprise/i],
  },
  {
    code: "tg",
    brand: "Вахш Саноат",
    h1: "Равғани растанӣ аз истеҳсолкунанда",
    about: "Дар бораи ширкати «Вахш Саноат»",
    product: "Равғани пахтаи «Вахш Саноат»",
    secondary: "Cottonseed oil",
    secondaryLang: "en",
    address:
      "Ҷумҳурии Тоҷикистон, вилояти Хатлон, ноҳияи Кӯшониён, ҷамоати шаҳраки Бохтариён, деҳаи С. Шерозӣ",
    addressSnippet: "ҷамоати шаҳраки Бохтариён, деҳаи С. Шерозӣ",
    contactLabels: ["Суроға", "Телефон", "WhatsApp"],
    whatsappCta: "Нависед ба WhatsApp",
    whatsappText:
      "Ассалому алейкум! Ман ба маҳсулоти «Вахш Саноат» таваҷҷуҳ дорам. Мехоҳам маълумоти иловагӣ гирам",
    openMenu: "Кушодани меню",
    mobileNav: "Менюи мобилӣ",
    mainNav: "Менюи асосӣ",
    footerNav: "Менюи поёнӣ",
    aboutNav: "Дар бораи ширкат",
    contactsNav: "Тамос",
    productsCta: "Маҳсулоти мо",
    homeAria: "Вахш Саноат — ба саҳифаи асосӣ",
    htmlLang: "tg",
    forbidden: [
      /Маслозавод/i,
      /Готовимся к открытию/i,
      /О компании/i,
      /Preparing to open/i,
      /Our products/i,
    ],
  },
  {
    code: "en",
    brand: "Vakhsh Sanoat",
    h1: "Vegetable oil from the producer",
    about: "About Vakhsh Sanoat",
    product: "Vakhsh Sanoat cottonseed oil",
    secondary: "Равғани пахта",
    secondaryLang: "tg",
    address:
      "Republic of Tajikistan, Khatlon Region, Kushoniyon District, Bokhtariyon town jamoat, S. Sherozi village",
    addressSnippet: "Bokhtariyon town jamoat, S. Sherozi village",
    contactLabels: ["Address", "Phone", "WhatsApp"],
    whatsappCta: "Message on WhatsApp",
    whatsappText:
      "Hello! I am interested in Vakhsh Sanoat products and would like more information",
    openMenu: "Open menu",
    mobileNav: "Mobile navigation",
    mainNav: "Primary navigation",
    footerNav: "Footer navigation",
    aboutNav: "About",
    contactsNav: "Contacts",
    productsCta: "Our products",
    homeAria: "Vakhsh Sanoat — go to homepage",
    htmlLang: "en",
    forbidden: [
      /Маслозавод/i,
      /Готовимся к открытию/i,
      /О компании/i,
      /хлопковое масло/i,
      /Наша продукция/i,
    ],
  },
] as const;

async function assertNoHorizontalOverflow(page: Page, width: number) {
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    page: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll("body *")].flatMap((element) => {
      const box = element.getBoundingClientRect();
      return box.right > window.innerWidth + 1
        ? [
            {
              tag: element.tagName,
              className: element.getAttribute("class"),
              right: box.right,
              width: box.width,
            },
          ]
        : [];
    }),
  }));
  expect(overflow.page, JSON.stringify(overflow, null, 2)).toBeLessThanOrEqual(
    width,
  );
}

async function assertNoHeaderOverlap(page: Page) {
  const overlap = await page.evaluate(() => {
    const brand = document.querySelector(".header .brand");
    const langs = document.querySelector(".header .lang-switcher-header");
    const menu = document.querySelector(".header .menu-toggle");
    if (!brand || !langs || !menu) return { ok: false, reason: "missing nodes" };
    const a = brand.getBoundingClientRect();
    const b = langs.getBoundingClientRect();
    const c = menu.getBoundingClientRect();
    const brandBox = {
      left: a.left,
      right: a.right,
      top: a.top,
      bottom: a.bottom,
    };
    const langBox = {
      left: b.left,
      right: b.right,
      top: b.top,
      bottom: b.bottom,
    };
    const menuBox = {
      left: c.left,
      right: c.right,
      top: c.top,
      bottom: c.bottom,
    };
    const hitsLang = !(
      brandBox.right <= langBox.left + 0.5 ||
      langBox.right <= brandBox.left + 0.5 ||
      brandBox.bottom <= langBox.top + 0.5 ||
      langBox.bottom <= brandBox.top + 0.5
    );
    const hitsMenu = !(
      brandBox.right <= menuBox.left + 0.5 ||
      menuBox.right <= brandBox.left + 0.5 ||
      brandBox.bottom <= menuBox.top + 0.5 ||
      menuBox.bottom <= brandBox.top + 0.5
    );
    return {
      ok: !hitsLang && !hitsMenu,
      brand: brandBox,
      langs: langBox,
      menu: menuBox,
    };
  });
  expect(overlap, JSON.stringify(overlap, null, 2)).toMatchObject({ ok: true });
}

async function assertTouchTarget(
  locator: ReturnType<Page["locator"]>,
  min = 44,
) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThanOrEqual(min);
  expect(box!.width).toBeGreaterThanOrEqual(Math.min(min, 32));
}

test("Корневая страница выбора языка", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Вахш Саноат",
  );
  for (const code of ["ru", "tg", "en"]) {
    await expect(page.locator(`a[href="/${code}/"]`)).toBeVisible();
  }
  await page.locator('a[href="/ru/"]').click();
  await expect(page).toHaveURL(/\/ru\/?$/);
});

for (const locale of locales) {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
    test(`${locale.code.toUpperCase()} страница и навигация: ${width}px`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      const height = width >= 1024 ? 768 : 900;
      await page.setViewportSize({ width, height });
      await page.goto(`/${locale.code}/`);

      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        locale.htmlLang,
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        locale.h1,
      );
      await expect(page).toHaveTitle(new RegExp(locale.brand));
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        new RegExp(locale.brand),
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        new RegExp(locale.brand),
      );
      await expect(
        page.locator('meta[property="og:description"]'),
      ).toHaveAttribute("content", new RegExp(locale.brand));
      await expect(
        page.locator('meta[property="og:site_name"]'),
      ).toHaveAttribute("content", locale.brand);

      for (const pattern of locale.forbidden) {
        await expect(page.locator("body")).not.toContainText(pattern);
      }
      await expect(page.locator("body")).not.toContainText(/Бохтар(?!иён|iyon)/i);

      await expect(page.locator("#contacts")).toContainText(locale.address);
      await expect(page.locator(".footer")).toContainText(locale.addressSnippet);
      await expect(
        page.locator("#contacts .contact-list .contact-item"),
      ).toHaveCount(3);
      await expect(page.locator("#contacts .contact-label")).toHaveText([
        ...locale.contactLabels,
      ]);

      await expect(
        page.getByRole("link", { name: locale.homeAria }),
      ).toHaveCount(2);
      await expect(page.locator("#about h2")).toHaveText(locale.about);
      await expect(page.locator(".product-card")).toHaveCount(1);
      await expect(page.locator(".product-card h3")).toHaveText(locale.product);
      await expect(
        page.locator(`.product-card [lang="${locale.secondaryLang}"]`),
      ).toHaveText(locale.secondary);

      const langSwitcher = page.locator(".lang-switcher-header");
      await expect(langSwitcher).toBeVisible();
      await expect(langSwitcher.locator("a")).toHaveCount(3);
      await expect(langSwitcher).toContainText("RU");
      await expect(langSwitcher).toContainText("TJ");
      await expect(langSwitcher).toContainText("EN");
      await expect(langSwitcher).not.toContainText("TG");
      await expect(
        langSwitcher.locator(`a[hrefLang="${locale.code}"]`),
      ).toHaveAttribute("aria-current", "page");
      await expect(langSwitcher.locator('a[hrefLang="tg"]')).toHaveAttribute(
        "href",
        /\/tg\//,
      );
      await expect(langSwitcher.locator('a[hrefLang="tg"]')).toHaveText("TJ");

      if (width >= 1024) {
        const aboutHeading = await page.locator("#about h2").boundingBox();
        expect(aboutHeading).not.toBeNull();
        expect(aboutHeading!.y + aboutHeading!.height).toBeLessThan(
          height - 80,
        );
      }

      for (const button of await page.locator(".hero-actions .button").all()) {
        const box = await button.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }

      await assertNoHorizontalOverflow(page, width);
      if (width < 1024) {
        await assertNoHeaderOverlap(page);
        const menuToggle = page.getByRole("button", { name: locale.openMenu });
        await assertTouchTarget(menuToggle);
        for (const link of await page.locator(".lang-switcher-header a").all()) {
          await assertTouchTarget(link);
        }
      }
      if (width <= 430) {
        const ctas = await page.locator(".hero-actions .button").all();
        expect(ctas.length).toBe(2);
        const first = await ctas[0].boundingBox();
        const second = await ctas[1].boundingBox();
        expect(first).not.toBeNull();
        expect(second).not.toBeNull();
        // One horizontal row: tops aligned, second sits to the right
        expect(Math.abs(first!.y - second!.y)).toBeLessThanOrEqual(2);
        expect(second!.x).toBeGreaterThan(first!.x + first!.width - 1);
        const gap = second!.x - (first!.x + first!.width);
        expect(gap).toBeGreaterThanOrEqual(6);
        expect(gap).toBeLessThanOrEqual(12);
        expect(Math.abs(first!.height - second!.height)).toBeLessThanOrEqual(2);
        expect(first!.height).toBeGreaterThanOrEqual(44);
        expect(second!.height).toBeGreaterThanOrEqual(44);
        const ctaStyles = await page
          .locator(".hero-actions .button")
          .evaluateAll((buttons) =>
            buttons.map((button) => {
              const s = getComputedStyle(button);
              return {
                backgroundImage: s.backgroundImage,
                backgroundColor: s.backgroundColor,
                color: s.color,
                borderRadius: s.borderRadius,
                minHeight: parseFloat(s.minHeight) || 0,
              };
            }),
          );
        expect(ctaStyles[0].backgroundImage).toContain("linear-gradient");
        expect(ctaStyles[1].backgroundImage).not.toContain("linear-gradient");
        expect(ctaStyles[0].borderRadius).toBe(ctaStyles[1].borderRadius);
        expect(ctaStyles[0].minHeight).toBeGreaterThanOrEqual(44);
        expect(ctaStyles[1].minHeight).toBeGreaterThanOrEqual(44);
        await expect(page.locator(".hero-facts")).toBeHidden();
        await expect(page.locator(".hero-caption")).toBeHidden();
        const heroContent = await page.locator(".hero-content").boundingBox();
        expect(heroContent).not.toBeNull();
        expect(first!.width + second!.width + gap).toBeLessThanOrEqual(
          heroContent!.width + 1,
        );
        const footerLinks = page.locator(".footer nav a");
        await expect(footerLinks).toHaveCount(4);
        const footerRow = await footerLinks.evaluateAll((links) => {
          const boxes = links.map((link) => link.getBoundingClientRect());
          const tops = boxes.map((box) => Math.round(box.top));
          const uniqueTops = [...new Set(tops)];
          const rights = boxes.map((box) => box.right);
          return {
            uniqueTops,
            overflow: Math.max(...rights) > window.innerWidth + 1,
            fontSizes: links.map((link) =>
              parseFloat(getComputedStyle(link).fontSize),
            ),
          };
        });
        expect(footerRow.uniqueTops.length).toBe(1);
        expect(footerRow.overflow).toBe(false);
        expect(Math.min(...footerRow.fontSizes)).toBeGreaterThanOrEqual(10);
        const statusStyles = await page
          .locator(".hero-status")
          .evaluate((el) => {
            const s = getComputedStyle(el);
            return {
              fontSize: parseFloat(s.fontSize),
              letterSpacing: parseFloat(s.letterSpacing) || 0,
            };
          });
        expect(statusStyles.fontSize).toBeGreaterThanOrEqual(10);
        expect(statusStyles.letterSpacing).toBeLessThanOrEqual(1);
      }
      if (width >= 768) {
        await expect(page.locator(".hero-facts")).toBeVisible();
        await expect(page.locator(".hero-caption")).toBeVisible();
      }

      for (const image of await page.locator("img").all()) {
        if (!(await image.isVisible())) continue;
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }

      const badAnchors = await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .filter(
              (link) => !document.querySelector(link.getAttribute("href")!),
            )
            .map((link) => link.textContent),
        );
      expect(badAnchors).toEqual([]);

      await page
        .getByRole("link", { name: locale.productsCta, exact: false })
        .first()
        .click();
      await expect(page).toHaveURL(new RegExp(`/${locale.code}/.*#products$`));

      await page.locator('.hero-actions a[href="#about"]').click();
      await expect(page).toHaveURL(new RegExp(`/${locale.code}/.*#about$`));

      if (width < 1024) {
        const toggle = page.getByRole("button", { name: locale.openMenu });
        await toggle.click();
        const mobileNav = page.getByRole("navigation", {
          name: locale.mobileNav,
        });
        await expect(mobileNav).toBeVisible();
        await expect(mobileNav.locator(".lang-switcher")).toHaveCount(0);
        await expect(page.locator(".lang-switcher")).toHaveCount(1);
        const mobilePhone = mobileNav.locator('a[href^="tel:"]');
        await expect(mobilePhone).toHaveText("+992 88 844 3588");
        await expect(mobilePhone).toHaveAttribute("href", "tel:+992888443588");
        if (width <= 430) {
          await page.screenshot({
            path: `artifacts/task-007-3/screenshots/${locale.code}-menu-open-${width}.png`,
          });
        }
        await mobileNav
          .getByRole("link", { name: locale.contactsNav })
          .click();
        await expect(page).toHaveURL(new RegExp(`/${locale.code}/.*#contacts$`));
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await toggle.click();
        await mobileNav
          .getByRole("link", { name: locale.aboutNav, exact: true })
          .click();
        await expect(page).toHaveURL(new RegExp(`/${locale.code}/.*#about$`));
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await toggle.click();
        await page.keyboard.press("Escape");
        await expect(toggle).toBeFocused();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
      } else {
        for (const link of await page
          .getByRole("navigation", { name: locale.mainNav, exact: true })
          .getByRole("link")
          .all()) {
          const href = await link.getAttribute("href");
          await link.click();
          expect(new URL(page.url()).hash).toBe(href);
        }
        const headerPhone = page.locator(".header-contact");
        await expect(headerPhone).toHaveText("+992 88 844 3588");
        await expect(headerPhone).toHaveAttribute("href", "tel:+992888443588");
      }

      await page
        .getByRole("navigation", { name: locale.footerNav })
        .getByRole("link", { name: locale.aboutNav, exact: true })
        .click();
      await expect(page).toHaveURL(new RegExp(`/${locale.code}/.*#about$`));

      const phone = page.locator('#contacts a[href^="tel:"]');
      await expect(phone.locator(".contact-value")).toHaveText(
        "+992 88 844 3588",
      );
      await expect(phone).toHaveAttribute("href", "tel:+992888443588");
      await expect(page.locator('a[href^="tel:"]')).toHaveCount(4);
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);

      const whatsappLinks = page.locator('a[href^="https://wa.me/"]');
      await expect(whatsappLinks).toHaveCount(2);
      await expect(
        page.locator('#contacts a[href^="https://wa.me/"] .contact-value'),
      ).toHaveText(locale.whatsappCta);
      await expect(
        page.locator(".footer-contacts a[href^='https://wa.me/']"),
      ).toHaveText(locale.whatsappCta);
      for (const link of await whatsappLinks.all()) {
        const url = new URL((await link.getAttribute("href"))!);
        expect(url.origin).toBe("https://wa.me");
        expect(url.pathname).toBe("/992888443588");
        expect(url.searchParams.get("text")).toBe(locale.whatsappText);
        expect(await link.getAttribute("target")).toBeNull();
      }

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("#production .process-card")).toHaveCount(3);
      await expect(
        page.locator(".product-card img[src*='vakhsh-sanoat-product']"),
      ).toHaveCount(1);

      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement)
          document.activeElement.blur();
        window.scrollTo(0, 0);
      });
      await page.mouse.move(0, 0);

      await page.screenshot({
        path: `artifacts/task-007-3/screenshots/${locale.code}-home-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `artifacts/task-007-3/screenshots/${locale.code}-viewport-${width}.png`,
      });
      if (width <= 430) {
        await page.locator(".header").screenshot({
          path: `artifacts/task-007-3/screenshots/${locale.code}-header-${width}.png`,
        });
        await page.locator(".hero").screenshot({
          path: `artifacts/task-007-3/screenshots/${locale.code}-hero-${width}.png`,
        });
        await page.locator("#about").scrollIntoViewIfNeeded();
        await page.locator("#about").screenshot({
          path: `artifacts/task-007-3/screenshots/${locale.code}-about-${width}.png`,
        });
        await page.locator("#products").scrollIntoViewIfNeeded();
        await page.locator("#products").screenshot({
          path: `artifacts/task-007-3/screenshots/${locale.code}-products-${width}.png`,
        });
        await page.locator(".footer").scrollIntoViewIfNeeded();
        await page.locator(".footer").screenshot({
          path: `artifacts/task-007-3/screenshots/${locale.code}-footer-${width}.png`,
        });
      }
      await page.locator("#contacts").scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `artifacts/task-007-3/screenshots/${locale.code}-contacts-${width}.png`,
      });
      expect(errors).toEqual([]);
    });
  }
}

test("Language gate показывает TJ, маршруты остаются /tg/", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".lang-gate-code")).toHaveText(["RU", "TJ", "EN"]);
  await expect(page.locator('a[href="/tg/"] .lang-gate-code')).toHaveText("TJ");
  await page.locator('a[href="/tg/"]').click();
  await expect(page).toHaveURL(/\/tg\/?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "tg");
});

test("Переключатель языка сохраняет раздел", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/ru/#products");
  await page.locator('.lang-switcher-header a[hrefLang="en"]').click();
  await expect(page).toHaveURL(/\/en\/#products$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Vegetable oil from the producer",
  );
  await page.locator('.lang-switcher-header a[hrefLang="tg"]').click();
  await expect(page).toHaveURL(/\/tg\/#products$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "tg");
});

test("SEO, hreflang и локальные ресурсы", async ({ request }) => {
  for (const path of [
    "/",
    "/ru/",
    "/tg/",
    "/en/",
    "/robots.txt",
    "/favicon.ico",
    "/icon.svg",
    "/logo/cotton.svg",
    "/images/vakhsh-sanoat-product.webp",
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect((await request.get("/sitemap.xml")).status()).toBe(404);

  const ruHtml = await (await request.get("/ru/")).text();
  const tgHtml = await (await request.get("/tg/")).text();
  const enHtml = await (await request.get("/en/")).text();
  expect(ruHtml).toMatch(/lang="ru"/i);
  expect(tgHtml).toMatch(/lang="tg"/i);
  expect(enHtml).toMatch(/lang="en"/i);
  // Без NEXT_PUBLIC_SITE_URL абсолютные hreflang/canonical не публикуются.
  expect(ruHtml).not.toMatch(/rel="canonical"/i);
  expect(ruHtml).not.toMatch(/\/_next\/image/);
  expect(tgHtml).not.toMatch(/\/_next\/image/);
  expect(enHtml).not.toMatch(/\/_next\/image/);
});

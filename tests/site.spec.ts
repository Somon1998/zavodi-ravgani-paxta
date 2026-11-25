import { test, expect } from "@playwright/test";

for (const width of [320, 375, 390, 768, 1024, 1366, 1440, 1920]) {
  test(`Страница и навигация: ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    const height = width >= 1024 ? 768 : 900;
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Растительное масло от производителя",
    );
    await expect(page).toHaveTitle(/Вахш Саноат/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Вахш Саноат/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /Вахш Саноат/,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", /Вахш Саноат/);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "Вахш Саноат",
    );
    await expect(page.locator("body")).not.toContainText(/Маслозавод/i);
    await expect(page.locator("body")).not.toContainText(/Бохтар(?!иён)/i);
    await expect(page.locator("#contacts")).toContainText(
      "Республика Таджикистан, Хатлонская область, Кушониёнский район, Джамоат посёлок Бохтариён, село С.Шерози",
    );
    await expect(page.locator("#contacts")).not.toContainText(
      "Точный адрес будет опубликован",
    );
    await expect(page.locator(".footer")).toContainText(
      "Джамоат посёлок Бохтариён, село С.Шерози",
    );
    await expect(page.locator("#contacts .contact-list .contact-item")).toHaveCount(
      3,
    );
    await expect(page.locator("#contacts .contact-label")).toHaveText([
      "Адрес",
      "Телефон",
      "WhatsApp",
    ]);
    await expect(page.locator("body")).not.toContainText(
      /точный адрес ещё неизвестен|адрес будет опубликован после подтверждения/i,
    );
    await expect(
      page.getByRole("link", { name: "Вахш Саноат — на главную" }),
    ).toHaveCount(2);
    const accessibleText = await page
      .locator("[alt], [aria-label]")
      .evaluateAll((elements) =>
        elements
          .map(
            (element) =>
              `${element.getAttribute("alt")} ${element.getAttribute("aria-label")}`,
          )
          .join(" "),
      );
    expect(accessibleText).not.toMatch(/Маслозавод|Бохтар(?!иён)/i);
    await expect(page.locator("#about h2")).toHaveText("О Вахш Саноат");
    await expect(
      page.getByRole("link", { name: "О заводе", exact: true }),
    ).toHaveCount(0);
    for (const link of await page.locator('a[href="#about"]').all()) {
      await expect(link).toHaveText(/О Вахш Саноат/);
    }
    // На десктопе первый экран должен показывать начало информационного раздела.
    if (width >= 1024) {
      const aboutHeading = await page.locator("#about h2").boundingBox();
      expect(aboutHeading).not.toBeNull();
      expect(aboutHeading!.y + aboutHeading!.height).toBeLessThan(height - 80);
    }
    for (const button of await page.locator(".hero-actions .button").all()) {
      const box = await button.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
    // Одна подтверждённая позиция каталога, без искусственных дублей.
    await expect(page.locator(".product-card")).toHaveCount(1);
    await expect(page.locator(".product-card h3")).toHaveText(
      "Хлопковое масло «Вахш Саноат»",
    );
    await expect(page.locator('.product-card [lang="tg"]')).toHaveText(
      "Равғани пахта",
    );
    await expect(page.locator(".product-notice")).toHaveCount(0);
    await expect(page.locator(".image-label")).toHaveCount(0);
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
    expect(
      overflow.page,
      JSON.stringify(overflow, null, 2),
    ).toBeLessThanOrEqual(width);
    // Прокручиваем страницу для загрузки всех ленивых изображений.
    for (const image of await page.locator("img").all()) {
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
          .filter((link) => !document.querySelector(link.getAttribute("href")!))
          .map((link) => link.textContent),
      );
    expect(badAnchors).toEqual([]);
    await page
      .getByRole("link", { name: "Наша продукция", exact: false })
      .click();
    await expect(page).toHaveURL(/#products$/);
    await page.locator('.hero-actions a[href="#about"]').click();
    await expect(page).toHaveURL(/#about$/);
    if (width < 1024) {
      const toggle = page.getByRole("button", { name: "Открыть меню" });
      await toggle.click();
      await expect(
        page.getByRole("navigation", { name: "Мобильная навигация" }),
      ).toBeVisible();
      const mobilePhone = page
        .getByRole("navigation", { name: "Мобильная навигация" })
        .locator('a[href^="tel:"]');
      await expect(mobilePhone).toHaveText("+992 88 844 3588");
      await expect(mobilePhone).toHaveAttribute("href", "tel:+992888443588");
      await page
        .getByRole("navigation", { name: "Мобильная навигация" })
        .getByRole("link", { name: "Контакты" })
        .click();
      await expect(page).toHaveURL(/#contacts$/);
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await page
        .getByRole("navigation", { name: "Мобильная навигация" })
        .getByRole("link", { name: "О Вахш Саноат", exact: true })
        .click();
      await expect(page).toHaveURL(/#about$/);
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await toggle.click();
      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
    } else {
      for (const link of await page
        .getByRole("navigation", { name: "Основная навигация", exact: true })
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
      .getByRole("navigation", { name: "Навигация в подвале" })
      .getByRole("link", { name: "О Вахш Саноат", exact: true })
      .click();
    await expect(page).toHaveURL(/#about$/);
    const phone = page.locator('#contacts a[href^="tel:"]');
    await expect(phone.locator(".contact-value")).toHaveText("+992 88 844 3588");
    await expect(phone).toHaveAttribute("href", "tel:+992888443588");
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(4);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    const whatsappLinks = page.locator('a[href^="https://wa.me/"]');
    await expect(whatsappLinks).toHaveCount(2);
    await expect(
      page.locator('#contacts a[href^="https://wa.me/"] .contact-value'),
    ).toHaveText("Написать в WhatsApp");
    await expect(
      page.locator(".footer-contacts a[href^='https://wa.me/']"),
    ).toHaveText("Написать в WhatsApp");
    for (const link of await whatsappLinks.all()) {
      const url = new URL((await link.getAttribute("href"))!);
      expect(url.origin).toBe("https://wa.me");
      expect(url.pathname).toBe("/992888443588");
      expect(url.searchParams.get("text")).toBe(
        "Здравствуйте! Меня интересует продукция „Вахш Саноат“. Хотел бы получить дополнительную информацию",
      );
      // Ссылки открываются в текущей вкладке, без window.open или автосообщений.
      expect(await link.getAttribute("target")).toBeNull();
    }
    await expect(
      page.locator('#contacts a[href^="https://wa.me/"]'),
    ).toHaveClass(/contact-item-link/);
    await expect(page.locator('#contacts a[href^="tel:"]')).toHaveClass(
      /contact-item-link/,
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      window.scrollTo(0, 0);
    });
    await page.mouse.move(0, 0);
    await expect(page.locator("#production img")).toHaveCount(0);
    await expect(page.locator("#production .process-card")).toHaveCount(3);
    await expect(
      page.locator(".product-card img[src*='vakhsh-sanoat-product']"),
    ).toHaveCount(1);
    await page.screenshot({
      path: `artifacts/task-003-6/screenshots/home-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `artifacts/task-003-6/screenshots/viewport-${width}.png`,
    });
    await page.locator("#contacts").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `artifacts/task-003-6/screenshots/contacts-${width}.png`,
    });
    expect(errors).toEqual([]);
  });
}

test("SEO и локальные ресурсы", async ({ request }) => {
  for (const path of [
    "/",
    "/robots.txt",
    "/sitemap.xml",
    "/favicon.ico",
    "/icon.svg",
    "/logo/cotton.svg",
    "/images/vakhsh-sanoat-product.webp",
  ]) {
    expect((await request.get(path)).status()).toBe(200);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "localhost",
  );
});

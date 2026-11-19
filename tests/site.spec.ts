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
    await expect(page).toHaveTitle(/Маслозавод/);
    // На десктопе первый экран должен показывать начало раздела «О заводе».
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
      "Хлопковое масло",
    );
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
    if (width < 1024) {
      const toggle = page.getByRole("button", { name: "Открыть меню" });
      await toggle.click();
      await expect(
        page.getByRole("navigation", { name: "Мобильная навигация" }),
      ).toBeVisible();
      await page
        .getByRole("navigation", { name: "Мобильная навигация" })
        .getByRole("link", { name: "Контакты" })
        .click();
      await expect(page).toHaveURL(/#contacts$/);
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
    }
    await expect(
      page.locator('a[href^="tel:"],a[href^="mailto:"],a[href*="wa.me"]'),
    ).toHaveCount(0);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      window.scrollTo(0, 0);
    });
    await page.mouse.move(0, 0);
    await page.screenshot({
      path: `artifacts/task-002/screenshots/home-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({
      path: `artifacts/task-002/screenshots/viewport-${width}.png`,
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

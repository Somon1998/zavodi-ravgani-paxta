import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const robotsPath = path.join(root, "public", "robots.txt");
const sitemapPath = path.join(root, "public", "sitemap.xml");
const locales = ["ru", "tg", "en"];
/** Должен совпадать с OFFICIAL_SITE_URL в src/data/site.ts */
const OFFICIAL_SITE_URL = "https://vakhshsanoat.com";

function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  // Явный opt-out для локальных/preview сборок без индексации.
  if (raw === "off" || raw === "none" || raw === "false") return undefined;
  const value = raw || OFFICIAL_SITE_URL;
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL должен быть корректным URL");
  }
  if (url.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL должен начинаться с https://");
  }
  return url.origin;
}

async function removeIfExists(filePath) {
  try {
    await unlink(filePath);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }
    throw error;
  }
}

function localeLoc(siteUrl, locale) {
  return `${siteUrl}/${locale}/`;
}

function xhtmlLinks(siteUrl) {
  const links = [
    `      <xhtml:link rel="alternate" hreflang="x-default" href="${localeLoc(siteUrl, "ru")}"/>`,
    ...locales.map(
      (locale) =>
        `      <xhtml:link rel="alternate" hreflang="${locale}" href="${localeLoc(siteUrl, locale)}"/>`,
    ),
  ];
  return links.join("\n");
}

function urlEntry(siteUrl, pathLoc, priority) {
  return (
    `  <url>\n` +
    `    <loc>${pathLoc}</loc>\n` +
    `    <changefreq>monthly</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `${xhtmlLinks(siteUrl)}\n` +
    `  </url>`
  );
}

const siteUrl = resolveSiteUrl();

if (siteUrl) {
  const urls = [
    urlEntry(siteUrl, `${siteUrl}/`, "0.8"),
    ...locales.map((locale) =>
      urlEntry(siteUrl, localeLoc(siteUrl, locale), locale === "ru" ? "1.0" : "0.9"),
    ),
  ];

  await writeFile(
    robotsPath,
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    "utf8",
  );
  await writeFile(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
      `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
      `${urls.join("\n")}\n` +
      `</urlset>\n`,
    "utf8",
  );
  console.log(`SEO: индексация разрешена для ${siteUrl} (ru/tg/en)`);
} else {
  await writeFile(robotsPath, "User-agent: *\nDisallow: /\n", "utf8");
  await removeIfExists(sitemapPath);
  console.log(
    "SEO: NEXT_PUBLIC_SITE_URL=off — индексация запрещена, sitemap не публикуется",
  );
}

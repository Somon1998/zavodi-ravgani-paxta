import QRCode from "qrcode";
import { isIP } from "node:net";

function officialUrl(value) {
  const url = new URL(value);
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  const reserved = [
    "localhost",
    "local",
    "internal",
    "test",
    "invalid",
    "example",
    "vercel.app",
    "example.com",
    "example.org",
    "example.net",
  ];
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    !host.includes(".") ||
    isIP(host.replace(/^\[|\]$/g, "")) ||
    reserved.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))
  ) {
    throw new Error(
      "Нужен официальный HTTPS-домен: localhost, IP, тестовые домены и Vercel недопустимы.",
    );
  }
  if (url.search || url.hash)
    throw new Error(
      "Используйте постоянную ссылку без query-параметров и фрагмента.",
    );
  return url;
}

export function validateQrTarget(config) {
  if (!config.officialOrigin || !config.targetUrl) {
    throw new Error(
      "QR не создан: официальный домен не задан в scripts/qr-config.json.",
    );
  }
  const origin = officialUrl(config.officialOrigin);
  const target = officialUrl(config.targetUrl);
  if (origin.pathname !== "/" || target.origin !== origin.origin) {
    throw new Error(
      "Целевая ссылка должна принадлежать настроенному официальному домену.",
    );
  }
  return target.href;
}

export async function createQrAssets(config) {
  const target = validateQrTarget(config);
  const options = {
    errorCorrectionLevel: "M",
    margin: 4,
    scale: 12,
    color: { dark: "#000000", light: "#FFFFFF" },
  };
  const symbol = QRCode.create(target, options);
  const [svg, png] = await Promise.all([
    QRCode.toString(target, { ...options, type: "svg" }),
    QRCode.toBuffer(target, { ...options, type: "png" }),
  ]);
  return {
    svg,
    png,
    target,
    modules: symbol.modules.size,
    pixels: (symbol.modules.size + 8) * options.scale,
  };
}

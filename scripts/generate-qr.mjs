import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
const address = process.argv[2];
if (!address)
  throw new Error("Укажите официальный адрес: npm run qr -- https://ваш-домен");
const url = new URL(address);
if (
  url.protocol !== "https:" ||
  url.hostname === "localhost" ||
  url.hostname.endsWith(".vercel.app")
) {
  throw new Error(
    "Для окончательного QR-кода нужен официальный HTTPS-домен, не временный адрес.",
  );
}
await mkdir("artifacts", { recursive: true });
await QRCode.toFile("artifacts/site-qr.svg", url.href, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#073D29", light: "#FFFFFF" },
});
console.log(
  `Создан artifacts/site-qr.svg для ${url.href}. Проверьте сканирование перед печатью.`,
);

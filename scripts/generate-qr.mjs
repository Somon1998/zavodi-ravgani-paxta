import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createQrAssets } from "./qr-assets.mjs";

try {
  if (process.argv.length > 2)
    throw new Error(
      "Задайте официальный адрес в scripts/qr-config.json, затем выполните npm run qr без аргументов.",
    );
  const config = JSON.parse(
    (
      await readFile(new URL("./qr-config.json", import.meta.url), "utf8")
    ).replace(/^\uFEFF/, ""),
  );
  const assets = await createQrAssets(config);
  const output = new URL("../artifacts/qr-review/", import.meta.url);
  await mkdir(output, { recursive: true });
  await writeFile(new URL("site-qr.svg", output), assets.svg);
  await writeFile(new URL("site-qr.png", output), assets.png);
  await writeFile(
    new URL("verification.json", output),
    JSON.stringify(
      {
        target: assets.target,
        modules: assets.modules,
        marginModules: 4,
        pngPixels: assets.pixels,
        status: "REQUIRES_PRINT_AND_SCAN_TEST",
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  console.log(
    `Созданы SVG и PNG для проверки: ${assets.target}. Папка artifacts/qr-review. Не передавать в тираж до проверки HTTPS, перенаправлений и сканирования печатного образца.`,
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

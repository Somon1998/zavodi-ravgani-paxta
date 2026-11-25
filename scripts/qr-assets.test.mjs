import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { createQrAssets, validateQrTarget } from "./qr-assets.mjs";

test("Текущая конфигурация не разрешает создание печатного QR", async () => {
  const config = JSON.parse(
    (
      await readFile(new URL("./qr-config.json", import.meta.url), "utf8")
    ).replace(/^\uFEFF/, ""),
  );
  assert.throws(() => validateQrTarget(config), /домен не задан/);
});

test("Временные и локальные адреса, чужой домен и credentials отклоняются", () => {
  for (const value of [
    "http://qr-fixture.company",
    "https://localhost",
    "https://127.0.0.1",
    "https://[::1]",
    "https://192.168.1.1",
    "https://0x7f000001",
    "https://preview.vercel.app",
    "https://preview.vercel.app.",
    "https://demo.localhost",
    "https://demo.test",
    "https://example.com",
    "https://user:secret@qr-fixture.company",
    "https://qr-fixture.company:3000",
  ]) {
    assert.throws(
      () => validateQrTarget({ officialOrigin: value, targetUrl: value }),
      undefined,
      value,
    );
  }
  assert.throws(
    () =>
      validateQrTarget({
        officialOrigin: "https://qr-fixture.company",
        targetUrl: "https://other-fixture.company",
      }),
    /официальному домену/,
  );
  assert.throws(
    () =>
      validateQrTarget({
        officialOrigin: "https://qr-fixture.company",
        targetUrl: "https://qr-fixture.company/?temporary=1",
      }),
    /параметров/,
  );
});

test("SVG и PNG формируются в памяти, без создания печатных файлов", async () => {
  // Синтетический адрес только для проверки кодировщика; сетевых запросов нет.
  const assets = await createQrAssets({
    officialOrigin: "https://qr-fixture.company",
    targetUrl: "https://qr-fixture.company/qr",
  });
  assert.equal(assets.target, "https://qr-fixture.company/qr");
  assert.match(assets.svg, /<svg/);
  const metadata = await sharp(assets.png).metadata();
  assert.equal(metadata.format, "png");
  assert.equal(metadata.width, assets.pixels);
  assert.equal(metadata.height, assets.pixels);
  assert.equal(assets.pixels, (assets.modules + 8) * 12);
  const { data, info } = await sharp(assets.png)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Полная белая quiet zone: 4 модуля с каждой стороны, без сглаженных краёв.
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const offset = (y * info.width + x) * info.channels;
      if (x < 48 || y < 48 || x >= info.width - 48 || y >= info.height - 48)
        assert.equal(data[offset], 255);
      assert.ok(data[offset] === 0 || data[offset] === 255);
    }
  }
});

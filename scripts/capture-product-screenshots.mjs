import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const root = process.cwd();
const temporaryDirectory = path.join(root, ".tmp", "product-screenshots");
const outputDirectory = path.join(root, "docs", "assets");

await mkdir(temporaryDirectory, { recursive: true });
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1050 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});

async function settle() {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1_000);
}

async function capture(name, pathname, prepare) {
  await page.goto(`${baseURL}${pathname}`, { waitUntil: "networkidle" });
  await settle();

  if (prepare) {
    await prepare(page);
    await settle();
  }

  const pngPath = path.join(temporaryDirectory, `${name}.png`);
  const webpPath = path.join(outputDirectory, `${name}.webp`);

  await page.screenshot({
    path: pngPath,
    fullPage: false,
    animations: "disabled",
  });

  const conversion = spawnSync(
    "magick",
    [pngPath, "-strip", "-quality", "84", webpPath],
    { stdio: "inherit" },
  );

  if (conversion.status !== 0) {
    throw new Error(`No se pudo optimizar ${name}.png con ImageMagick.`);
  }
}

await capture("01-home", "/");
await capture("02-guided-analysis", "/demo/", async (currentPage) => {
  await currentPage
    .getByRole("button", { name: "Analizar incidencia" })
    .click();
  await currentPage
    .getByRole("heading", {
      name: "Sugerencia de IA · pendiente de validación técnica",
    })
    .waitFor();
});
await capture("03-verification", "/verificacion/");
await capture("04-intelligence", "/inteligencia/");
await capture("05-impact", "/impacto/");

await browser.close();

console.log(`Capturas guardadas en ${outputDirectory}`);

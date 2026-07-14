import { expect, test } from "@playwright/test";

test("a visitor can complete the evidence-backed guided demo", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /De una foto a una mejora verificable/i,
    }),
  ).toBeVisible();
  await expect(page.getByText("Captura", { exact: true })).toBeVisible();
  await expect(page.getByText("Decide", { exact: true })).toBeVisible();
  await expect(page.getByText("Previene", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Qué funciona hoy/i }),
  ).toBeVisible();
  await expect(
    page.getByText(/Un gestor de tickets registra una solicitud/i),
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: /responsable de calidad revisa/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Iniciar demo guiada" }).click();
  await expect(page).toHaveURL(/\/demo/);
  await expect(
    page.getByText("Datos simulados para demostración"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Analizar incidencia" }).click();
  await expect(
    page.getByText("Sugerencia de IA · pendiente de validación técnica"),
  ).toBeVisible();
  await expect(
    page.getByText("Evidencia suficiente para revisar"),
  ).toBeVisible();
  await expect(
    page.getByText("Suficiente para revisar, no para cerrar"),
  ).toBeVisible();
  await page
    .getByLabel("Resumen editable")
    .fill("Discontinuidad visible pendiente de comprobación presencial.");
  await page
    .getByLabel("Categoría sugerida")
    .selectOption({ label: "Humedad y filtraciones" });
  await page
    .getByLabel("Elemento constructivo")
    .selectOption({ label: "Junta entre marco y paramento" });
  await page
    .getByLabel("Gremio probable")
    .selectOption({ label: "Impermeabilización" });
  await expect(page.getByText(/Confianza \d+ %/)).toHaveCount(0);

  await page.getByRole("button", { name: "Validar y continuar" }).click();
  await expect(
    page.getByRole("heading", { name: "Posible duplicado" }),
  ).toBeVisible();
  await expect(page.getByText("Coincidencia alta")).toBeVisible();
  await expect(page.getByText("86 %")).toHaveCount(0);

  await page.getByRole("button", { name: "Mantener vinculadas" }).click();
  await page.getByRole("button", { name: "Revisar reparación" }).click();
  await expect(
    page.getByRole("heading", { name: "Verificación antes / después" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Aprobar técnicamente" }).click();
  await page.getByRole("button", { name: "Registrar conformidad" }).click();
  await page.getByRole("button", { name: "Cerrar incidencia" }).click();

  await expect(
    page.getByText("Incidencia cerrada con trazabilidad completa"),
  ).toBeVisible();
  await page.getByRole("link", { name: "Ver aprendizaje generado" }).click();
  await expect(
    page.getByText(/recurrencia de sellado insuficiente/i),
  ).toBeVisible();
});

test("the landing page remains usable without horizontal overflow", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Iniciar demo guiada" }),
  ).toBeVisible();
  await expect(
    page.getByText("Datos simulados para demostración", { exact: true }),
  ).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBe(dimensions.viewport);

  if (dimensions.viewport < 600) {
    const mobileNavigation = page.locator(".mobile-nav");
    await expect(
      mobileNavigation.getByRole("link", { name: "Demo", exact: true }),
    ).toBeHidden();
    const mobileTrigger = mobileNavigation.locator("summary");
    await expect(mobileTrigger).toHaveAttribute(
      "aria-label",
      "Abrir navegación",
    );
    await mobileTrigger.click();
    await expect(
      mobileNavigation.getByRole("link", { name: "Demo", exact: true }),
    ).toBeVisible();
  }
});

test("portfolio charts render their evidence marks", async ({ page }) => {
  await page.goto("/inteligencia/");
  await expect(page.locator(".recharts-bar-rectangle")).toHaveCount(6);
  await expect(page.locator(".recharts-line-curve")).toHaveCount(2);
});

test("ROI assumptions and integration paths remain transparent and responsive", async ({
  page,
}) => {
  await page.goto("/impacto/");
  await page.getByRole("button", { name: "Escenario conservador" }).click();
  await expect(
    page.getByRole("heading", { name: "Sensibilidad del primer año" }),
  ).toBeVisible();
  await page.getByText("Ver fórmula y trazabilidad").click();
  await expect(page.getByText(/Ahorro administrativo =/)).toBeVisible();
  await expect(page.getByText("Piloto inicial", { exact: true })).toBeVisible();
  await expect(page.getByText("No conectado", { exact: true })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBe(dimensions.viewport);
});

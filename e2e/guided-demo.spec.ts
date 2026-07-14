import { expect, test } from "@playwright/test";

test("a visitor can complete the evidence-backed guided demo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /De la foto al cierre verificado/i })).toBeVisible();

  await page.getByRole("link", { name: "Iniciar demo guiada" }).click();
  await expect(page).toHaveURL(/\/demo/);
  await expect(page.getByText("Datos simulados para demostración")).toBeVisible();

  await page.getByRole("button", { name: "Analizar incidencia" }).click();
  await expect(page.getByText("Sugerencia de IA — pendiente de validación técnica")).toBeVisible();

  await page.getByRole("button", { name: "Validar y continuar" }).click();
  await expect(page.getByRole("heading", { name: "Posible duplicado" })).toBeVisible();

  await page.getByRole("button", { name: "Mantener vinculadas" }).click();
  await page.getByRole("button", { name: "Revisar reparación" }).click();
  await expect(page.getByRole("heading", { name: "Verificación antes / después" })).toBeVisible();

  await page.getByRole("button", { name: "Aprobar técnicamente" }).click();
  await page.getByRole("button", { name: "Registrar conformidad" }).click();
  await page.getByRole("button", { name: "Cerrar incidencia" }).click();

  await expect(page.getByText("Incidencia cerrada con trazabilidad completa")).toBeVisible();
  await page.getByRole("link", { name: "Ver aprendizaje generado" }).click();
  await expect(page.getByText(/recurrencia de sellado insuficiente/i)).toBeVisible();
});

test("the landing page remains usable on a mobile viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Iniciar demo guiada" })).toBeVisible();
  await expect(page.getByText("Datos simulados")).toBeVisible();
});

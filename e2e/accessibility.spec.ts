import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/"],
  ["demo", "/demo/"],
  ["intelligence", "/inteligencia/"],
  ["impact", "/impacto/"],
  ["methodology", "/metodologia/"],
] as const;

for (const [name, route] of routes) {
  test(`${name} has no automatically detectable WCAG A/AA violations`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(
      results.violations,
      results.violations
        .map(
          (violation) =>
            `${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`,
        )
        .join("\n"),
    ).toEqual([]);
  });
}

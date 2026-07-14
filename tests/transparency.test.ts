import { describe, expect, it } from "vitest";
import { dashboardMetrics, supplierScores } from "@/lib/demo-data";

describe("public claim transparency", () => {
  it("classifies every dashboard metric instead of presenting it as an achieved result", () => {
    const allowedKinds = [
      "synthetic_scenario",
      "pilot_target",
      "illustrative_assumption",
      "public_source",
    ];

    for (const metric of dashboardMetrics) {
      expect(allowedKinds).toContain(metric.kind);
      expect(metric.disclosure.length).toBeGreaterThan(12);
    }
  });

  it("keeps the illustrative supplier score fully attributable", () => {
    expect(
      supplierScores.reduce((total, criterion) => total + criterion.weight, 0),
    ).toBe(100);

    for (const criterion of supplierScores) {
      expect(criterion.score).toBeGreaterThanOrEqual(0);
      expect(criterion.score).toBeLessThanOrEqual(100);
      expect(criterion.evidence.length).toBeGreaterThan(12);
    }
  });
});

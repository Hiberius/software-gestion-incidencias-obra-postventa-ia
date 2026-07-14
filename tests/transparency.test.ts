import { describe, expect, it } from "vitest";
import { dashboardMetrics } from "@/lib/demo-data";

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
});

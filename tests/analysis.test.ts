import { describe, expect, it } from "vitest";
import { getDemoAnalysis } from "@/lib/analysis";

describe("getDemoAnalysis", () => {
  it("returns an editable suggestion with mandatory human review", () => {
    const result = getDemoAnalysis("window-seal-detail");

    expect(result.status).toBe("suggestion");
    expect(result.category).toBe("Carpintería exterior");
    expect(result.humanReviewRequired).toBe(true);
    expect(result.canCloseIncident).toBe(false);
    expect(result.visibleEvidence.length).toBeGreaterThan(0);
  });

  it("abstains and requests specific evidence when confidence is low", () => {
    const result = getDemoAnalysis("ambiguous-moisture");

    expect(result.status).toBe("needs_evidence");
    expect(result.confidence).toBeLessThan(0.65);
    expect(result.additionalEvidenceNeeded).toContain("Una vista general de la estancia");
    expect(result.humanReviewRequired).toBe(true);
  });

  it("throws for an unknown synthetic asset instead of fabricating a result", () => {
    expect(() => getDemoAnalysis("unknown-asset")).toThrow("Unknown demo asset");
  });
});

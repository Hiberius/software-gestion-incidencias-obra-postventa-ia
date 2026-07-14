import { describe, expect, it } from "vitest";
import { getDemoAnalysis } from "@/lib/analysis";

describe("getDemoAnalysis", () => {
  it("returns an editable suggestion with mandatory human review", () => {
    const result = getDemoAnalysis("window-seal-detail");

    expect(result.status).toBe("suggestion");
    expect(result.evidenceStrength).toBe("sufficient_for_review");
    expect(result).not.toHaveProperty("confidence");
    expect(result.category).toBe("Carpintería exterior");
    expect(result.humanReviewRequired).toBe(true);
    expect(result.canCloseIncident).toBe(false);
    expect(result.visibleEvidence.length).toBeGreaterThan(0);
    expect(result.possibleDuplicate).toMatchObject({
      id: "INC-0187",
      matchLevel: "alta",
    });
    expect(result.possibleDuplicate?.reasons).toHaveLength(3);
  });

  it("abstains and requests specific evidence when the evidence is insufficient", () => {
    const result = getDemoAnalysis("ambiguous-moisture");

    expect(result.status).toBe("needs_evidence");
    expect(result.evidenceStrength).toBe("insufficient");
    expect(result).not.toHaveProperty("confidence");
    expect(result.additionalEvidenceNeeded).toContain(
      "Una vista general de la estancia",
    );
    expect(result.humanReviewRequired).toBe(true);
  });

  it("throws for an unknown synthetic asset instead of fabricating a result", () => {
    expect(() => getDemoAnalysis("unknown-asset")).toThrow(
      "Unknown demo asset",
    );
  });
});

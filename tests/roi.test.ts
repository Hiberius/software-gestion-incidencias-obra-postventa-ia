import { describe, expect, it } from "vitest";
import { calculateROI, HIGH_ROI_INPUTS, PRUDENT_ROI_INPUTS } from "@/lib/roi";

describe("calculateROI", () => {
  it("calculates the prudent scenario from an explicit repeat-visit baseline", () => {
    const result = calculateROI(PRUDENT_ROI_INPUTS);

    expect(result.annualIncidentVolume).toBe(18_050);
    expect(result.adminSavings).toBeCloseTo(77_013.33, 1);
    expect(result.avoidedRepeatVisitCosts).toBeCloseTo(25_270, 0);
    expect(result.steadyStateGrossBenefit).toBeCloseTo(102_283.33, 1);
    expect(result.steadyStateROI).toBeCloseTo(36.38, 1);
    expect(result.steadyStatePaybackMonths).toBeCloseTo(8.8, 1);
  });

  it("keeps the high scenario explicit as a percentage-point assumption", () => {
    const result = calculateROI(HIGH_ROI_INPUTS);

    expect(result.avoidedRepeatVisits).toBeCloseTo(1_805, 0);
    expect(result.steadyStateGrossBenefit).toBeCloseTo(203_363.33, 1);
    expect(result.steadyStateROI).toBeCloseTo(171.15, 1);
    expect(result.steadyStatePaybackMonths).toBeCloseTo(4.43, 1);
  });

  it("applies a first-year realization factor without changing steady-state economics", () => {
    const result = calculateROI({
      ...PRUDENT_ROI_INPUTS,
      firstYearRealization: 0.5,
    });

    expect(result.firstYearGrossBenefit).toBeCloseTo(
      result.steadyStateGrossBenefit * 0.5,
      2,
    );
    expect(result.firstYearROI).toBeLessThan(result.steadyStateROI);
  });

  it("rejects impossible input values", () => {
    expect(() =>
      calculateROI({ ...PRUDENT_ROI_INPUTS, annualHomes: 0 }),
    ).toThrow("annualHomes");
    expect(() =>
      calculateROI({ ...PRUDENT_ROI_INPUTS, repeatVisitReduction: 1.5 }),
    ).toThrow("repeatVisitReduction");
  });
});

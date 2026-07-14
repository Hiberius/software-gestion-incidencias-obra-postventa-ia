import { z } from "zod";

const roiInputSchema = z
  .object({
    annualHomes: z.number().positive().max(1_000_000),
    incidentsPerHome: z.number().positive().max(1_000),
    adminMinutesSaved: z.number().nonnegative().max(1_440),
    loadedHourlyCost: z.number().nonnegative().max(100_000),
    baselineRepeatVisitRate: z.number().min(0).max(1),
    repeatVisitReductionMode: z.enum(["relative", "percentage_points"]),
    repeatVisitReduction: z.number().min(0).max(1),
    averageRepeatVisitCost: z.number().nonnegative().max(10_000_000),
    firstYearCost: z.number().positive().max(1_000_000_000_000),
    firstYearRealization: z.number().min(0).max(1),
  })
  .superRefine((inputs, context) => {
    if (
      inputs.repeatVisitReductionMode === "percentage_points" &&
      inputs.repeatVisitReduction > inputs.baselineRepeatVisitRate
    ) {
      context.addIssue({
        code: "custom",
        message: "La reducción no puede superar la baseline.",
        path: ["repeatVisitReduction"],
      });
    }
  });

export type ROIInputs = z.infer<typeof roiInputSchema>;

export type ROIResult = {
  annualIncidentVolume: number;
  hoursSaved: number;
  adminSavings: number;
  avoidedRepeatVisits: number;
  avoidedRepeatVisitCosts: number;
  steadyStateGrossBenefit: number;
  steadyStateNetBenefit: number;
  steadyStateROI: number;
  steadyStatePaybackMonths: number | null;
  firstYearGrossBenefit: number;
  firstYearNetBenefit: number;
  firstYearROI: number;
};

const BASE_INPUTS = {
  annualHomes: 1_805,
  incidentsPerHome: 10,
  adminMinutesSaved: 8,
  loadedHourlyCost: 32,
  baselineRepeatVisitRate: 0.2,
  averageRepeatVisitCost: 70,
  firstYearCost: 75_000,
  firstYearRealization: 0.65,
} as const;

export const PRUDENT_ROI_INPUTS: ROIInputs = {
  ...BASE_INPUTS,
  repeatVisitReductionMode: "relative",
  repeatVisitReduction: 0.1,
};

export const HIGH_ROI_INPUTS: ROIInputs = {
  ...BASE_INPUTS,
  repeatVisitReductionMode: "percentage_points",
  repeatVisitReduction: 0.1,
};

export function calculateROI(rawInputs: ROIInputs): ROIResult {
  const parsed = roiInputSchema.safeParse(rawInputs);

  if (!parsed.success) {
    const fields = parsed.error.issues
      .map((issue) => issue.path.join("."))
      .join(", ");
    throw new Error(`Invalid ROI input: ${fields}`);
  }

  const inputs = parsed.data;
  const annualIncidentVolume = inputs.annualHomes * inputs.incidentsPerHome;
  const hoursSaved = (annualIncidentVolume * inputs.adminMinutesSaved) / 60;
  const adminSavings = hoursSaved * inputs.loadedHourlyCost;
  const avoidedRate =
    inputs.repeatVisitReductionMode === "relative"
      ? inputs.baselineRepeatVisitRate * inputs.repeatVisitReduction
      : inputs.repeatVisitReduction;
  const avoidedRepeatVisits = annualIncidentVolume * avoidedRate;
  const avoidedRepeatVisitCosts =
    avoidedRepeatVisits * inputs.averageRepeatVisitCost;
  const steadyStateGrossBenefit = adminSavings + avoidedRepeatVisitCosts;
  const steadyStateNetBenefit = steadyStateGrossBenefit - inputs.firstYearCost;
  const steadyStateROI = (steadyStateNetBenefit / inputs.firstYearCost) * 100;
  const steadyStatePaybackMonths =
    steadyStateGrossBenefit > 0
      ? inputs.firstYearCost / (steadyStateGrossBenefit / 12)
      : null;
  const firstYearGrossBenefit =
    steadyStateGrossBenefit * inputs.firstYearRealization;
  const firstYearNetBenefit = firstYearGrossBenefit - inputs.firstYearCost;
  const firstYearROI = (firstYearNetBenefit / inputs.firstYearCost) * 100;

  return {
    annualIncidentVolume,
    hoursSaved,
    adminSavings,
    avoidedRepeatVisits,
    avoidedRepeatVisitCosts,
    steadyStateGrossBenefit,
    steadyStateNetBenefit,
    steadyStateROI,
    steadyStatePaybackMonths,
    firstYearGrossBenefit,
    firstYearNetBenefit,
    firstYearROI,
  };
}

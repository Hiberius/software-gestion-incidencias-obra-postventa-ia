import { describe, expect, it } from "vitest";
import { canTransition, WORKFLOW_STATES } from "@/lib/workflow";

describe("canTransition", () => {
  it("allows the normal validated workflow in sequence", () => {
    for (let index = 0; index < WORKFLOW_STATES.length - 2; index += 1) {
      expect(
        canTransition(WORKFLOW_STATES[index], WORKFLOW_STATES[index + 1], {
          technicalApproval: false,
          customerConformity: false,
        }),
      ).toBe(true);
    }
  });

  it("never allows AI or a supplier to skip directly to closure", () => {
    expect(
      canTransition("Pendiente de verificación", "Cerrada", {
        technicalApproval: true,
        customerConformity: true,
      }),
    ).toBe(false);
  });

  it("requires technical approval and customer conformity for closure", () => {
    expect(
      canTransition("Pendiente de conformidad del cliente", "Cerrada", {
        technicalApproval: true,
        customerConformity: false,
      }),
    ).toBe(false);
    expect(
      canTransition("Pendiente de conformidad del cliente", "Cerrada", {
        technicalApproval: true,
        customerConformity: true,
      }),
    ).toBe(true);
  });

  it("allows a closed incident to be reopened with a reason", () => {
    expect(
      canTransition("Cerrada", "Reabierta", {
        technicalApproval: true,
        customerConformity: true,
        reopenReason: "El sellado vuelve a presentar una discontinuidad visible.",
      }),
    ).toBe(true);
    expect(
      canTransition("Cerrada", "Reabierta", {
        technicalApproval: true,
        customerConformity: true,
      }),
    ).toBe(false);
  });
});

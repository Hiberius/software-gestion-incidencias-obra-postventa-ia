import { describe, expect, it } from "vitest";
import { canTransition, WORKFLOW_STATES } from "@/lib/workflow";

describe("canTransition", () => {
  it("allows the normal validated workflow in sequence", () => {
    for (let index = 0; index < WORKFLOW_STATES.length - 2; index += 1) {
      expect(
        canTransition(WORKFLOW_STATES[index], WORKFLOW_STATES[index + 1], {
          technicalApproval: true,
          customerConformity: true,
          actorRole: "quality",
        }),
      ).toBe(true);
    }
  });

  it("never allows AI to validate or close an incident", () => {
    expect(
      canTransition("Pendiente de validación", "Validada", {
        technicalApproval: true,
        customerConformity: true,
        actorRole: "ai",
      }),
    ).toBe(false);
    expect(
      canTransition("Pendiente de verificación", "Cerrada", {
        technicalApproval: true,
        customerConformity: true,
        actorRole: "ai",
      }),
    ).toBe(false);
  });

  it("requires technical approval before requesting customer conformity", () => {
    expect(
      canTransition(
        "Pendiente de verificación",
        "Pendiente de conformidad del cliente",
        {
          technicalApproval: false,
          customerConformity: false,
          actorRole: "quality",
        },
      ),
    ).toBe(false);
    expect(
      canTransition(
        "Pendiente de verificación",
        "Pendiente de conformidad del cliente",
        {
          technicalApproval: true,
          customerConformity: false,
          actorRole: "quality",
        },
      ),
    ).toBe(true);
  });

  it("requires technical approval and customer conformity for closure", () => {
    expect(
      canTransition("Pendiente de conformidad del cliente", "Cerrada", {
        technicalApproval: true,
        customerConformity: false,
        actorRole: "quality",
      }),
    ).toBe(false);
    expect(
      canTransition("Pendiente de conformidad del cliente", "Cerrada", {
        technicalApproval: true,
        customerConformity: true,
        actorRole: "quality",
      }),
    ).toBe(true);
  });

  it("allows a closed incident to be reopened with a reason", () => {
    expect(
      canTransition("Cerrada", "Reabierta", {
        technicalApproval: true,
        customerConformity: true,
        actorRole: "customer",
        reopenReason:
          "El sellado vuelve a presentar una discontinuidad visible.",
      }),
    ).toBe(true);
    expect(
      canTransition("Cerrada", "Reabierta", {
        technicalApproval: true,
        customerConformity: true,
        actorRole: "customer",
      }),
    ).toBe(false);
    expect(
      canTransition("Cerrada", "Reabierta", {
        technicalApproval: true,
        customerConformity: true,
        actorRole: "customer",
        reopenReason: "Fallo",
      }),
    ).toBe(false);
  });
});

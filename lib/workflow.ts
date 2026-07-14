export const WORKFLOW_STATES = [
  "Nueva",
  "Pendiente de validación",
  "Validada",
  "Asignada",
  "En reparación",
  "Pendiente de verificación",
  "Pendiente de conformidad del cliente",
  "Cerrada",
  "Reabierta",
] as const;

export type WorkflowState = (typeof WORKFLOW_STATES)[number];

type TransitionContext = {
  technicalApproval: boolean;
  customerConformity: boolean;
  actorRole: "ai" | "supplier" | "technician" | "customer" | "quality";
  reopenReason?: string;
};

const NEXT_STATE: Partial<Record<WorkflowState, WorkflowState>> = {
  Nueva: "Pendiente de validación",
  "Pendiente de validación": "Validada",
  Validada: "Asignada",
  Asignada: "En reparación",
  "En reparación": "Pendiente de verificación",
  "Pendiente de verificación": "Pendiente de conformidad del cliente",
  "Pendiente de conformidad del cliente": "Cerrada",
};

export function canTransition(
  from: WorkflowState,
  to: WorkflowState,
  context: TransitionContext,
): boolean {
  if (context.actorRole === "ai") {
    return false;
  }

  if (from === "Cerrada" && to === "Reabierta") {
    const canReopen = ["customer", "technician", "quality"].includes(
      context.actorRole,
    );
    return canReopen && (context.reopenReason?.trim().length ?? 0) >= 12;
  }

  if (NEXT_STATE[from] !== to) {
    return false;
  }

  if (context.actorRole === "supplier") {
    return (
      (from === "Asignada" && to === "En reparación") ||
      (from === "En reparación" && to === "Pendiente de verificación")
    );
  }

  if (context.actorRole === "customer") {
    return false;
  }

  if (
    to === "Pendiente de conformidad del cliente" &&
    !context.technicalApproval
  ) {
    return false;
  }

  if (to === "Cerrada") {
    return (
      context.actorRole === "quality" &&
      context.technicalApproval &&
      context.customerConformity
    );
  }

  return true;
}

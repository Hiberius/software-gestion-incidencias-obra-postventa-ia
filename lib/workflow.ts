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
  if (from === "Cerrada" && to === "Reabierta") {
    return Boolean(context.reopenReason?.trim());
  }

  if (NEXT_STATE[from] !== to) {
    return false;
  }

  if (to === "Cerrada") {
    return context.technicalApproval && context.customerConformity;
  }

  return true;
}

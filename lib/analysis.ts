export type DemoAssetId = "window-seal-detail" | "ambiguous-moisture";

export type DemoAnalysis = {
  status: "suggestion" | "needs_evidence";
  evidenceStrength: "sufficient_for_review" | "insufficient";
  summary: string;
  category: string;
  constructionElement: string;
  room: string;
  probableTrade: string;
  severity: "Baja" | "Media" | "Alta" | "Por determinar";
  visibleEvidence: string[];
  additionalEvidenceNeeded: string[];
  possibleDuplicate: {
    id: string;
    matchLevel: "alta" | "media";
    reasons: string[];
  } | null;
  recommendedAction: string;
  proposedSLA: string;
  humanReviewRequired: true;
  canCloseIncident: false;
};

const ANALYSES: Record<DemoAssetId, DemoAnalysis> = {
  "window-seal-detail": {
    status: "suggestion",
    evidenceStrength: "sufficient_for_review",
    summary:
      "Posible discontinuidad visible en la junta perimetral inferior derecha de la ventana.",
    category: "Carpintería exterior",
    constructionElement: "Encuentro entre marco de ventana y paramento",
    room: "Salón",
    probableTrade: "Carpintería de aluminio y sellados",
    severity: "Media",
    visibleEvidence: [
      "Junta visualmente irregular en la esquina inferior derecha.",
      "La imagen no permite comprobar el perímetro completo.",
    ],
    additionalEvidenceNeeded: [
      "Una vista general de la ventana",
      "Referencia del sistema",
      "Comprobación presencial",
    ],
    possibleDuplicate: {
      id: "INC-0187",
      matchLevel: "alta",
      reasons: [
        "Mismo sistema de ventana y promoción",
        "Descripción semejante de corriente de aire",
        "Detalle visible en el mismo encuentro constructivo",
      ],
    },
    recommendedAction:
      "Revisar presencialmente la continuidad de la junta y documentar el perímetro completo.",
    proposedSLA: "Validación en 24 h · intervención en 5 días laborables",
    humanReviewRequired: true,
    canCloseIncident: false,
  },
  "ambiguous-moisture": {
    status: "needs_evidence",
    evidenceStrength: "insufficient",
    summary:
      "La evidencia no permite clasificar con suficiente solidez la marca visible.",
    category: "Por determinar",
    constructionElement: "Paramento interior",
    room: "Por confirmar",
    probableTrade: "Por determinar",
    severity: "Por determinar",
    visibleEvidence: [
      "Marca localizada sin contexto suficiente de estancia o escala.",
    ],
    additionalEvidenceNeeded: [
      "Una vista general de la estancia",
      "Una medición de humedad",
      "Comprobación presencial",
    ],
    possibleDuplicate: null,
    recommendedAction:
      "Solicitar evidencia adicional antes de proponer una clasificación.",
    proposedSLA: "Revisión tras recibir evidencia",
    humanReviewRequired: true,
    canCloseIncident: false,
  },
};

export function getDemoAnalysis(assetId: string): DemoAnalysis {
  if (!(assetId in ANALYSES)) {
    throw new Error(`Unknown demo asset: ${assetId}`);
  }

  return structuredClone(ANALYSES[assetId as DemoAssetId]);
}

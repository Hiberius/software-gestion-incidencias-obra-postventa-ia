import Image from "next/image";
import { Check, ScanLine, Wrench } from "lucide-react";
import { clsx } from "clsx";

type EvidenceVariant = "before" | "after" | "context" | "repair" | "pattern";

const EVIDENCE = {
  before: {
    src: "/media/incident-before.webp",
    width: 1448,
    height: 1086,
    alt: "Detalle sintético de una discontinuidad en el sellado de una ventana",
    status: "Zona señalada para revisión",
  },
  after: {
    src: "/media/incident-after.webp",
    width: 1448,
    height: 1086,
    alt: "Detalle sintético de la misma ventana después de completar el sellado",
    status: "Evidencia posterior aportada",
  },
  context: {
    src: "/media/incident-context.webp",
    width: 1448,
    height: 1086,
    alt: "Vista general sintética del salón y de la ventana inspeccionada",
    status: "Vista general de contexto",
  },
  repair: {
    src: "/media/repair-action.webp",
    width: 1448,
    height: 1086,
    alt: "Técnico simulado aplicando sellado perimetral en una ventana",
    status: "Actuación documentada",
  },
  pattern: {
    src: "/media/recurring-pattern.webp",
    width: 1800,
    height: 640,
    alt: "Tres incidencias sintéticas semejantes en encuentros de ventanas",
    status: "Tres casos para revisión conjunta",
  },
} satisfies Record<
  EvidenceVariant,
  { src: string; width: number; height: number; alt: string; status: string }
>;

export function IncidentVisual({
  repaired = false,
  variant,
  label,
  priority = false,
}: {
  repaired?: boolean;
  variant?: EvidenceVariant;
  label?: string;
  priority?: boolean;
}) {
  const selectedVariant = variant ?? (repaired ? "after" : "before");
  const evidence = EVIDENCE[selectedVariant];
  const isAfter = selectedVariant === "after";
  const isRepair = selectedVariant === "repair";

  return (
    <figure
      className={clsx(
        "incident-visual",
        `is-${selectedVariant}`,
        isAfter && "is-repaired",
      )}
    >
      <div className="visual-meta">
        <span>
          {label ??
            (isAfter
              ? "DESPUÉS · 08 JUL"
              : selectedVariant === "context"
                ? "CONTEXTO · 02 JUL"
                : selectedVariant === "repair"
                  ? "ACTUACIÓN · 08 JUL"
                  : selectedVariant === "pattern"
                    ? "PATRÓN · 3 CASOS"
                    : "ANTES · 02 JUL")}
        </span>
        <span>DATOS SINTÉTICOS</span>
      </div>
      <div className="visual-image">
        <Image
          src={evidence.src}
          width={evidence.width}
          height={evidence.height}
          alt={evidence.alt}
          priority={priority}
          sizes={
            selectedVariant === "pattern"
              ? "(max-width: 820px) 100vw, 1200px"
              : "(max-width: 820px) 100vw, 680px"
          }
        />
        {selectedVariant === "before" && (
          <span className="evidence-marker" aria-hidden="true" />
        )}
      </div>
      <figcaption>
        <span className={clsx("visual-status", isAfter && "is-verified")}>
          {isAfter ? (
            <Check size={14} aria-hidden="true" />
          ) : isRepair ? (
            <Wrench size={14} aria-hidden="true" />
          ) : (
            <ScanLine size={14} aria-hidden="true" />
          )}
          {evidence.status}
        </span>
        <span>Residencial Alba Norte · 3.º B · Salón</span>
      </figcaption>
    </figure>
  );
}

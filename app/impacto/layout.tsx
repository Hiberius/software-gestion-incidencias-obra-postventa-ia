import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "ROI y piloto de calidad en construcción",
  description:
    "Edita los supuestos del caso de negocio y revisa un piloto de 12 semanas para medir tiempos, incidencias incompletas, reaperturas y trazabilidad.",
  path: "/impacto/",
});

export default function ImpactLayout({ children }: { children: ReactNode }) {
  return children;
}

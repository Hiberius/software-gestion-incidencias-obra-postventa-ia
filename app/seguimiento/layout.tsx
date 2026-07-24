import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Trazabilidad de incidencias de obra",
  description:
    "Consulta el historial completo de una incidencia: evidencias, responsables, SLA, decisiones, reparación, reapertura y cierre humano.",
  path: "/seguimiento/",
});

export default function TrackingLayout({ children }: { children: ReactNode }) {
  return children;
}

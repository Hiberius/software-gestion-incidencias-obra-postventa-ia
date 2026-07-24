import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Metodología, seguridad y límites de IA",
  description:
    "Revisa la arquitectura, el threat model, las fuentes, los límites de la demo y los controles humanos propuestos para una fase con IA real.",
  path: "/metodologia/",
});

export default function MethodologyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

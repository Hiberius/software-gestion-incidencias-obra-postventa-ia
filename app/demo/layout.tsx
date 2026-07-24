import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Demo guiada de gestión de incidencias",
  description:
    "Recorre una incidencia de construcción desde la foto inicial hasta la verificación humana, la reapertura y el aprendizaje preventivo.",
  path: "/demo/",
});

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Inteligencia preventiva de calidad",
  description:
    "Explora recurrencias revisables, checklists preventivas y una scorecard de proveedor con datos sintéticos, fórmula visible y decisión humana.",
  path: "/inteligencia/",
});

export default function IntelligenceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

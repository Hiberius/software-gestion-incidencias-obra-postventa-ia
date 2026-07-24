import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Verificación antes y después",
  description:
    "Comprueba cómo REPASO AI separa la revisión documental, la validación técnica y la conformidad del cliente antes de cerrar una incidencia.",
  path: "/verificacion/",
});

export default function VerificationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}

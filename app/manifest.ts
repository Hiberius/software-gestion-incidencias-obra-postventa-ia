import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REPASO AI — Gestión de incidencias de obra con IA",
    short_name: "REPASO AI",
    description:
      "Software demostrativo para gestionar incidencias de obra y postventa inmobiliaria con IA y validación humana.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#f4f1e9",
    lang: "es",
    orientation: "portrait-primary",
  };
}

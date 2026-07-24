import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REPASO AI — Calidad trazable",
    short_name: "REPASO AI",
    description:
      "Demo funcional de calidad trazable para construcción, preentrega y postventa.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1e9",
    theme_color: "#f4f1e9",
    lang: "es",
    orientation: "portrait-primary",
  };
}

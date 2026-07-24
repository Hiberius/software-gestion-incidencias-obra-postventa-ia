import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const routes = [
  "",
  "/demo",
  "/seguimiento",
  "/verificacion",
  "/inteligencia",
  "/impacto",
  "/metodologia",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${SITE_URL}${route}/`,
    lastModified: new Date("2026-07-24"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/demo" ? 0.9 : 0.7,
  }));
}

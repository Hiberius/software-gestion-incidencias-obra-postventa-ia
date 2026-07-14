import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/dm-serif-display";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "REPASO AI — Calidad trazable para obra y postventa",
  description:
    "De la foto al cierre verificado. Una demo de inteligencia de calidad para construcción y postventa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

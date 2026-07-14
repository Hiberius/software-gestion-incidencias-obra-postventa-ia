import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/dm-serif-display";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://repaso-ai.pages.dev"),
  title: {
    default: "REPASO AI | Calidad trazable para obra y postventa",
    template: "%s | REPASO AI",
  },
  description:
    "Una demo funcional que convierte señales de obra y postventa en incidencias revisables, cierres humanos y mejoras preventivas.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "REPASO AI",
    title: "De una foto a una mejora verificable",
    description: "Calidad trazable para construcción, preentrega y postventa.",
    images: [
      {
        url: "/media/hero-quality-review.webp",
        width: 1536,
        height: 1024,
        alt: "Responsable de calidad revisando evidencias de obra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REPASO AI | De una foto a una mejora verificable",
    description: "Demo funcional de calidad trazable para obra y postventa.",
    images: ["/media/hero-quality-review.webp"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "oklch(95.45% 0.0108 95.17)",
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

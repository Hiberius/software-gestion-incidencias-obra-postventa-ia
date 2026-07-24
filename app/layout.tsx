import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/dm-serif-display";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { GITHUB_URL, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gestión de incidencias de obra con IA | REPASO AI",
    template: "%s | REPASO AI",
  },
  description:
    "Demo de software para gestionar incidencias de obra, preentrega y postventa inmobiliaria con IA, evidencia trazable y validación humana.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "REPASO AI",
    title: "Gestión de incidencias de obra con IA | REPASO AI",
    description:
      "Software demostrativo para gestionar incidencias de construcción y postventa inmobiliaria con evidencia y cierre humano verificable.",
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
    title: "Gestión de incidencias de obra con IA | REPASO AI",
    description:
      "Demo funcional para gestionar incidencias de obra y postventa inmobiliaria con evidencia trazable y validación humana.",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "REPASO AI",
      inLanguage: "es",
      description:
        "Software demostrativo de gestión de incidencias para construcción, preentrega y postventa inmobiliaria con inteligencia artificial.",
      creator: { "@id": `${SITE_URL}/#creator` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#application`,
      name: "REPASO AI",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Construction quality management",
      operatingSystem: "Web",
      inLanguage: "es",
      isAccessibleForFree: true,
      image: `${SITE_URL}/media/hero-quality-review.webp`,
      description:
        "Demo funcional de software para gestionar incidencias de obra y postventa inmobiliaria con IA, evidencia trazable y validación humana.",
      featureList: [
        "Captura y clasificación asistida de incidencias",
        "Revisión humana y abstención por falta de evidencia",
        "Seguimiento trazable y reapertura",
        "Verificación antes y después",
        "Detección revisable de recurrencias",
        "ROI parametrizable con supuestos visibles",
      ],
      creator: { "@id": `${SITE_URL}/#creator` },
      codeRepository: GITHUB_URL,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#creator`,
      name: "Christian Calabrò",
      url: `https://github.com/Hiberius`,
      sameAs: [`https://github.com/Hiberius`],
      knowsAbout: [
        "AI product engineering",
        "Human-in-the-loop systems",
        "Construction quality workflows",
        "Product design",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

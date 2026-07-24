import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/dm-serif-display";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { GITHUB_URL, SITE_URL } from "@/lib/seo";

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
        "Calidad trazable para construcción, preentrega y postventa.",
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
        "Demo funcional que convierte señales de obra y postventa en incidencias revisables, cierres humanos y mejoras preventivas.",
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

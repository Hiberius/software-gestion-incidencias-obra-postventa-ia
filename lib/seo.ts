import type { Metadata } from "next";

export const SITE_URL = "https://repaso-ai.pages.dev";
export const GITHUB_URL = "https://github.com/Hiberius/repaso-ai";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: path,
      siteName: "REPASO AI",
      title,
      description,
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
      title,
      description,
      images: ["/media/hero-quality-review.webp"],
    },
  };
}

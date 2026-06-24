import type { Metadata } from "next";
import { LANDING_PAGES, getLandingPageBySlug } from "@/data/seo-content";
import { LandingPageView } from "@/components/deluxe/landing-page-view";

export const revalidate = 3600;

export async function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

const PAGE_SLUG = "memoria-ram-laptop-lima";

export async function generateMetadata(): Promise<Metadata> {
  const page = getLandingPageBySlug(PAGE_SLUG);
  if (!page) return { title: "Página no encontrada" };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      siteName: "itechperu.shop",
      locale: "es_PE",
      type: "website",
    },
    other: {
      "geo.region": "PE-LIM",
      "geo.placename": "Lima, Perú",
    },
  };
}

export default function LandingPage() {
  return <LandingPageView slug={PAGE_SLUG} />;
}

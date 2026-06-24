import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getRelatedProducts, STATIC_PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "@/components/deluxe/product-detail-client";

/**
 * Página de Detalle de Producto — itechperu.shop
 *
 * SSG (Static Site Generation):
 *  - generateStaticParams pre-renderiza todas las rutas en build time
 *  - revalidate: 3600 = ISR (revalida cada hora para cambios de precio/stock)
 *  - Google indexa cada producto como página independiente
 *
 * URL limpia: /productos/ipad-pro-129-m2-2022 (slug, no ID)
 */

// ISR: revalidar cada hora (precio/stock actualizado sin redeploy)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-renderiza todas las rutas de productos en build time.
 * Usa el fallback estático si la DB no está disponible (build en Vercel).
 */
export async function generateStaticParams() {
  return STATIC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    return {
      title: "Producto no encontrado — itechperu.shop",
      robots: { index: false, follow: true },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";
  const canonical = `/productos/${product.slug}`;
  const ogImage = product.images[0] || `${siteUrl}/og-default.png`;

  return {
    title: `${product.title} — itechperu.shop`,
    description: `${product.subtitle}. ${product.condition} con garantía ${product.grades[0].warranty}. Envío a todo Perú. Experiencia Deluxe.`,
    keywords: [
      product.brand,
      product.model,
      product.category,
      "reacondicionado Perú",
      "segunda mano Lima",
      "itechperu",
      product.color || "",
      product.storage || "",
    ].filter(Boolean),
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${product.title} — itechperu.shop`,
      description: product.subtitle,
      url: `${siteUrl}${canonical}`,
      siteName: "itechperu.shop",
      images: product.images.map((url, i) => ({
        url,
        width: 1200,
        height: 1200,
        alt: `${product.title}${i > 0 ? ` — imagen ${i + 1}` : ""}`,
      })),
      type: "website",
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — itechperu.shop`,
      description: product.subtitle,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "PE-LIM",
      "geo.placename": "Lima, Perú",
      "geo.position": "-12.046374;-77.042793",
      "ICBM": "-12.046374, -77.042793",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductById(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.slug, 4);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";

  // JSON-LD enriquecido para Google Rich Results + AI
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/productos/${product.slug}`,
    name: product.title,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    image: product.images,
    sku: product.slug,
    url: `${siteUrl}/productos/${product.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      price: (product.basePrice / 100).toFixed(2),
      priceCurrency: "PEN",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      availability:
        product.grades[0] && product.grades[0].priceModifier === 0
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
      seller: {
        "@type": "Organization",
        name: "itechperu.shop",
        url: siteUrl,
      },
      itemCondition: "https://schema.org/UsedCondition",
    },
  };

  // BreadcrumbList para SEO
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category,
        item: `${siteUrl}/#catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${siteUrl}/productos/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getRelatedProducts } from "@/data/products";
import { ProductDetailClient } from "@/components/deluxe/product-detail-client";

/**
 * Página de Detalle de Producto Inmersiva — itechperu.shop
 *
 * Server Component (SSR) para SEO impecable.
 * Lee el producto desde Prisma (DB) con fallback a datos estáticos.
 */

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Producto no encontrado — itechperu.shop",
    };
  }

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
    ],
    openGraph: {
      title: `${product.title} — itechperu.shop`,
      description: product.subtitle,
      images: product.images.map((url) => ({ url, width: 1200, height: 1200 })),
      type: "website",
      locale: "es_PE",
    },
    alternates: { canonical: `/productos/${product.id}` },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, 4);

  // JSON-LD para SEO estructurado
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    image: product.images,
    sku: product.id,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.basePrice / 100, // centavos a soles para schema.org
      priceCurrency: "PEN",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "itechperu.shop" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}

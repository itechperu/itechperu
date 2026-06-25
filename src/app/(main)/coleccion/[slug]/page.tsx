import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, formatPEN } from "@/data/products";
import { COLLECTIONS_SEO, getCollectionBySlug } from "@/data/seo-content";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";
import { BackButton } from "@/components/deluxe/back-button";
import { Star, ChevronRight } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return COLLECTIONS_SEO.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Colección no encontrada" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";
  return {
    title: collection.metaTitle,
    description: collection.metaDescription,
    alternates: { canonical: `/coleccion/${collection.slug}` },
    openGraph: {
      title: collection.metaTitle,
      description: collection.metaDescription,
      url: `${siteUrl}/coleccion/${collection.slug}`,
      siteName: "itechperu.shop",
      locale: "es_PE",
    },
  };
}

export default async function ColeccionSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const allProducts = await getProducts();
  const products = allProducts.filter(collection.filter);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <BackButton />
      <BreadcrumbsDeluxe items={[
        { name: "Inicio", href: "/" },
        { name: "Colecciones", href: "/coleccion" },
        { name: collection.name },
      ]} />

      <div className="max-w-3xl">
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">{collection.h1}</h1>
        <p className="mt-3 text-[14px] text-[var(--text-secondary)] leading-relaxed">{collection.metaDescription}</p>
      </div>

      {products.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {products.map((p) => (
            <Link key={p.id} href={`/producto/${p.slug}`} className="group rounded-3xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] hover:shadow-lg transition-all">
              <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
                <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3 lg:p-4">
                <h2 className="text-[12px] lg:text-[14px] font-semibold text-[var(--text-primary)] line-clamp-2">{p.title}</h2>
                <p className="mt-1 text-[14px] font-bold text-[var(--text-primary)]">{formatPEN(p.basePrice)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <section className="mt-8 text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-3xl">{collection.content}</section>
    </div>
  );
}

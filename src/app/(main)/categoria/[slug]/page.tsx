import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, formatPEN } from "@/data/products";
import { CATEGORIES_SEO, getCategoryBySlug } from "@/data/seo-content";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";
import { BackButton } from "@/components/deluxe/back-button";
import { Star, ShieldCheck, ChevronRight } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return CATEGORIES_SEO.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Categoría no encontrada" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.keywords,
    alternates: { canonical: `/categoria/${category.slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${siteUrl}/categoria/${category.slug}`,
      siteName: "itechperu.shop",
      locale: "es_PE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.metaTitle,
      description: category.metaDescription,
    },
    other: {
      "geo.region": "PE-LIM",
      "geo.placename": "Lima, Perú",
    },
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.category === category.shortName || p.category === category.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.h1,
    description: category.metaDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/categoria/${category.slug}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/producto/${p.slug}`,
      name: p.title,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Los ${category.name.toLowerCase()} reacondicionados tienen garantía?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí, todos nuestros ${category.name.toLowerCase()} incluyen garantía real de 3 a 6 meses según el grado de condición. Grado A+: 6 meses, Grado A: 4 meses, Grado B: 3 meses.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Hacen envíos de ${category.name.toLowerCase()} a todo Perú?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí, enviamos a todo Perú. Lima: 24-48 horas. Provincias: 3-7 días hábiles. Envío gratis en compras sobre S/1,500.`,
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <BackButton />
      <BreadcrumbsDeluxe items={[
        { name: "Inicio", href: "/" },
        { name: "Categorías", href: "/coleccion" },
        { name: category.name },
      ]} />

      <div className="max-w-3xl">
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">{category.h1}</h1>
        <p className="mt-3 text-[14px] lg:text-[16px] text-[var(--text-secondary)] leading-relaxed">{category.metaDescription}</p>
      </div>

      {/* Productos */}
      {products.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {products.map((p) => (
            <Link key={p.id} href={`/producto/${p.slug}`} className="group rounded-3xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] hover:shadow-lg transition-all">
              <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
                <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-2 left-2 rounded-full bg-[#D4AF37] px-2 py-0.5 text-[9px] font-bold text-white">GRADO A+</span>
              </div>
              <div className="p-3 lg:p-4">
                <h2 className="text-[12px] lg:text-[14px] font-semibold text-[var(--text-primary)] line-clamp-2">{p.title}</h2>
                <p className="mt-1 text-[14px] lg:text-[18px] font-bold text-[var(--text-primary)]">{formatPEN(p.basePrice)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Contenido SEO (400+ palabras) */}
      <section className="mt-12 prose prose-sm max-w-3xl text-[13px] lg:text-[14px] text-[var(--text-primary)]/80 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: category.content.replace(/\n\n/g, "<br/><br/>") }} />
      </section>

      {/* CTA */}
      <section className="mt-8 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-8 text-center">
        <h2 className="text-[18px] lg:text-[20px] font-bold text-white">¿No encuentras lo que buscas?</h2>
        <p className="text-[13px] text-white/60 mt-1">Escríbenos por WhatsApp y te ayudamos</p>
        <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#D4AF37] px-6 py-2.5 text-[13px] font-semibold text-[var(--text-primary)]">
          WhatsApp VIP <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>
    </div>
  );
}

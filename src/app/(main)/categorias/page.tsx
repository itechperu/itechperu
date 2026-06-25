import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/data/products";
import { CATEGORIES_SEO } from "@/data/seo-content";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Categorías — Explora por tipo de producto | itechperu.shop",
  description:
    "Explora nuestras categorías: iPads, MacBooks, Laptops, Repuestos, Accesorios y más. Tecnología premium reacondicionada con garantía en Perú.",
  alternates: { canonical: "/categorias" },
};

export const revalidate = 3600;

const CATEGORY_ICONS: Record<string, string> = {
  ipads: "📱",
  macbooks: "💻",
  laptops: "🖥️",
  repuestos: "🔧",
  accesorios: "🎧",
  monitores: "🖼️",
  almacenamiento: "💾",
  redes: "🌐",
};

export default async function CategoriasPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
      <BreadcrumbsDeluxe items={[{ name: "Inicio", href: "/" }, { name: "Categorías" }]} />

      <div className="max-w-2xl mb-8">
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">
          Explora por categoría
        </h1>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
          Encuentra exactamente lo que buscas en nuestro catálogo organizado
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {CATEGORIES_SEO.map((cat) => {
          const count = products.filter(
            (p) => p.category === cat.shortName || p.category === cat.name
          ).length;

          return (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[#D4AF37]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[40px] lg:text-[48px]">{CATEGORY_ICONS[cat.slug] || "📦"}</span>
                  <span className="rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-[11px] font-bold text-[#D4AF37]">
                    {count} {count === 1 ? "producto" : "productos"}
                  </span>
                </div>
                <h2 className="text-[20px] lg:text-[24px] font-bold tracking-tight text-[var(--text-primary)]">
                  {cat.name}
                </h2>
                <p className="mt-2 text-[13px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {cat.metaDescription.substring(0, 120)}...
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#D4AF37] group-hover:gap-2 transition-all">
                  Ver {cat.name} <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#D4AF37]/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { getProducts, formatPEN } from "@/data/products";
import { Star, ShieldCheck, ChevronRight, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Catálogo — iPads, MacBooks y Laptops reacondicionados",
  description:
    "Explora nuestro catálogo completo de tecnología premium reacondicionada en Perú. iPads, MacBooks y Laptops corporativas con garantía real de 3 a 6 meses. Envío a todo Perú.",
  alternates: { canonical: "/coleccion" },
  openGraph: {
    title: "Catálogo — itechperu.shop",
    description: "Tecnología premium reacondicionada con garantía real en Perú.",
    type: "website",
    locale: "es_PE",
  },
};

export const revalidate = 3600;

export default async function ColeccionPage() {
  const products = await getProducts();

  // Agrupar por categoría
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div
          className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-2.5 py-1 mb-3"
        >
          <ShieldCheck className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-[#D4AF37] tracking-wide">
            Verificados · 47 puntos · Garantía real
          </span>
        </div>
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">
          Catálogo Deluxe
        </h1>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
          {products.length} productos verificados · Envío a todo Perú · Garantía 3-6 meses
        </p>
      </div>

      {/* Por categoría */}
      {categories.map((cat) => {
        const catProducts = products.filter((p) => p.category === cat);
        if (catProducts.length === 0) return null;

        return (
          <section key={cat} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] lg:text-[22px] font-bold tracking-tight text-[var(--text-primary)]">
                {cat === "iPad" ? "iPads" : cat === "MacBook" ? "MacBooks" : cat === "Laptop" ? "Laptops" : cat === "Ropa" ? "Ropa USA" : cat}
              </h2>
              <span className="text-[12px] text-[var(--text-secondary)]">
                {catProducts.length} {catProducts.length === 1 ? "producto" : "productos"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
              {catProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.slug}`}
                  className="group rounded-3xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_-8px_rgb(0_0_0/0.12)] hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 inline-flex items-center rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-md px-1.5 py-0.5">
                      <span className="text-[9px] font-bold text-[var(--text-primary)] uppercase tracking-wider">
                        Grado A+
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-md px-1.5 py-0.5">
                      <Star className="h-2.5 w-2.5 fill-[#D4AF37] text-[#D4AF37]" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold text-[var(--text-primary)]">
                        {p.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 lg:p-4">
                    <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-medium">
                      {p.category}
                    </p>
                    <h3 className="mt-0.5 text-[12px] lg:text-[14px] font-semibold text-[var(--text-primary)] leading-tight line-clamp-2 min-h-[32px] lg:min-h-[40px]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 lg:mt-2 text-[14px] lg:text-[18px] font-bold text-[var(--text-primary)]">
                      {formatPEN(p.basePrice)}
                    </p>
                    <p className="text-[9px] lg:text-[10px] text-[var(--text-secondary)] mt-0.5">
                      O 12 cuotas de {formatPEN(Math.round(p.basePrice / 12))}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA inferior */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-10 text-center">
        <h2 className="text-[20px] lg:text-[24px] font-bold text-white">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="mt-1 text-[13px] text-white/60 max-w-md mx-auto">
          Escríbenos por WhatsApp y te ayudamos a encontrar el equipo ideal para ti
        </p>
        <a
          href="https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20busco%20un%20equipo%20específico"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#D4AF37] px-6 py-2.5 text-[13px] font-semibold text-[var(--text-primary)] tap-scale"
        >
          WhatsApp VIP
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </section>
    </div>
  );
}

import Link from "next/link";
import { getProducts, formatPEN, type Product } from "@/data/products";
import { ShieldCheck, Truck, Star, Flame, ChevronRight, MessageCircle } from "lucide-react";
import { HeroClient } from "@/components/deluxe/hero-client";

/**
 * Home page — itechperu.shop (100% responsiva)
 *
 * ISR (Incremental Static Regeneration):
 *  - Se pre-renderiza en build time (Google indexa contenido completo)
 *  - Se revalida cada hora (precio/stock actualizado sin redeploy)
 */

// ISR: revalidar cada hora
export const revalidate = 3600;

export default async function HomePage() {
  const products: Product[] = await getProducts();
  const featured = products.slice(0, 4);
  const offers = products.slice(0, 3);

  return (
    <div>
      {/* Hero full-bleed inmersivo */}
      <HeroClient featuredProduct={featured[0]} />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 space-y-12 lg:space-y-16 pt-12 lg:pt-16">
      {/* ====== Cinta de garantías ====== */}
      <section className="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
        {[
          { icon: ShieldCheck, label: "Garantía", value: "3-6 meses", accent: true },
          { icon: Truck, label: "Envío", value: "24-48h Lima", accent: false },
          { icon: Star, label: "4.9/5", value: "+500 ventas", accent: true },
          { icon: ShieldCheck, label: "Verificado", value: "47 pts", accent: false, desktopOnly: true },
        ].map((item, i) => (
          <div
            key={i}
            className={`${item.desktopOnly ? "hidden lg:flex" : "flex"} flex-col items-center text-center gap-1 rounded-2xl bg-[#F5F5F7] p-3 lg:p-4`}
          >
            <item.icon
              className={`h-5 w-5 lg:h-6 lg:w-6 ${item.accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"}`}
              strokeWidth={1.5}
            />
            <span className="text-[10px] lg:text-[12px] font-semibold text-[#1D1D1F]">
              {item.label}
            </span>
            <span className="text-[9px] lg:text-[11px] text-[#86868B]">{item.value}</span>
          </div>
        ))}
      </section>

      {/* ====== Ofertas relámpago (#ofertas) ====== */}
      <section id="ofertas" data-section="ofertas" className="scroll-mt-[140px] lg:scroll-mt-[180px]">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 lg:h-5 lg:w-5 text-[#D4AF37]" strokeWidth={1.5} />
            <h2 className="text-[15px] lg:text-[20px] font-bold tracking-tight text-[#1D1D1F]">
              Ofertas Deluxe
            </h2>
          </div>
          <Link
            href="#catalogo"
            className="text-[11px] lg:text-[13px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            Ver todo →
          </Link>
        </div>

        {/* En móvil: scroll horizontal. En desktop: grid de 3 */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0 pb-1 lg:grid lg:grid-cols-3 lg:gap-4">
          {offers.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.slug}`}
              className="group flex-shrink-0 w-[260px] sm:w-[280px] lg:w-auto"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#F5F5F7] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 lg:top-3 lg:left-3 inline-flex items-center rounded-full bg-[#D4AF37] px-2 lg:px-2.5 py-0.5 lg:py-1 text-[10px] lg:text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                  −S/500
                </span>
                <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 rounded-full bg-white/80 backdrop-blur-md px-2 lg:px-3 py-1">
                  <span className="text-[10px] lg:text-[12px] font-bold text-[#1D1D1F]">
                    {formatPEN(p.basePrice - 50000)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[12px] lg:text-[14px] font-semibold text-[#1D1D1F] truncate">
                {p.title}
              </p>
              <p className="text-[10px] lg:text-[12px] text-[#86868B] truncate">{p.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Catálogo principal (#catalogo) ====== */}
      <section id="catalogo" data-section="catalogo" className="scroll-mt-[140px] lg:scroll-mt-[180px]">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h2 className="text-[15px] lg:text-[20px] font-bold tracking-tight text-[#1D1D1F]">
            Destacados
          </h2>
          <span className="text-[11px] lg:text-[13px] text-[#86868B]">
            {products.length} productos
          </span>
        </div>

        {/* Grid responsivo: 2 cols móvil → 3 cols tablet → 4 cols desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.slug}`}
              className="group rounded-3xl overflow-hidden bg-white border border-[#E5E5E7] shadow-[0_8px_30px_rgb(0,0,0,0.04)] tap-scale hover:shadow-[0_12px_40px_-8px_rgb(0_0_0/0.12)] hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F5F5F7]">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 lg:top-3 lg:left-3 inline-flex items-center rounded-full bg-white/80 backdrop-blur-md px-1.5 lg:px-2 py-0.5">
                  <span className="text-[9px] lg:text-[10px] font-bold text-[#1D1D1F] uppercase tracking-wider">
                    Grado A+
                  </span>
                </div>
                <div className="absolute top-2 right-2 lg:top-3 lg:right-3 inline-flex items-center gap-0.5 rounded-full bg-white/80 backdrop-blur-md px-1.5 lg:px-2 py-0.5">
                  <Star className="h-2.5 w-2.5 lg:h-3 lg:w-3 fill-[#D4AF37] text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-[9px] lg:text-[10px] font-bold text-[#1D1D1F]">
                    {p.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="p-3 lg:p-4">
                <p className="text-[10px] lg:text-[11px] text-[#86868B] uppercase tracking-wider font-medium">
                  {p.category}
                </p>
                <h3 className="mt-0.5 text-[12px] lg:text-[14px] font-semibold text-[#1D1D1F] leading-tight line-clamp-2 min-h-[32px] lg:min-h-[40px]">
                  {p.title}
                </h3>
                <p className="mt-1.5 lg:mt-2 text-[14px] lg:text-[18px] font-bold text-[#1D1D1F]">
                  {formatPEN(p.basePrice)}
                </p>
                <p className="text-[9px] lg:text-[10px] text-[#86868B] mt-0.5">
                  O 12 cuotas de {formatPEN(Math.round(p.basePrice / 12))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Categorías Deluxe (#categorias) ====== */}
      <section id="categorias" data-section="categorias" className="scroll-mt-[140px] lg:scroll-mt-[180px]">
        <h2 className="text-[15px] lg:text-[20px] font-bold tracking-tight text-[#1D1D1F] mb-3 lg:mb-4">
          Categorías
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-4">
          {[
            { name: "iPads", desc: "Pro, Air, mini", icon: "📱", color: "from-[#D4AF37]/10 to-[#D4AF37]/5" },
            { name: "MacBooks", desc: "Air y Pro M1-M3", icon: "💻", color: "from-[#1D1D1F]/5 to-[#1D1D1F]/2" },
            { name: "Laptops", desc: "Corporativas Dell, HP", icon: "🖥️", color: "from-[#F5F5F7] to-white" },
            { name: "Ropa USA", desc: "Selección premium", icon: "👕", color: "from-[#D4AF37]/5 to-[#F5F5F7]" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href="#catalogo"
              className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-br ${cat.color} border border-[#E5E5E7] p-3.5 lg:p-5 tap-scale hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:border-[#D4AF37]/30 transition-all`}
            >
              <span className="text-[24px] lg:text-[32px]">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] lg:text-[15px] font-semibold text-[#1D1D1F]">{cat.name}</p>
                <p className="text-[10px] lg:text-[11px] text-[#86868B] truncate">{cat.desc}</p>
              </div>
              <ChevronRight
                className="h-4 w-4 lg:h-5 lg:w-5 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 transition-all"
                strokeWidth={1.5}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Sello de confianza (#confianza) ====== */}
      <section id="confianza" data-section="confianza" className="rounded-3xl lg:rounded-[2rem] bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-5 sm:p-8 lg:p-12 text-center scroll-mt-[140px] lg:scroll-mt-[180px]">
        <div className="inline-flex items-center justify-center h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-[#D4AF37]/20 backdrop-blur-md mb-2 lg:mb-3">
          <ShieldCheck className="h-6 w-6 lg:h-8 lg:w-8 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <h3 className="text-[14px] lg:text-[20px] font-bold text-white">
          Confianza Absoluta
        </h3>
        <p className="mt-1 lg:mt-2 text-[11px] lg:text-[14px] text-white/70 leading-relaxed max-w-[300px] lg:max-w-2xl mx-auto">
          Cada equipo pasa por 47 puntos de inspección técnica en Lima. Si no queda
          perfecto, no se vende. Garantía real sin letra pequeña.
        </p>
        <div className="mt-3 lg:mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-white/10 px-2.5 lg:px-3 py-1 lg:py-1.5 text-[10px] lg:text-[12px] text-white/80">
            🛡️ Póliza física
          </span>
          <span className="rounded-full bg-white/10 px-2.5 lg:px-3 py-1 lg:py-1.5 text-[10px] lg:text-[12px] text-white/80">
            📦 Empaque Deluxe
          </span>
          <span className="rounded-full bg-white/10 px-2.5 lg:px-3 py-1 lg:py-1.5 text-[10px] lg:text-[12px] text-white/80">
            🚚 Envío a todo Perú
          </span>
          <span className="rounded-full bg-white/10 px-2.5 lg:px-3 py-1 lg:py-1.5 text-[10px] lg:text-[12px] text-white/80">
            ↩️ 7 días de devolución
          </span>
        </div>
      </section>
      </div>
    </div>
  );
}

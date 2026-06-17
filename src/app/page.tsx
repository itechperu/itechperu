import Link from "next/link";
import { products, formatPEN } from "@/data/products";
import { ShieldCheck, Truck, Star, Sparkles, ChevronRight, Flame } from "lucide-react";

/**
 * Home page — itechperu.shop
 *
 * Catálogo Deluxe mobile-first con:
 *  - Hero premium con promesa de confianza
 *  - Cinta de garantías y beneficios
 *  - Grid de productos destacados (link a /productos/[id])
 *  - Categorías Deluxe
 *  - Sello de confianza itechperu
 */
export default function HomePage() {
  const featured = products.slice(0, 4);
  const offers = products.slice(0, 2);

  return (
    <div className="space-y-8">
      {/* ====== Hero Deluxe ====== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D1D1F] via-[#2A2A2D] to-[#1D1D1F] p-5 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.3)]">
        {/* Detalle oro */}
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1">
            <Sparkles className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
            <span className="text-[10px] font-medium text-white/90 tracking-wide">
              Reacondicionado Premium · Lima, Perú
            </span>
          </div>

          <h1 className="mt-3 text-[24px] font-bold tracking-tight leading-tight text-white">
            Tecnología de alta gama
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E7A1] to-[#D4AF37] bg-clip-text text-transparent">
              al precio inteligente
            </span>
          </h1>

          <p className="mt-2 text-[12.5px] text-white/70 leading-relaxed max-w-[280px]">
            iPads, MacBooks y Laptops corporativas verificadas con protocolo de
            47 puntos. Garantía real y experiencia Deluxe.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <Link
              href={`/productos/${featured[0].id}`}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#1D1D1F] tap-scale hover:bg-[#F5F5F7] transition-colors"
            >
              Ver destacado
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
            <Link
              href="#catalogo"
              className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[12px] font-medium text-white tap-scale hover:bg-white/15 transition-colors"
            >
              Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ====== Cinta de garantías ====== */}
      <section className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center text-center gap-1 rounded-2xl bg-[#F5F5F7] p-3">
          <ShieldCheck className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
          <span className="text-[10px] font-semibold text-[#1D1D1F]">Garantía</span>
          <span className="text-[9px] text-[#86868B]">3-6 meses</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1 rounded-2xl bg-[#F5F5F7] p-3">
          <Truck className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
          <span className="text-[10px] font-semibold text-[#1D1D1F]">Envío</span>
          <span className="text-[9px] text-[#86868B]">24-48h Lima</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1 rounded-2xl bg-[#F5F5F7] p-3">
          <Star className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" strokeWidth={1.5} />
          <span className="text-[10px] font-semibold text-[#1D1D1F]">4.9/5</span>
          <span className="text-[9px] text-[#86868B]">+500 ventas</span>
        </div>
      </section>

      {/* ====== Ofertas relámpago ====== */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#D4AF37]" strokeWidth={1.5} />
            <h2 className="text-[15px] font-bold tracking-tight text-[#1D1D1F]">
              Ofertas Deluxe
            </h2>
          </div>
          <Link
            href="#catalogo"
            className="text-[11px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
          >
            Ver todo
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {offers.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.id}`}
              className="group flex-shrink-0 w-[260px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#F5F5F7] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-[#D4AF37] px-2 py-0.5 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                  −S/500
                </span>
                <div className="absolute bottom-2 right-2 rounded-full bg-white/80 backdrop-blur-md px-2 py-1">
                  <span className="text-[10px] font-bold text-[#1D1D1F]">
                    {formatPEN(p.basePrice - 500)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[12px] font-semibold text-[#1D1D1F] truncate">
                {p.title}
              </p>
              <p className="text-[10px] text-[#86868B] truncate">{p.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Catálogo principal ====== */}
      <section id="catalogo">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[15px] font-bold tracking-tight text-[#1D1D1F]">
            Destacados
          </h2>
          <span className="text-[11px] text-[#86868B]">{products.length} productos</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/productos/${p.id}`}
              className="group rounded-3xl overflow-hidden bg-white border border-[#E5E5E7] shadow-[0_8px_30px_rgb(0,0,0,0.04)] tap-scale hover:shadow-[0_12px_40px_-8px_rgb(0_0_0/0.12)] transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F5F5F7]">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/80 backdrop-blur-md px-1.5 py-0.5">
                  <span className="text-[9px] font-bold text-[#1D1D1F] uppercase tracking-wider">
                    Grado A+
                  </span>
                </div>
                <div className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full bg-white/80 backdrop-blur-md px-1.5 py-0.5">
                  <Star className="h-2.5 w-2.5 fill-[#D4AF37] text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-[9px] font-bold text-[#1D1D1F]">
                    {p.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="p-3">
                <p className="text-[10px] text-[#86868B] uppercase tracking-wider font-medium">
                  {p.category}
                </p>
                <h3 className="mt-0.5 text-[12px] font-semibold text-[#1D1D1F] leading-tight line-clamp-2 min-h-[28px]">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[14px] font-bold text-[#1D1D1F]">
                  {formatPEN(p.basePrice)}
                </p>
                <p className="text-[9px] text-[#86868B] mt-0.5">
                  O 12 cuotas de {formatPEN(Math.round(p.basePrice / 12))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Categorías Deluxe ====== */}
      <section>
        <h2 className="text-[15px] font-bold tracking-tight text-[#1D1D1F] mb-3">
          Categorías
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { name: "iPads", desc: "Pro, Air, mini", icon: "📱", color: "from-[#D4AF37]/10 to-[#D4AF37]/5" },
            { name: "MacBooks", desc: "Air y Pro M1-M3", icon: "💻", color: "from-[#1D1D1F]/5 to-[#1D1D1F]/2" },
            { name: "Laptops", desc: "Corporativas Dell, HP", icon: "🖥️", color: "from-[#F5F5F7] to-white" },
            { name: "Ropa USA", desc: "Selección premium", icon: "👕", color: "from-[#D4AF37]/5 to-[#F5F5F7]" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href="#catalogo"
              className={`group flex items-center gap-3 rounded-2xl bg-gradient-to-br ${cat.color} border border-[#E5E5E7] p-3.5 tap-scale hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all`}
            >
              <span className="text-[24px]">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#1D1D1F]">{cat.name}</p>
                <p className="text-[10px] text-[#86868B] truncate">{cat.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#86868B] group-hover:text-[#1D1D1F] group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </section>

      {/* ====== Sello de confianza ====== */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-5 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#D4AF37]/20 backdrop-blur-md mb-2">
          <ShieldCheck className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <h3 className="text-[14px] font-bold text-white">Confianza Absoluta</h3>
        <p className="mt-1 text-[11px] text-white/70 leading-relaxed max-w-[300px] mx-auto">
          Cada equipo pasa por 47 puntos de inspección técnica. Si no queda
          perfecto, no se vende. Garantía real sin letra pequeña.
        </p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/80">
            🛡️ Póliza física
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/80">
            📦 Empaque Deluxe
          </span>
        </div>
      </section>
    </div>
  );
}

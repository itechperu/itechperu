import Link from "next/link";
import { getProducts, formatPEN, type Product } from "@/data/products";
import { ShieldCheck, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { HeroClient } from "@/components/deluxe/hero-client";
import { RevealOnScroll } from "@/components/deluxe/reveal-on-scroll";

export const revalidate = 3600;

export default async function HomePage() {
  const products: Product[] = await getProducts();
  const featured = products.slice(0, 4);
  const heroProduct = featured[0];

  return (
    <div>
      {/* Hero full-bleed cinematográfico */}
      <HeroClient featuredProduct={heroProduct} />

      {/* Transición suave hero oscuro → contenido claro */}
      <div className="transition-fade-dark" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* ====== Trust strip minimalista ====== */}
        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 py-8 lg:py-12 border-b border-[var(--border-color)]">
          {[
            { label: "Garantía real", value: "3-6 meses" },
            { label: "Envío", value: "24-48h Lima" },
            { label: "Verificados", value: "47 puntos" },
            { label: "Calificación", value: "4.9/5" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="hidden sm:block w-px h-6 bg-[var(--border-color)]" />}
              <div className="text-center">
                <p className="text-[16px] lg:text-[20px] font-bold text-[var(--text-primary)]">{item.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ====== Producto destacado — storytelling ====== */}
        {heroProduct && (
          <RevealOnScroll>
          <section className="py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-3 py-1 text-[11px] font-medium text-[#D4AF37] tracking-wide mb-4">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  Producto destacado
                </span>
                <h2 className="text-[28px] lg:text-[44px] font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                  {heroProduct.title}
                </h2>
                <p className="mt-3 text-[15px] lg:text-[17px] text-[var(--text-secondary)] leading-relaxed max-w-lg">
                  {heroProduct.subtitle}. Verificado con 47 puntos de inspección. Garantía de 6 meses.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-[32px] lg:text-[40px] font-bold text-[var(--text-primary)]">
                    {formatPEN(heroProduct.basePrice)}
                  </span>
                  <span className="text-[13px] text-[var(--text-secondary)]">
                    o 12 cuotas de {formatPEN(Math.round(heroProduct.basePrice / 12))}
                  </span>
                </div>
                <Link
                  href={`/producto/${heroProduct.slug}`}
                  className="group inline-flex items-center gap-2 mt-6 rounded-full bg-[#1D1D1F] dark:bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-white dark:text-[#1D1D1F] hover:scale-[1.02] transition-transform"
                >
                  Ver producto
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </Link>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-[var(--bg-secondary)]">
                  <img src={heroProduct.images[0]} alt={heroProduct.title} className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-xl p-3 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-[11px] font-semibold text-[var(--text-primary)]">Grado A+ · 6 meses garantía</span>
                </div>
              </div>
            </div>
          </section>
          </RevealOnScroll>
        )}

        {/* ====== Categorías — enlaces directos ====== */}
        <RevealOnScroll delay={0.1}>
        <section className="py-12 lg:py-16 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] lg:text-[28px] font-bold tracking-tight text-[var(--text-primary)]">
              Explora por categoría
            </h2>
            <Link href="/categorias" className="text-[13px] font-medium text-[#D4AF37] hover:gap-2 inline-flex items-center gap-1 transition-all">
              Ver todas <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {[
              { name: "iPads", desc: "Pro, Air, mini", icon: "📱", href: "/categoria/ipads" },
              { name: "MacBooks", desc: "Air y Pro M1-M3", icon: "💻", href: "/categoria/macbooks" },
              { name: "Laptops", desc: "Dell, HP, Lenovo", icon: "🖥️", href: "/categoria/laptops" },
              { name: "Accesorios", desc: "Cargadores, fundas", icon: "🎧", href: "/categoria/accesorios" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[#D4AF37]/30 transition-all p-5 lg:p-6"
              >
                <span className="text-[32px] lg:text-[40px] block mb-2">{cat.icon}</span>
                <p className="text-[14px] lg:text-[16px] font-semibold text-[var(--text-primary)]">{cat.name}</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{cat.desc}</p>
                <ChevronRight className="absolute top-5 right-5 h-4 w-4 text-[var(--text-secondary)] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </section>
        </RevealOnScroll>

        {/* ====== Productos destacados — grid limpio ====== */}
        <RevealOnScroll delay={0.15}>
        <section className="py-12 lg:py-16 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] lg:text-[28px] font-bold tracking-tight text-[var(--text-primary)]">
              Destacados
            </h2>
            <Link href="/catalogo" className="text-[13px] font-medium text-[#D4AF37] hover:gap-2 inline-flex items-center gap-1 transition-all">
              Ver catálogo <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/producto/${p.slug}`}
                className="group rounded-3xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
                  <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-2 left-2 rounded-full bg-[#D4AF37] px-2 py-0.5 text-[9px] font-bold text-white">A+</span>
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="text-[12px] lg:text-[14px] font-semibold text-[var(--text-primary)] line-clamp-2 leading-tight">{p.title}</h3>
                  <p className="mt-1.5 text-[14px] lg:text-[18px] font-bold text-[var(--text-primary)]">{formatPEN(p.basePrice)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        </RevealOnScroll>

        {/* Transición suave claro → oscuro */}
        <div className="transition-fade-light" />

        {/* ====== Confianza — sección cinematográfica ====== */}
        <RevealOnScroll>
        <section className="py-16 lg:py-24">
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#1D1D1F] via-[#2A2A2D] to-[#000000] p-8 lg:p-16 text-center">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
            <div className="relative">
              <div className="inline-flex items-center justify-center h-14 w-14 lg:h-20 lg:w-20 rounded-full bg-[#D4AF37]/20 backdrop-blur-md mb-4">
                <ShieldCheck className="h-7 w-7 lg:h-10 lg:w-10 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h2 className="text-[24px] lg:text-[36px] font-bold text-white tracking-tight">
                Confianza absoluta
              </h2>
              <p className="mt-3 text-[14px] lg:text-[17px] text-white/60 max-w-xl mx-auto leading-relaxed">
                Cada equipo pasa por 47 puntos de inspección técnica en Lima. Si no queda perfecto, no se vende. Garantía real sin letra pequeña.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {["Póliza física", "Empaque Deluxe", "Envío nacional", "7 días devolución"].map((badge) => (
                  <span key={badge} className="rounded-full bg-white/10 border border-white/15 px-4 py-2 text-[12px] font-medium text-white/80">
                    {badge}
                  </span>
                ))}
              </div>
              <Link
                href="/garantia"
                className="group inline-flex items-center gap-2 mt-8 rounded-full bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-[#1D1D1F] hover:scale-[1.02] transition-transform"
              >
                Conoce nuestra garantía
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
        </RevealOnScroll>

        {/* Transición suave oscuro → claro */}
        <div className="transition-fade-light" />

        {/* ====== CTA final ====== */}
        <RevealOnScroll delay={0.1}>
        <section className="py-12 lg:py-16 text-center">
          <h2 className="text-[22px] lg:text-[28px] font-bold text-[var(--text-primary)] tracking-tight">
            ¿Listo para la experiencia Deluxe?
          </h2>
          <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
            Tecnología premium reacondicionada con garantía real en Perú
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/catalogo" className="rounded-full bg-[#1D1D1F] dark:bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-white dark:text-[#1D1D1F] hover:scale-[1.02] transition-transform">
              Ver catálogo
            </Link>
            <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--border-color)] px-6 py-3 text-[14px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
              WhatsApp VIP
            </a>
          </div>
        </section>
        </RevealOnScroll>
      </div>
    </div>
  );
}

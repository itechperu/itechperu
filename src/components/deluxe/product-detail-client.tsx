"use client";

import { useState, useMemo } from "react";
import {
  Battery,
  Cpu,
  Monitor,
  HardDrive,
  Camera,
  Wifi,
  MemoryStick,
  Weight,
  Cable,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  ShoppingBag,
  MessageCircle,
  Star,
} from "lucide-react";
import { GradeSelectorDeluxe } from "./grade-selector-deluxe";
import { ProductGalleryDeluxe } from "./product-gallery-deluxe";
import type { Product, ProductGrade } from "@/data/products";
import { formatPEN } from "@/data/products";

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  battery: Battery,
  cpu: Cpu,
  display: Monitor,
  storage: HardDrive,
  camera: Camera,
  wifi: Wifi,
  memory: MemoryStick,
  weight: Weight,
  ports: Cable,
};

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

/**
 * Contenedor interactivo del detalle de producto (100% responsivo).
 *
 * Layout:
 *  - Mobile (< lg): una sola columna, todo apilado, CTA flotante abajo
 *  - Desktop (≥ lg): grid de 2 columnas — galería sticky a la izquierda,
 *    info del producto (scroll natural) a la derecha. CTA integrado en sidebar.
 */
export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [selectedGrade, setSelectedGrade] = useState<ProductGrade>("A+");
  const [quantity, setQuantity] = useState(1);

  const currentGrade = useMemo(
    () => product.grades.find((g) => g.grade === selectedGrade) ?? product.grades[0],
    [product, selectedGrade]
  );

  const finalUnitPrice = product.basePrice + currentGrade.priceModifier;
  const finalTotal = finalUnitPrice * quantity;

  return (
    <div className="space-y-5 lg:space-y-0">
      {/* ====== Breadcrumb minimalista ====== */}
      <nav className="flex items-center gap-1.5 text-[11px] lg:text-[12px] text-[#86868B]">
        <a href="/" className="hover:text-[#1D1D1F]">Inicio</a>
        <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
        <a href="#catalogo" className="hover:text-[#1D1D1F]">{product.category}</a>
        <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
        <span className="text-[#1D1D1F] font-medium truncate">{product.model}</span>
      </nav>

      {/* ====== Layout 2 columnas en desktop ====== */}
      <div className="lg:grid lg:grid-cols-[1fr_440px] lg:gap-12 lg:items-start">
        {/* ====== COLUMNA IZQUIERDA: Galería (sticky en desktop) ====== */}
        <div className="lg:sticky lg:top-[160px]">
          <ProductGalleryDeluxe
            images={product.images}
            productName={product.title}
          />
        </div>

        {/* ====== COLUMNA DERECHA: Info del producto ====== */}
        <div className="mt-6 lg:mt-0 space-y-5 lg:space-y-6">
          {/* Header del producto */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-[#1D1D1F] px-2 py-0.5 text-[10px] lg:text-[11px] font-semibold tracking-wide text-white uppercase">
                {product.brand}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#F5F5F7] border border-[#E5E5E7] px-2 py-0.5 text-[10px] lg:text-[11px] font-medium text-[#1D1D1F]">
                {product.condition}
              </span>
              {product.color && (
                <span className="text-[11px] lg:text-[12px] text-[#86868B]">· {product.color}</span>
              )}
            </div>

            <h1 className="text-[22px] lg:text-[32px] font-bold tracking-tight leading-tight text-[#1D1D1F]">
              {product.title}
            </h1>
            <p className="text-[13px] lg:text-[15px] text-[#86868B] leading-relaxed">
              {product.subtitle}
            </p>

            {/* Rating + vendidos */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 lg:h-4 lg:w-4 ${
                        s <= Math.round(product.rating)
                          ? "fill-[#D4AF37] text-[#D4AF37]"
                          : "text-[#E5E5E7]"
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-[11px] lg:text-[13px] font-medium text-[#1D1D1F] ml-1">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[11px] lg:text-[13px] text-[#86868B]">
                  ({product.reviewCount})
                </span>
              </div>
              <span className="text-[#E5E5E7]">·</span>
              <span className="text-[11px] lg:text-[13px] text-[#86868B]">
                {product.soldCount} vendidos
              </span>
            </div>
          </section>

          {/* Precio dinámico */}
          <section className="rounded-3xl bg-gradient-to-br from-[#FFFBEB] via-[#FFFDF7] to-white border border-[#D4AF37]/20 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] lg:text-[11px] uppercase tracking-wider text-[#86868B] font-medium">
                  Precio Deluxe · Grado {selectedGrade}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-[28px] lg:text-[36px] font-bold tracking-tight text-[#1D1D1F] leading-none">
                    {formatPEN(finalUnitPrice)}
                  </span>
                  {currentGrade.priceModifier < 0 && (
                    <span className="text-[12px] lg:text-[13px] text-[#86868B] line-through">
                      {formatPEN(product.basePrice)}
                    </span>
                  )}
                </div>
                <p className="text-[10px] lg:text-[11px] text-[#86868B] mt-1">
                  O 12 cuotas de {formatPEN(Math.round(finalUnitPrice / 12))} · Mercado Pago
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-full bg-[#D4AF37]/10 px-2 py-1 text-[10px] lg:text-[11px] font-semibold text-[#D4AF37]">
                  Ahorra hasta {formatPEN(500)}
                </span>
              </div>
            </div>
          </section>

          {/* Selector de Grado (joyería) */}
          <GradeSelectorDeluxe
            grades={product.grades}
            initialGrade="A+"
            onSelect={(grade) => setSelectedGrade(grade)}
          />

          {/* Selector de cantidad + CTA (visible en desktop, oculto en móvil porque hay flotante) */}
          <section className="hidden lg:block rounded-3xl border border-[#E5E5E7] p-4 bg-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-2xl bg-[#F5F5F7] p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white transition-colors tap-scale text-[#1D1D1F] font-bold text-[16px]"
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <span className="w-8 text-center text-[14px] font-semibold text-[#1D1D1F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(9, q + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white transition-colors tap-scale text-[#1D1D1F] font-bold text-[16px]"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium leading-none">
                  Total
                </p>
                <p className="text-[18px] font-bold text-[#1D1D1F] leading-tight">
                  {formatPEN(finalTotal)}
                </p>
              </div>

              <button
                className="flex items-center gap-1.5 rounded-2xl bg-[#1D1D1F] px-5 py-3 text-white tap-scale hover:bg-[#1D1D1F]/90 transition-colors"
                aria-label="Agregar al carrito"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                <span className="text-[13px] font-semibold">Agregar</span>
              </button>

              <a
                href={`https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20quiero%20el%20${encodeURIComponent(
                  product.title
                )}%20Grado%20${selectedGrade}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] tap-scale shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
                aria-label="Comprar por WhatsApp VIP"
              >
                <MessageCircle className="h-5 w-5 text-white" strokeWidth={1.5} />
              </a>
            </div>
          </section>

          {/* Ficha Técnica Deluxe */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] lg:text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
                Ficha Técnica
              </h3>
              <span className="text-[10px] lg:text-[11px] text-[#86868B]">
                Verificado en Lima · 47 pts
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2.5">
              {product.specs.map((spec, i) => {
                const Icon = ICONS[spec.icon] ?? Cpu;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white border border-[#E5E5E7] p-3.5 transition-all duration-300 hover:border-[#D4AF37]/30 hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F5F7]">
                        <Icon className="h-3.5 w-3.5 text-[#1D1D1F]" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium">
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-[12px] lg:text-[13px] font-semibold text-[#1D1D1F] leading-tight">
                      {spec.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Highlights */}
          <section className="rounded-3xl bg-[#F5F5F7] p-5">
            <h3 className="text-[13px] lg:text-[15px] font-semibold tracking-tight text-[#1D1D1F] mb-3">
              Por qué amarán este {product.category}
            </h3>
            <ul className="space-y-2.5">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  </span>
                  <span className="text-[12px] lg:text-[13px] text-[#1D1D1F] leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Descripción larga */}
          <section className="space-y-2">
            <h3 className="text-[14px] lg:text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
              Descripción Deluxe
            </h3>
            <p className="text-[12.5px] lg:text-[14px] text-[#1D1D1F]/80 leading-relaxed">
              {product.description}
            </p>
          </section>

          {/* Incluye */}
          <section className="rounded-2xl border border-[#E5E5E7] p-4">
            <h3 className="text-[13px] lg:text-[15px] font-semibold text-[#1D1D1F] mb-2.5">
              En la caja Deluxe
            </h3>
            <ul className="space-y-1.5">
              {product.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                  <span className="text-[12px] lg:text-[13px] text-[#1D1D1F]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Garantías y envíos */}
          <section className="grid grid-cols-3 gap-2.5">
            <div className="flex flex-col items-center text-center gap-1.5 rounded-2xl bg-white border border-[#E5E5E7] p-3">
              <ShieldCheck className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
              <span className="text-[10px] lg:text-[11px] font-semibold text-[#1D1D1F]">
                {currentGrade.warranty}
              </span>
              <span className="text-[9px] lg:text-[10px] text-[#86868B]">Garantía</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 rounded-2xl bg-white border border-[#E5E5E7] p-3">
              <Truck className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
              <span className="text-[10px] lg:text-[11px] font-semibold text-[#1D1D1F]">24-48h</span>
              <span className="text-[9px] lg:text-[10px] text-[#86868B]">Lima · Perú</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 rounded-2xl bg-white border border-[#E5E5E7] p-3">
              <RotateCcw className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
              <span className="text-[10px] lg:text-[11px] font-semibold text-[#1D1D1F]">7 días</span>
              <span className="text-[9px] lg:text-[10px] text-[#86868B]">Devolución</span>
            </div>
          </section>
        </div>
      </div>

      {/* ====== Productos relacionados ====== */}
      {related.length > 0 && (
        <section className="mt-8 lg:mt-16 space-y-3 lg:space-y-4">
          <h3 className="text-[14px] lg:text-[20px] font-semibold tracking-tight text-[#1D1D1F]">
            También te puede gustar
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {related.map((rp) => (
              <a
                key={rp.id}
                href={`/productos/${rp.id}`}
                className="group"
              >
                <div className="aspect-square overflow-hidden rounded-2xl lg:rounded-3xl bg-[#F5F5F7] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <img
                    src={rp.images[0]}
                    alt={rp.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[11px] lg:text-[13px] font-semibold text-[#1D1D1F] mt-2 truncate">
                  {rp.title}
                </p>
                <p className="text-[11px] lg:text-[13px] text-[#D4AF37] font-bold">
                  {formatPEN(rp.basePrice)}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ====== CTA flotante (solo móvil/tablet) ====== */}
      <div className="lg:hidden h-24" aria-hidden />

      <div className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-[440px] sm:max-w-3xl px-4 pb-safe">
        <div className="flex items-center gap-2 rounded-3xl border border-white/40 bg-white/85 backdrop-blur-xl p-2.5 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.18)]">
          <div className="flex items-center gap-1 rounded-2xl bg-[#F5F5F7] p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-white transition-colors tap-scale text-[#1D1D1F] font-bold text-[14px]"
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="w-6 text-center text-[13px] font-semibold text-[#1D1D1F]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(9, q + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-white transition-colors tap-scale text-[#1D1D1F] font-bold text-[14px]"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          <div className="flex-1 px-1">
            <p className="text-[9px] uppercase tracking-wider text-[#86868B] font-medium leading-none">
              Total
            </p>
            <p className="text-[15px] font-bold text-[#1D1D1F] leading-tight">
              {formatPEN(finalTotal)}
            </p>
          </div>

          <button
            className="flex items-center gap-1.5 rounded-2xl bg-[#1D1D1F] px-4 py-2.5 text-white tap-scale hover:bg-[#1D1D1F]/90 transition-colors"
            aria-label="Agregar al carrito"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-[12px] font-semibold">Agregar</span>
          </button>

          <a
            href={`https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20quiero%20el%20${encodeURIComponent(
              product.title
            )}%20Grado%20${selectedGrade}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] tap-scale shadow-[0_4px_12px_rgba(212,175,55,0.4)]"
            aria-label="Comprar por WhatsApp VIP"
          >
            <MessageCircle className="h-5 w-5 text-white" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
}

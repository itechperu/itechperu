"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, ShieldCheck, Truck, RotateCcw, CheckCircle2, ShoppingBag,
  MessageCircle, Zap, ChevronRight, Minus, Plus, ArrowLeft,
} from "lucide-react";
import { GalleryPremium } from "./gallery-premium";
import { GradeSelectorPremium } from "./grade-selector-premium";
import { SpecsAccordion } from "./specs-accordion";
import { TrustSection } from "./trust-section";
import { RelatedCarousel } from "./related-carousel";
import { BreadcrumbsDeluxe } from "./breadcrumbs-deluxe";
import { MobileStickyBar } from "./mobile-sticky-bar";
import { useCart } from "@/store/use-cart";
import { toast } from "sonner";
import type { Product, ProductGrade } from "@/data/products";
import { formatPEN } from "@/data/products";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [selectedGrade, setSelectedGrade] = useState<ProductGrade>("A+");
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const currentGrade = useMemo(
    () => product.grades.find((g) => g.grade === selectedGrade) ?? product.grades[0],
    [product, selectedGrade]
  );

  const finalUnitPrice = product.basePrice + currentGrade.priceModifier;
  const finalTotal = finalUnitPrice * quantity;
  const savings = currentGrade.priceModifier < 0 ? Math.abs(currentGrade.priceModifier) : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: product.images[0],
      grade: selectedGrade,
      unitPrice: finalUnitPrice,
      quantity,
    });
    toast.success("Agregado al carrito", {
      description: `${product.title} · Grado ${selectedGrade} × ${quantity}`,
      duration: 2500,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-4 lg:py-8">
      {/* Botón volver */}
      <Link
        href="/coleccion"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors mb-3"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Volver al catálogo
      </Link>

      {/* Breadcrumbs */}
      <BreadcrumbsDeluxe items={[
        { name: "Inicio", href: "/" },
        { name: product.category, href: `/categoria/${product.category === "iPad" ? "ipads" : product.category === "MacBook" ? "macbooks" : "laptops"}` },
        { name: product.title.substring(0, 30) + "..." },
      ]} />

      {/* Grid principal: 40% galería / 60% info */}
      <div className="grid lg:grid-cols-[40%_1fr] gap-6 lg:gap-10 mt-4">
        {/* COLUMNA IZQUIERDA: Galería sticky */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GalleryPremium
            images={product.images}
            productName={product.title}
            isFavorite={favorite}
            onToggleFavorite={() => setFavorite((v) => !v)}
          />
        </div>

        {/* COLUMNA DERECHA: Info + Buy Box */}
        <div className="space-y-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-flex items-center rounded-full bg-[#1D1D1F] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                {product.brand}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#F5F5F7] border border-[#E5E5E7] px-2 py-0.5 text-[10px] font-medium text-[#1D1D1F]">
                {product.condition}
              </span>
              {product.color && <span className="text-[11px] text-[#86868B]">· {product.color}</span>}
            </div>

            <h1 className="text-[22px] lg:text-[32px] font-bold tracking-tight leading-tight text-[#1D1D1F]">
              {product.title}
            </h1>
            <p className="mt-1 text-[13px] lg:text-[15px] text-[#86868B]">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(product.rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#E5E5E7]"}`} strokeWidth={1.5} />
                ))}
              </div>
              <span className="text-[12px] font-medium text-[#1D1D1F]">{product.rating.toFixed(1)}</span>
              <span className="text-[12px] text-[#86868B]">({product.reviewCount} opiniones)</span>
              <span className="text-[#E5E5E7]">·</span>
              <span className="text-[12px] text-[#86868B]">{product.soldCount} vendidos</span>
            </div>
          </div>

          {/* BUY BOX — precio dominante */}
          <div className="rounded-3xl bg-gradient-to-br from-[#FFFBEB] via-[#FFFDF7] to-white border border-[#D4AF37]/20 p-5 shadow-[0_4px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium">
                  Precio Deluxe · Grado {selectedGrade}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-[32px] lg:text-[40px] font-bold tracking-tight text-[#1D1D1F] leading-none">
                    {formatPEN(finalUnitPrice)}
                  </span>
                  {savings > 0 && (
                    <span className="text-[13px] text-[#86868B] line-through">{formatPEN(product.basePrice)}</span>
                  )}
                </div>
                <p className="text-[11px] text-[#86868B] mt-1">
                  O 12 cuotas de {formatPEN(Math.round(finalUnitPrice / 12))} · Mercado Pago
                </p>
              </div>
              {savings > 0 && (
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-[#10B981]/10 px-2 py-1 text-[11px] font-bold text-[#10B981]">
                    Ahorras {formatPEN(savings)}
                  </span>
                </div>
              )}
            </div>

            {/* Stock + envío */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#D4AF37]/10">
              <span className="flex items-center gap-1 text-[11px] text-[#10B981] font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} /> En stock
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#86868B]">
                <Truck className="h-3.5 w-3.5" strokeWidth={1.5} /> Envío 24-48h Lima
              </span>
              <span className="flex items-center gap-1 text-[11px] text-[#86868B]">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> {currentGrade.warranty}
              </span>
            </div>
          </div>

          {/* Selector de Grado */}
          <GradeSelectorPremium
            grades={product.grades}
            selected={selectedGrade}
            onSelect={setSelectedGrade}
          />

          {/* Cantidad + CTAs */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-2xl bg-[#F5F5F7] p-1.5">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white transition-colors" aria-label="Disminuir">
                <Minus className="h-4 w-4 text-[#1D1D1F]" strokeWidth={2} />
              </button>
              <span className="w-8 text-center text-[15px] font-bold text-[#1D1D1F]">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(9, q + 1))} className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white transition-colors" aria-label="Aumentar">
                <Plus className="h-4 w-4 text-[#1D1D1F]" strokeWidth={2} />
              </button>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium leading-none">Total</p>
              <p className="text-[18px] font-bold text-[#1D1D1F] leading-tight">{formatPEN(finalTotal)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white hover:bg-[#1D1D1F]/90 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              Agregar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-4 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_-2px_rgba(212,175,55,0.4)]"
            >
              <Zap className="h-4 w-4" strokeWidth={1.5} />
              Comprar ahora
            </motion.button>
          </div>

          <a
            href={`https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20quiero%20el%20${encodeURIComponent(product.title)}%20Grado%20${selectedGrade}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-[#25D366]/30 bg-[#25D366]/5 px-4 py-3 text-[13px] font-semibold text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Consultar por WhatsApp VIP
          </a>

          {/* Confianza */}
          <TrustSection />

          {/* Highlights */}
          <div className="rounded-2xl bg-[#F5F5F7] p-5">
            <h3 className="text-[14px] font-semibold text-[#1D1D1F] mb-3">¿Por qué amarán este {product.category}?</h3>
            <ul className="space-y-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" strokeWidth={2} />
                  </span>
                  <span className="text-[13px] text-[#1D1D1F] leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <h3 className="text-[14px] font-semibold text-[#1D1D1F]">Descripción</h3>
            <p className="text-[13px] text-[#1D1D1F]/80 leading-relaxed">{product.description}</p>
          </div>

          {/* En la caja */}
          <div className="rounded-2xl border border-[#E5E5E7] p-4">
            <h3 className="text-[13px] font-semibold text-[#1D1D1F] mb-2">En la caja Deluxe</h3>
            <ul className="grid sm:grid-cols-2 gap-1.5">
              {product.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[12px] text-[#1D1D1F]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ficha técnica accordion */}
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
            <h3 className="text-[14px] font-semibold text-[#1D1D1F] mb-2">Ficha técnica</h3>
            <SpecsAccordion specs={product.specs} />
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <RelatedCarousel products={related} />

      {/* CTA inferior */}
      <section className="mt-10 rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-8 text-center">
        <h2 className="text-[18px] lg:text-[20px] font-bold text-white">¿Tienes dudas sobre este equipo?</h2>
        <p className="text-[13px] text-white/60 mt-1">Te asesoramos por WhatsApp sin compromiso</p>
        <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-[#1D1D1F]">
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp VIP
        </a>
      </section>

      {/* Mobile sticky bar */}
      <MobileStickyBar
        product={product}
        selectedGrade={selectedGrade}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

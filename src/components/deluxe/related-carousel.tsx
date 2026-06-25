"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatPEN, type Product } from "@/data/products";
import { Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

/**
 * RelatedCarousel — Carousel de productos relacionados con Embla.
 * Swipe nativo en mobile, botones en desktop.
 */
export function RelatedCarousel({ products, title = "También te puede gustar" }: { products: Product[]; title?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    // Initial update on next tick
    const id = requestAnimationFrame(updateButtons);
    return () => {
      cancelAnimationFrame(id);
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] lg:text-[22px] font-bold tracking-tight text-[var(--text-primary)]">{title}</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] disabled:opacity-30 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] disabled:opacity-30 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3 lg:gap-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/producto/${p.slug}`}
              className="group flex-shrink-0 w-[160px] sm:w-[200px] lg:w-[240px]"
            >
              <div className="aspect-square overflow-hidden rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] group-hover:border-[#D4AF37]/30 transition-colors">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-[12px] lg:text-[13px] font-semibold text-[var(--text-primary)] line-clamp-2 leading-tight">{p.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[14px] lg:text-[16px] font-bold text-[var(--text-primary)]">{formatPEN(p.basePrice)}</span>
                <span className="flex items-center gap-0.5 text-[10px] text-[var(--text-secondary)]">
                  <Star className="h-2.5 w-2.5 fill-[#D4AF37] text-[#D4AF37]" strokeWidth={1.5} />
                  {p.rating.toFixed(1)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

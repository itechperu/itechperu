"use client";

import { useState } from "react";
import { Expand, Heart, Share2 } from "lucide-react";
import { LightboxDeluxe } from "./lightbox-deluxe";

interface ProductGalleryDeluxeProps {
  images: string[];
  productName: string;
  isFavorite?: boolean;
}

/**
 * Galería de producto Deluxe — itechperu.shop
 * - Imagen principal grande con esquinas redondeadas
 * - Thumbnail strip inferior para navegación
 * - Botón flotante "Expand" para abrir Lightbox
 * - Botones de favorito y compartir
 */
export function ProductGalleryDeluxe({
  images,
  productName,
  isFavorite = false,
}: ProductGalleryDeluxeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <>
      <div className="relative">
        {/* Imagen principal */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full aspect-square overflow-hidden rounded-3xl bg-[#F5F5F7] shadow-[0_8px_30px_rgb(0,0,0,0.04)] tap-scale focus-ring-deluxe"
          aria-label={`Abrir visor de imágenes de ${productName}`}
        >
          <img
            src={images[activeIndex]}
            alt={`${productName} — vista principal`}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            draggable={false}
          />

          {/* Overlay gradient sutil */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />

          {/* Botón Expand flotante */}
          <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-md border border-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Expand className="h-4 w-4 text-[#1D1D1F]" strokeWidth={1.5} />
          </div>

          {/* Contador de imágenes */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1">
            <span className="text-[10px] font-medium text-white">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </button>

        {/* Botones de acción flotantes (Favorito / Compartir) */}
        <div className="absolute -bottom-3 left-3 flex items-center gap-2">
          <button
            onClick={() => setFavorite((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] tap-scale transition-all duration-300 ${
              favorite
                ? "bg-[#D4AF37]"
                : "bg-white/80 hover:bg-white"
            }`}
            aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-pressed={favorite}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                favorite ? "text-white fill-white" : "text-[#1D1D1F]"
              }`}
              strokeWidth={1.5}
            />
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] tap-scale hover:bg-white transition-all duration-300"
            aria-label="Compartir producto"
          >
            <Share2 className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 h-16 w-16 overflow-hidden rounded-2xl border-2 transition-all duration-300 tap-scale ${
              i === activeIndex
                ? "border-[#D4AF37] shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
            aria-label={`Ver imagen ${i + 1}`}
            aria-pressed={i === activeIndex}
          >
            <img
              src={src}
              alt={`${productName} — miniatura ${i + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Lightbox a pantalla completa */}
      {lightboxOpen && (
        <LightboxDeluxe
          images={images}
          initialIndex={activeIndex}
          productName={productName}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

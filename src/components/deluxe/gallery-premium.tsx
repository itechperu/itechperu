"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Expand, CheckCircle2 } from "lucide-react";

interface GalleryPremiumProps {
  images: string[];
  productName: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

/**
 * GalleryPremium — Galería nivel Apple Store / BackMarket.
 *
 * Lightbox: yet-another-react-lightbox con:
 *  - Zoom (rueda mouse + pinch mobile)
 *  - Fullscreen
 *  - Thumbnails inferiores
 *  - Captions
 *  - Keyboard navigation (←/→/Esc)
 *  - Flechas laterales
 *  - Preload imágenes
 *  - Transición suave
 *
 * Galería principal:
 *  - Next Image con priority
 *  - Thumbnails verticales (desktop) / horizontales (mobile)
 *  - Badge GRADO A+
 *  - Favorito + compartir
 */
export function GalleryPremium({
  images,
  productName,
  isFavorite = false,
  onToggleFavorite,
}: GalleryPremiumProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleFav = () => {
    setFavorite((v) => !v);
    onToggleFavorite?.();
  };

  // Slides para el lightbox
  const slides = images.map((img, i) => ({
    src: img,
    alt: `${productName} — imagen ${i + 1}`,
    title: `${productName} — Imagen ${i + 1} de ${images.length}`,
  }));

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:sticky lg:top-24">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar lg:max-h-[500px]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                i === activeIndex
                  ? "border-[#D4AF37] shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} — miniatura ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="relative flex-1">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[var(--bg-secondary)] cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={images[activeIndex]}
              alt={`${productName} — imagen principal`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized
            />

            {/* Expand hint */}
            <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand className="h-4 w-4 text-[var(--text-primary)]" strokeWidth={1.5} />
            </div>

            {/* Badge Grado A+ */}
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#1D1D1F]/90 backdrop-blur-md px-2.5 py-1">
              <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" strokeWidth={2} />
              <span className="text-[10px] font-bold text-white tracking-wide">GRADO A+</span>
            </div>

            {/* Contador */}
            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1">
              <span className="text-[10px] font-medium text-white">{activeIndex + 1} / {images.length}</span>
            </div>
          </motion.div>

          {/* Acciones flotantes */}
          <div className="absolute -bottom-3 left-3 flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleFav}
              className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-lg transition-all ${
                favorite ? "bg-[#D4AF37]" : "bg-[var(--bg-primary)]/80 hover:bg-[var(--bg-primary)]"
              }`}
              aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart className={`h-5 w-5 transition-all ${favorite ? "text-white fill-white" : "text-[var(--text-primary)]"}`} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-primary)]/80 backdrop-blur-md border border-white/40 shadow-lg hover:bg-[var(--bg-primary)] transition-all"
              aria-label="Compartir"
            >
              <Share2 className="h-5 w-5 text-[var(--text-primary)]" strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Lightbox premium */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={activeIndex}
        slides={slides}
        plugins={[Zoom, Fullscreen, Thumbnails, Captions]}
        zoom={{
          maxZoomPixelRatio: 5,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 80,
          border: 2,
          borderRadius: 12,
          padding: 4,
          gap: 8,
        }}
        carousel={{
          preload: 2,
          finite: true,
        }}
        animation={{
          fade: 300,
          swipe: 500,
          easing: {
            fade: "ease-out",
            swipe: "ease-out",
            navigation: "ease-out",
          },
        }}
        render={{
          iconZoomIn: () => <span className="text-white text-[20px]">+</span>,
          iconZoomOut: () => <span className="text-white text-[20px]">−</span>,
          iconFullscreen: () => <span className="text-white text-[16px]">⛶</span>,
          iconClose: () => <span className="text-white text-[20px]">✕</span>,
          iconPrev: () => <span className="text-white text-[24px]">‹</span>,
          iconNext: () => <span className="text-white text-[24px]">›</span>,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
        on={{
          click: () => {},
          view: (index) => setActiveIndex(index.index),
        }}
      />
    </>
  );
}

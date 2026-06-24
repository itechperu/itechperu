"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Expand, CheckCircle2 } from "lucide-react";
import "react-photo-view/dist/react-photo-view.css";

interface GalleryPremiumProps {
  images: string[];
  productName: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

/**
 * GalleryPremium — Galería nivel Apple Store / BackMarket.
 *
 * Features:
 *  - Next Image con blur placeholder
 *  - react-photo-view para zoom real + fullscreen
 *  - Thumbnails verticales (desktop) / horizontales (mobile)
 *  - Lazy loading + preload
 *  - Badges flotantes (Grado A+, favorito, compartir)
 *  - Animaciones suaves al cambiar imagen
 */
export function GalleryPremium({
  images,
  productName,
  isFavorite = false,
  onToggleFavorite,
}: GalleryPremiumProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFav = () => {
    setFavorite((v) => !v);
    onToggleFavorite?.();
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:sticky lg:top-24">
      {/* Thumbnails — verticales en desktop, horizontales en mobile */}
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
        <PhotoProvider
          maskOpacity={0.9}
          maskClassName="backdrop-blur-xl"
          toolbarRender={({ onScale, scale, rotate, onRotate }) => (
            <div className="flex items-center gap-3">
              <button onClick={() => onScale(scale - 0.5)} className="text-white p-2 hover:bg-white/10 rounded-full" aria-label="Zoom out">−</button>
              <button onClick={() => onScale(scale + 0.5)} className="text-white p-2 hover:bg-white/10 rounded-full" aria-label="Zoom in">+</button>
              <button onClick={() => onRotate(rotate + 90)} className="text-white p-2 hover:bg-white/10 rounded-full" aria-label="Rotar">↻</button>
            </div>
          )}
        >
          <PhotoView src={images[activeIndex]}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0.3, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F5F5F7] cursor-zoom-in group"
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
              <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="h-4 w-4 text-[#1D1D1F]" strokeWidth={1.5} />
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
          </PhotoView>
        </PhotoProvider>

        {/* Acciones flotantes */}
        <div className="absolute -bottom-3 left-3 flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFav}
            className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md border border-white/40 shadow-lg transition-all ${
              favorite ? "bg-[#D4AF37]" : "bg-white/80 hover:bg-white"
            }`}
            aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart className={`h-5 w-5 transition-all ${favorite ? "text-white fill-white" : "text-[#1D1D1F]"}`} strokeWidth={1.5} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white transition-all"
            aria-label="Compartir"
          >
            <Share2 className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxDeluxeProps {
  images: string[];
  initialIndex: number;
  productName: string;
  onClose: () => void;
}

/**
 * Módulo Lightbox Táctil Premium — itechperu.shop
 * - Visor a pantalla completa con fondo negro puro (bg-black)
 * - Deslizamiento lateral nativo con transiciones ultra suaves
 * - Soporte táctil (touch events) para móvil
 * - Navegación por teclado (←/→/Esc)
 * - Indicador de posición minimalista
 */
export function LightboxDeluxe({
  images,
  initialIndex,
  productName,
  onClose,
}: LightboxDeluxeProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isClosing, setIsClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  const goTo = useCallback(
    (idx: number) => {
      const clamped = ((idx % images.length) + images.length) % images.length;
      setCurrentIndex(clamped);
    },
    [images.length]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Bloquear scroll del body mientras el lightbox está abierto
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Navegación por teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, goNext, goPrev]);

  // Touch handlers para swipe nativo
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    touchDeltaX.current = delta;
    setDragOffset(delta);
  };

  const onTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      goNext();
    } else if (touchDeltaX.current > threshold) {
      goPrev();
    }
    setDragOffset(0);
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de imágenes de ${productName}`}
    >
      {/* Header minimalista del lightbox */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-safe pt-4 pb-2 bg-gradient-to-b from-black/60 to-transparent">
        <span className="text-[12px] font-medium text-white/80">
          {currentIndex + 1} <span className="text-white/40">/</span> {images.length}
        </span>
        <button
          onClick={handleClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 tap-scale"
          aria-label="Cerrar visor"
        >
          <X className="h-5 w-5 text-white" strokeWidth={1.5} />
        </button>
      </div>

      {/* Track de imágenes deslizable */}
      <div
        className="flex h-full items-center overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full items-center transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transitionDuration: dragOffset === 0 ? "500ms" : "0ms",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-full w-full flex-shrink-0 flex items-center justify-center px-4"
            >
              <img
                src={src}
                alt={`${productName} — imagen ${i + 1} de ${images.length}`}
                className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botones laterales (desktop) */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors tap-scale"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-6 w-6 text-white" strokeWidth={1.5} />
      </button>
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors tap-scale"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-6 w-6 text-white" strokeWidth={1.5} />
      </button>

      {/* Dots indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pb-safe">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-[#D4AF37]"
                : "w-1.5 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

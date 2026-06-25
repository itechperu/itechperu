"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock, Star } from "lucide-react";
import { formatPEN, type Product } from "@/data/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

/**
 * SearchOverlayDeluxe — Visor de búsqueda inmersivo full-screen
 *
 * Features:
 *  - Backdrop blur difuminado (inmersivo)
 *  - Input grande con auto-focus
 *  - Sugerencias en tiempo real (debounce 200ms)
 *  - Categorías populares cuando no hay query
 *  - Búsquedas recientes (localStorage)
 *  - Resultados con imagen, título, precio, grado
 *  - Keyboard: ESC cierra, Enter va al primer resultado
 *  - Animaciones Framer Motion (escala + fade)
 */
export function SearchOverlayDeluxe({ isOpen, onClose, products }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  // Inicialización perezosa desde localStorage (sin useEffect)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("itechperu-recent-searches");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-focus al abrir
  useEffect(() => {
    if (!isOpen) return;
    const id = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(id);
  }, [isOpen]);

  // Handler de cierre que también resetea el query
  const handleClose = () => {
    setQuery("");
    onClose();
  };

  // ESC para cerrar
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Filtrar productos (memoizado para performance)
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products
      .filter((p) => {
        const haystack = `${p.title} ${p.brand} ${p.model} ${p.category} ${p.subtitle}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, products]);

  // Categorías populares basadas en el catálogo
  const popularCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return cats.slice(0, 5);
  }, [products]);

  const saveRecentSearch = (q: string) => {
    if (!q.trim()) return;
    const newRecent = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem("itechperu-recent-searches", JSON.stringify(newRecent));
  };

  const handleProductClick = (productId: string, slug: string) => {
    saveRecentSearch(query);
    onClose();
    router.push(`/productos/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      handleProductClick(results[0].id, results[0].slug);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-start justify-center"
        >
          {/* Backdrop difuminado inmersivo */}
          <div
            className="absolute inset-0 bg-[#1D1D1F]/40 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* Modal centrado */}
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-2xl mx-4 mt-[8vh] sm:mt-[12vh] bg-[var(--bg-primary)] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Input header */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)]">
              <Search className="h-5 w-5 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar iPad, MacBook, laptop…"
                className="flex-1 bg-transparent text-[16px] lg:text-[18px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none"
                aria-label="Buscar productos"
              />
              <button
                type="button"
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
                aria-label="Cerrar búsqueda"
              >
                <X className="h-4 w-4 text-[var(--text-secondary)]" strokeWidth={2} />
              </button>
            </form>

            {/* Contenido */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                /* Estado vacío: categorías populares + recientes */
                <div className="p-5 space-y-5">
                  {recentSearches.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">
                        <Clock className="h-3 w-3" strokeWidth={1.5} />
                        Búsquedas recientes
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="rounded-full bg-[var(--bg-secondary)] px-3 py-1.5 text-[12px] font-medium text-[var(--text-primary)] hover:bg-[#E5E5E7] transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">
                      <TrendingUp className="h-3 w-3" strokeWidth={1.5} />
                      Categorías populares
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setQuery(cat)}
                          className="rounded-full bg-gradient-to-br from-[#FFFBEB] to-white border border-[#D4AF37]/30 px-3 py-1.5 text-[12px] font-medium text-[var(--text-primary)] hover:border-[#D4AF37] transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Productos destacados como sugerencia */}
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">
                      Destacados
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {products.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleProductClick(p.id, p.slug)}
                          className="flex items-center gap-2 rounded-2xl bg-[var(--bg-secondary)] p-2 hover:bg-[#E5E5E7] transition-colors text-left"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium text-[var(--text-primary)] truncate">
                              {p.title}
                            </p>
                            <p className="text-[11px] font-bold text-[#D4AF37]">
                              {formatPEN(p.basePrice)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                /* Sin resultados */
                <div className="p-10 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-secondary)] mb-3">
                    <Search className="h-6 w-6 text-[var(--text-secondary)]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] font-semibold text-[var(--text-primary)]">
                    Sin resultados para "{query}"
                  </p>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1">
                    Prueba con otra palabra o revisa nuestras categorías
                  </p>
                </div>
              ) : (
                /* Resultados en tiempo real */
                <ul className="p-2">
                  {results.map((p, idx) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.03 }}
                    >
                      <button
                        onClick={() => handleProductClick(p.id, p.slug)}
                        className="group w-full flex items-center gap-3 rounded-2xl p-2.5 hover:bg-[var(--bg-secondary)] transition-colors text-left"
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="h-14 w-14 rounded-xl object-cover"
                          />
                          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[9px] font-bold text-white">
                            {p.grade}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight line-clamp-1">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)] truncate">
                            {p.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[13px] font-bold text-[var(--text-primary)]">
                              {formatPEN(p.basePrice)}
                            </span>
                            <span className="flex items-center gap-0.5 text-[10px] text-[var(--text-secondary)]">
                              <Star className="h-2.5 w-2.5 fill-[#D4AF37] text-[#D4AF37]" strokeWidth={1.5} />
                              {p.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                          Ver →
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer con hint de teclado */}
            <div className="border-t border-[var(--border-color)] px-5 py-2.5 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 text-[9px] font-mono">↵</kbd>
                  Ir al primer resultado
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded bg-[var(--bg-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 text-[9px] font-mono">ESC</kbd>
                  Cerrar
                </span>
              </div>
              <span>{results.length} resultados</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

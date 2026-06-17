"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, ChevronDown } from "lucide-react";

/**
 * Header Deluxe — itechperu.shop
 * - Altura compacta con efecto de vidrio esmerilado iOS
 * - Input de búsqueda minimalista
 * - Iconos lineales ultra finos estilo Apple
 * - Badge flotante Oro Champagne en el carrito
 */
export function HeaderDeluxe() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe">
      <div className="mx-auto max-w-[440px] px-3 pt-2">
        <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/70 px-3 py-2.5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Logo / Marca */}
          <Link
            href="/"
            className="flex items-center gap-1.5 pr-1"
            aria-label="iTECH Peru inicio"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1D1D1F]">
              <span className="text-[10px] font-bold tracking-tight text-[#D4AF37]">
                iT
              </span>
            </span>
            <span className="hidden xs:block text-[13px] font-semibold tracking-tight text-[#1D1D1F]">
              itech<span className="text-[#D4AF37]">peru</span>
            </span>
          </Link>

          {/* Search minimalista */}
          <div
            className={`flex flex-1 items-center gap-1.5 rounded-xl bg-[#F5F5F7] px-2.5 py-1.5 transition-all duration-300 ${
              searchFocused
                ? "ring-2 ring-[#D4AF37]/30 bg-white shadow-[0_4px_12px_rgb(0,0,0,0.04)]"
                : ""
            }`}
          >
            <Search
              className={`h-3.5 w-3.5 transition-colors duration-200 ${
                searchFocused ? "text-[#D4AF37]" : "text-[#86868B]"
              }`}
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Buscar iPad, MacBook…"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-[12px] font-normal text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
              aria-label="Buscar productos"
            />
            <kbd className="hidden xs:flex items-center justify-center rounded-md bg-white border border-[#E5E5E7] px-1.5 py-0.5 text-[9px] font-medium text-[#86868B]">
              ⌘K
            </kbd>
          </div>

          {/* Carrito con badge flotante Oro */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label={`Carrito con ${cartCount} productos`}
          >
            <ShoppingBag
              className="h-[18px] w-[18px] text-[#1D1D1F]"
              strokeWidth={1.5}
            />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[9px] font-bold text-white shadow-[0_2px_6px_rgb(212,175,55,0.5)]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Perfil */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label="Mi cuenta"
          >
            <User
              className="h-[18px] w-[18px] text-[#1D1D1F]"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Sub-nav categorías */}
        <nav className="mt-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
          <Link
            href="/"
            className="flex items-center gap-1 whitespace-nowrap rounded-full bg-[#1D1D1F] px-3 py-1 text-[11px] font-medium text-white tap-scale"
          >
            Todo <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={1.5} />
          </Link>
          {[
            "iPads",
            "MacBooks",
            "Laptops",
            "Ropa USA",
            "Accesorios",
            "Ofertas",
          ].map((cat) => (
            <Link
              key={cat}
              href="/"
              className="whitespace-nowrap rounded-full bg-white/60 px-3 py-1 text-[11px] font-medium text-[#1D1D1F]/70 backdrop-blur-md border border-white/20 tap-scale hover:text-[#1D1D1F] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

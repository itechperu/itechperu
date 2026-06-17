"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, User, ChevronDown, Heart, LayoutGrid, SlidersHorizontal, MessageCircle, Menu, X } from "lucide-react";

/**
 * Header Deluxe — itechperu.shop (100% responsivo)
 *
 * Breakpoints:
 *  - Mobile (< sm, 640px): header flotante compacto con búsqueda, carrito y perfil.
 *    Categorías en sub-nav horizontal scrollable.
 *  - Tablet (sm..lg, 640-1024px): header full-width con más espacio, kbd ⌘K visible.
 *  - Desktop (≥ lg, 1024px): header con logo + nav principal inline + search ancho fijo.
 *    El bottom tab bar desaparece en desktop.
 */
export function HeaderDeluxe() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  const categories = ["iPads", "MacBooks", "Laptops", "Ropa USA", "Accesorios", "Ofertas"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe">
      {/* ====== FILA SUPERIOR: Logo + Search + Acciones ====== */}
      <div className="px-3 sm:px-4 lg:px-8 pt-2">
        <div className="mx-auto max-w-[440px] sm:max-w-3xl lg:max-w-7xl flex items-center gap-2 lg:gap-4 rounded-2xl border border-white/20 bg-white/70 px-3 lg:px-5 py-2.5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 lg:gap-2 flex-shrink-0"
            aria-label="iTECH Peru inicio"
          >
            <span className="flex h-7 w-7 lg:h-9 lg:w-9 items-center justify-center rounded-lg bg-[#1D1D1F]">
              <span className="text-[10px] lg:text-[12px] font-bold tracking-tight text-[#D4AF37]">
                iT
              </span>
            </span>
            <span className="text-[13px] lg:text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
              itech<span className="text-[#D4AF37]">peru</span>
              <span className="hidden lg:inline text-[10px] font-normal text-[#86868B] ml-1">.shop</span>
            </span>
          </Link>

          {/* Navegación principal en desktop */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="#catalogo"
              className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors"
            >
              Ofertas
            </Link>
            <Link
              href="#"
              className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-colors"
            >
              Garantía
            </Link>
          </nav>

          {/* Search */}
          <div
            className={`flex flex-1 items-center gap-1.5 rounded-xl bg-[#F5F5F7] px-2.5 py-1.5 lg:py-2 transition-all duration-300 ${
              searchFocused
                ? "ring-2 ring-[#D4AF37]/30 bg-white shadow-[0_4px_12px_rgb(0,0,0,0.04)]"
                : ""
            }`}
          >
            <Search
              className={`h-3.5 w-3.5 lg:h-4 lg:w-4 transition-colors duration-200 ${
                searchFocused ? "text-[#D4AF37]" : "text-[#86868B]"
              }`}
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Buscar iPad, MacBook…"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent text-[12px] lg:text-[13px] font-normal text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
              aria-label="Buscar productos"
            />
            <kbd className="hidden sm:flex items-center justify-center rounded-md bg-white border border-[#E5E5E7] px-1.5 py-0.5 text-[9px] font-medium text-[#86868B]">
              ⌘K
            </kbd>
          </div>

          {/* Acciones: Favoritos (desktop) */}
          <button
            className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label="Favoritos"
          >
            <Heart className="h-[18px] w-[18px] text-[#1D1D1F]" strokeWidth={1.5} />
          </button>

          {/* Carrito */}
          <button
            className="relative flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label={`Carrito con ${cartCount} productos`}
          >
            <ShoppingBag
              className="h-[18px] w-[18px] lg:h-5 lg:w-5 text-[#1D1D1F]"
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
            className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label="Mi cuenta"
          >
            <User
              className="h-[18px] w-[18px] lg:h-5 lg:w-5 text-[#1D1D1F]"
              strokeWidth={1.5}
            />
          </button>

          {/* Botón menú móvil (hamburguesa) */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Sub-nav categorías (mobile + tablet) */}
        <nav className="mt-1.5 lg:hidden flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[440px] sm:max-w-3xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-1 whitespace-nowrap rounded-full bg-[#1D1D1F] px-3 py-1 text-[11px] font-medium text-white tap-scale"
          >
            Todo <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={1.5} />
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href="/"
              className="whitespace-nowrap rounded-full bg-white/60 px-3 py-1 text-[11px] font-medium text-[#1D1D1F]/70 backdrop-blur-md border border-white/20 tap-scale hover:text-[#1D1D1F] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Categorías en desktop: barra horizontal elegante */}
        <nav className="hidden lg:flex mt-2 max-w-7xl mx-auto items-center gap-1.5">
          {categories.map((cat, i) => (
            <Link
              key={cat}
              href="#catalogo"
              className={`whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium transition-colors tap-scale ${
                i === 0
                  ? "bg-[#1D1D1F] text-white"
                  : "bg-white/50 text-[#1D1D1F]/70 hover:bg-white border border-white/20 backdrop-blur-md hover:text-[#1D1D1F]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Menú desplegable móvil (full screen) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 mx-auto max-w-[440px] sm:max-w-3xl rounded-3xl border border-white/40 bg-white/95 backdrop-blur-xl p-4 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.18)]">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Inicio", icon: Home_Icon, href: "/" },
                { label: "Catálogo", icon: LayoutGrid, href: "#catalogo" },
                { label: "Favoritos", icon: Heart, href: "#" },
                { label: "Filtros", icon: SlidersHorizontal, href: "#" },
                { label: "WhatsApp VIP", icon: MessageCircle, href: "https://wa.me/51987654321" },
                { label: "Mi Cuenta", icon: User, href: "#" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-2xl bg-[#F5F5F7] px-3 py-3 text-[13px] font-medium text-[#1D1D1F] tap-scale hover:bg-[#E5E5E7] transition-colors"
                  >
                    <Icon className="h-4 w-4 text-[#1D1D1F]" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Icono Home local para evitar conflictos de import
function Home_Icon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      strokeWidth={strokeWidth ?? 1.5}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5Z" />
    </svg>
  );
}

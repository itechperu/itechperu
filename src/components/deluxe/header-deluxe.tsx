"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, ChevronDown, Heart, LayoutGrid, SlidersHorizontal, MessageCircle, Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useCart } from "@/store/use-cart";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { SearchOverlayDeluxe } from "@/components/search/search-overlay-deluxe";
import { STATIC_PRODUCTS } from "@/data/products";

/**
 * Header Deluxe — itechperu.shop (100% responsivo + Scroll Spy)
 *
 * En desktop, los links de navegación se resaltan automáticamente
 * cuando el usuario hace scroll a la sección correspondiente.
 */
const SECTION_IDS = ["inicio", "ofertas", "catalogo", "categorias", "confianza"];

export function HeaderDeluxe() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evitar hydration mismatch: el contador del carrito solo se lee en cliente
  const cartCount = useCart((s) => s.getTotalItems());
  const openCart = useCart((s) => s.openCart);
  const { data: session } = useSessionDeluxe();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";

  useEffect(() => {
    // Marcar como montado en el próximo tick para sincronizar con persistencia
    // de Zustand (que solo se hidrata en cliente)
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // ⌘K para abrir búsqueda
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll Spy: detecta qué sección está visible
  const { activeId, scrollToId } = useScrollSpy({
    sectionIds: SECTION_IDS,
    updateHash: true,
    smoothScroll: true,
  });

  const categories = ["iPads", "MacBooks", "Laptops", "Ropa USA", "Accesorios", "Ofertas"];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
    setMobileMenuOpen(false);
  };

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
            onClick={(e) => handleNavClick(e, "inicio")}
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

          {/* Navegación principal en desktop — Scroll Spy en home + subpáginas */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {/* Si estamos en home, mostrar scroll spy sections */}
            {isHome ? (
              SECTION_IDS.map((id) => {
                const labels: Record<string, string> = {
                  inicio: "Inicio",
                  ofertas: "Ofertas",
                  catalogo: "Catálogo",
                  categorias: "Categorías",
                  confianza: "Garantía",
                };
                const isActive = activeId === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={`relative px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#1D1D1F] bg-[#F5F5F7]"
                        : "text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
                    }`}
                  >
                    {labels[id]}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[#D4AF37]" />
                    )}
                  </a>
                );
              })
            ) : (
              // En subpáginas, mostrar links a home + páginas principales
              <>
                <Link href="/" className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                  Inicio
                </Link>
                <Link href="/coleccion" className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                  Catálogo
                </Link>
                <Link href="/nosotros" className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                  Nosotros
                </Link>
                <Link href="/garantia" className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                  Garantía
                </Link>
                <Link href="/faq" className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                  FAQ
                </Link>
                <Link href="/contacto" className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all">
                  Contacto
                </Link>
              </>
            )}
          </nav>

          {/* Search — botón que abre overlay inmersivo */}
          <button
            onClick={() => setSearchOpen(true)}
            className={`flex flex-1 items-center gap-1.5 rounded-xl bg-[#F5F5F7] px-2.5 py-1.5 lg:py-2 transition-all duration-300 hover:bg-white hover:ring-2 hover:ring-[#D4AF37]/30 hover:shadow-[0_4px_12px_rgb(0,0,0,0.04)] text-left ${
              searchFocused ? "ring-2 ring-[#D4AF37]/30 bg-white" : ""
            }`}
            aria-label="Buscar productos"
          >
            <Search
              className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#86868B] flex-shrink-0"
              strokeWidth={1.5}
            />
            <span className="flex-1 text-[12px] lg:text-[13px] font-normal text-[#86868B] truncate">
              Buscar iPad, MacBook…
            </span>
            <kbd className="hidden sm:flex items-center justify-center rounded-md bg-white border border-[#E5E5E7] px-1.5 py-0.5 text-[9px] font-medium text-[#86868B]">
              ⌘K
            </kbd>
          </button>

          {/* Acciones: Favoritos (desktop) */}
          <button
            className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label="Favoritos"
          >
            <Heart className="h-[18px] w-[18px] text-[#1D1D1F]" strokeWidth={1.5} />
          </button>

          {/* Carrito */}
          <button
            onClick={openCart}
            className="relative flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale"
            aria-label={`Carrito con ${mounted ? cartCount : 0} productos`}
          >
            <ShoppingBag
              className="h-[18px] w-[18px] lg:h-5 lg:w-5 text-[#1D1D1F]"
              strokeWidth={1.5}
            />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[9px] font-bold text-white shadow-[0_2px_6px_rgb(212,175,55,0.5)]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin link (visible solo si es admin) */}
          {mounted && isAdmin && (
            <Link
              href="/admin"
              className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-colors tap-scale"
              aria-label="Panel de administración"
              title="Panel Admin"
            >
              <LayoutGrid className="h-[18px] text-[#D4AF37]" strokeWidth={1.5} />
            </Link>
          )}

          {/* Perfil — link a /cuenta si logueado, /auth/login si no */}
          <Link
            href={mounted && session?.user ? "/cuenta" : "/auth/login"}
            className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-full hover:bg-[#F5F5F7] transition-colors tap-scale relative"
            aria-label="Mi cuenta"
          >
            {mounted && session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Avatar"}
                className="h-8 w-8 lg:h-9 lg:w-9 rounded-full object-cover"
              />
            ) : (
              <User
                className="h-[18px] w-[18px] lg:h-5 lg:w-5 text-[#1D1D1F]"
                strokeWidth={1.5}
              />
            )}
            {mounted && session?.user && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#10B981] border-2 border-white" />
            )}
          </Link>

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
          {SECTION_IDS.slice(0, 3).map((id, i) => {
            const labels: Record<string, string> = {
              inicio: "Inicio",
              ofertas: "Ofertas",
              catalogo: "Catálogo",
            };
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium transition-colors tap-scale ${
                  i === 0
                    ? "bg-[#1D1D1F] text-white"
                    : activeId === id
                      ? "bg-[#D4AF37] text-white"
                      : "bg-white/60 text-[#1D1D1F]/70 backdrop-blur-md border border-white/20 hover:text-[#1D1D1F]"
                }`}
              >
                {labels[id]}
              </a>
            );
          })}
          {categories.slice(3).map((cat) => (
            <a
              key={cat}
              href="#catalogo"
              onClick={(e) => handleNavClick(e, "catalogo")}
              className="whitespace-nowrap rounded-full bg-white/60 px-3 py-1 text-[11px] font-medium text-[#1D1D1F]/70 backdrop-blur-md border border-white/20 tap-scale hover:text-[#1D1D1F] transition-colors"
            >
              {cat}
            </a>
          ))}
        </nav>

        {/* Categorías en desktop: barra horizontal elegante */}
        <nav className="hidden lg:flex mt-2 max-w-7xl mx-auto items-center gap-1.5">
          {categories.map((cat, i) => (
            <a
              key={cat}
              href="#catalogo"
              onClick={(e) => handleNavClick(e, "catalogo")}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium transition-colors tap-scale ${
                i === 0
                  ? "bg-[#1D1D1F] text-white"
                  : "bg-white/50 text-[#1D1D1F]/70 hover:bg-white border border-white/20 backdrop-blur-md hover:text-[#1D1D1F]"
              }`}
            >
              {cat}
            </a>
          ))}
        </nav>

        {/* Menú desplegable móvil (full screen) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 mx-auto max-w-[440px] sm:max-w-3xl rounded-3xl border border-white/40 bg-white/95 backdrop-blur-xl p-4 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.18)]">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Inicio", id: "inicio", icon: Home_Icon },
                { label: "Catálogo", id: "catalogo", icon: LayoutGrid },
                { label: "Ofertas", id: "ofertas", icon: ChevronDown },
                { label: "Categorías", id: "categorias", icon: LayoutGrid },
                { label: "Garantía", id: "confianza", icon: Heart },
                { label: "Mi Cuenta", href: "/auth/login", icon: User },
              ].map((item) => {
                const Icon = item.icon;
                if ("id" in item) {
                  return (
                    <a
                      key={item.label}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="flex items-center gap-2.5 rounded-2xl bg-[#F5F5F7] px-3 py-3 text-[13px] font-medium text-[#1D1D1F] tap-scale hover:bg-[#E5E5E7] transition-colors"
                    >
                      <Icon className="h-4 w-4 text-[#1D1D1F]" strokeWidth={1.5} />
                      {item.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-2xl bg-[#F5F5F7] px-3 py-3 text-[13px] font-medium text-[#1D1D1F] tap-scale hover:bg-[#E5E5E7] transition-colors"
                  >
                    <Icon className="h-4 w-4 text-[#1D1D1F]" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="https://wa.me/51987654321"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-3 py-3 text-[13px] font-semibold text-white tap-scale"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                WhatsApp VIP
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Search Overlay inmersivo */}
      <SearchOverlayDeluxe
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={STATIC_PRODUCTS}
      />
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

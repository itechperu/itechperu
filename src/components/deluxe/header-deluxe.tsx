"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, User, Heart, LayoutGrid, Menu, X } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { SearchOverlayDeluxe } from "@/components/search/search-overlay-deluxe";
import { ThemeToggle } from "@/components/deluxe/theme-toggle";
import { STATIC_PRODUCTS } from "@/data/products";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/categorias", label: "Categorías" },
  { href: "/garantia", label: "Garantía" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

/**
 * HeaderDeluxe — Header global único, idéntico en todas las páginas.
 *
 * Modo claro: fondo blanco, texto negro, border bottom sutil
 * Modo oscuro: fondo negro, texto blanco, border bottom sutil
 * NUNCA transparente — el logo SIEMPRE visible
 * Solo rutas reales (cero hash routing)
 */
export function HeaderDeluxe() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartCount = useCart((s) => s.getTotalItems());
  const openCart = useCart((s) => s.openCart);
  const { data: session } = useSessionDeluxe();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isHome = pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-[0_2px_20px_var(--shadow-color)]"
            : "bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo — SIEMPRE visible */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group" aria-label="iTECH Peru inicio">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl bg-[#1D1D1F]"
              >
                <span className="text-[12px] font-bold tracking-tight text-[#D4AF37]">iT</span>
              </motion.span>
              <span className="text-[16px] lg:text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                itech<span className="text-[#D4AF37]">peru</span>
              </span>
            </Link>

            {/* Navegación desktop — solo rutas reales */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[14px] font-medium transition-colors rounded-full ${
                      active
                        ? "text-[#D4AF37] bg-[#D4AF37]/10"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#D4AF37]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                aria-label="Buscar"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              <ThemeToggle />

              <Link
                href="/cuenta/favoritos"
                className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                aria-label="Favoritos"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Link>

              {mounted && isAdmin && (
                <Link
                  href="/admin"
                  className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-colors"
                  aria-label="Admin"
                >
                  <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </Link>
              )}

              <button
                onClick={openCart}
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                aria-label={`Carrito con ${mounted ? cartCount : 0} productos`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
                <AnimatePresence>
                  {mounted && cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[9px] font-bold text-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href={mounted && session?.user ? "/cuenta" : "/auth/login"}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors relative"
                aria-label="Mi cuenta"
              >
                {mounted && session?.user?.image ? (
                  <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
                )}
                {mounted && session?.user && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#10B981] border-2 border-[var(--bg-primary)]" />
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors"
                aria-label="Menú"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menú móvil full-screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[var(--bg-primary)] flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
                <span className="text-[16px] font-semibold tracking-tight text-[var(--text-primary)]">
                  itech<span className="text-[#D4AF37]">peru</span>
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)]"
                    aria-label="Cerrar"
                  >
                    <X className="h-5 w-5 text-[var(--text-primary)]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-[16px] font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-[var(--bg-secondary)] text-[#D4AF37]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {mounted && session?.user && (
                  <Link href="/cuenta" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-2xl text-[16px] font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
                    Mi Cuenta
                  </Link>
                )}
                {mounted && isAdmin && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-2xl text-[16px] font-medium text-[#D4AF37] hover:bg-[#D4AF37]/10">
                    Panel Admin
                  </Link>
                )}
              </nav>

              <div className="p-5 border-t border-[var(--border-color)]">
                <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-4 py-3 text-[14px] font-semibold text-white">
                  WhatsApp VIP
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlayDeluxe isOpen={searchOpen} onClose={() => setSearchOpen(false)} products={STATIC_PRODUCTS} />
    </>
  );
}

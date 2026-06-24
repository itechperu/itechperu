"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag, User, Heart, LayoutGrid, Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useCart } from "@/store/use-cart";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { SearchOverlayDeluxe } from "@/components/search/search-overlay-deluxe";
import { STATIC_PRODUCTS } from "@/data/products";

const SECTION_IDS = ["inicio", "ofertas", "catalogo", "categorias", "confianza"];

/**
 * HeaderDeluxe — Header full-bleed inmersivo ultra pro.
 *
 * Diseño:
 *  - Transparente al inicio (sobre hero oscuro)
 *  - Se vuelve glass al hacer scroll (backdrop-blur + bg white/80)
 *  - Sin bloques genéricos — todo flotante, limpio, premium
 *  - Navegación minimalista en desktop
 *  - Menú hamburguesa full-screen en mobile
 *  - Scroll spy solo en home
 *  - Subpáginas: links directos
 */
export function HeaderDeluxe() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartCount = useCart((s) => s.getTotalItems());
  const openCart = useCart((s) => s.openCart);
  const { data: session } = useSessionDeluxe();
  const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "SUPER_ADMIN";

  // Detectar scroll para cambiar estilo del header
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
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

  // Scroll Spy solo en home — SIN hash routing (no actualiza URL)
  const { activeId, scrollToId } = useScrollSpy({
    sectionIds: SECTION_IDS,
    updateHash: false, // NUNCA actualizar URL con #
    smoothScroll: false, // Lenis maneja el smooth scroll
  });

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = isHome
    ? [
        { id: "inicio", label: "Inicio" },
        { id: "ofertas", label: "Ofertas" },
        { id: "catalogo", label: "Catálogo" },
        { id: "categorias", label: "Categorías" },
        { id: "confianza", label: "Garantía" },
      ]
    : [
        { href: "/", label: "Inicio" },
        { href: "/coleccion", label: "Catálogo" },
        { href: "/nosotros", label: "Nosotros" },
        { href: "/garantia", label: "Garantía" },
        { href: "/preguntas-frecuentes", label: "FAQ" },
        { href: "/contacto", label: "Contacto" },
      ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[#E5E5E7]/50 shadow-[0_4px_30px_rgb(0,0,0,0.03)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 flex-shrink-0 group"
              aria-label="iTECH Peru inicio"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl transition-colors ${
                  scrolled ? "bg-[#1D1D1F]" : "bg-white/10 backdrop-blur-md border border-white/20"
                }`}
              >
                <span className={`text-[12px] font-bold tracking-tight ${scrolled ? "text-[#D4AF37]" : "text-white"}`}>
                  iT
                </span>
              </motion.span>
              <span className={`text-[16px] lg:text-[18px] font-semibold tracking-tight transition-colors ${scrolled ? "text-[#1D1D1F]" : "text-white"}`}>
                itech<span className="text-[#D4AF37]">peru</span>
              </span>
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {isHome ? (
                navLinks.map((link) => {
                  const isActive = activeId === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id!)}
                      className={`relative px-4 py-2 text-[14px] font-medium transition-colors rounded-full ${
                        scrolled
                          ? isActive
                            ? "text-[#1D1D1F] bg-[#F5F5F7]"
                            : "text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-[#F5F5F7]/50"
                          : isActive
                            ? "text-white bg-white/10 backdrop-blur-md"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                      {isActive && scrolled && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#D4AF37]"
                        />
                      )}
                    </a>
                  );
                })
              ) : (
                navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href!}
                      className={`relative px-4 py-2 text-[14px] font-medium transition-colors rounded-full ${
                        scrolled
                          ? isActive
                            ? "text-[#1D1D1F] bg-[#F5F5F7]"
                            : "text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-[#F5F5F7]/50"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })
              )}
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  scrolled ? "hover:bg-[#F5F5F7] text-[#1D1D1F]" : "hover:bg-white/10 text-white"
                }`}
                aria-label="Buscar"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>

              {/* Favoritos (desktop) */}
              <Link
                href="/cuenta/favoritos"
                className={`hidden lg:flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  scrolled ? "hover:bg-[#F5F5F7] text-[#1D1D1F]" : "hover:bg-white/10 text-white"
                }`}
                aria-label="Favoritos"
              >
                <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </Link>

              {/* Admin (solo si es admin) */}
              {mounted && isAdmin && (
                <Link
                  href="/admin"
                  className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-colors"
                  aria-label="Admin"
                >
                  <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </Link>
              )}

              {/* Carrito */}
              <button
                onClick={openCart}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  scrolled ? "hover:bg-[#F5F5F7] text-[#1D1D1F]" : "hover:bg-white/10 text-white"
                }`}
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

              {/* Perfil */}
              <Link
                href={mounted && session?.user ? "/cuenta" : "/auth/login"}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors relative ${
                  scrolled ? "hover:bg-[#F5F5F7] text-[#1D1D1F]" : "hover:bg-white/10 text-white"
                }`}
                aria-label="Mi cuenta"
              >
                {mounted && session?.user?.image ? (
                  <img src={session.user.image} alt="" className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
                )}
                {mounted && session?.user && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#10B981] border-2 border-white" />
                )}
              </Link>

              {/* Menú móvil */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  scrolled ? "hover:bg-[#F5F5F7] text-[#1D1D1F]" : "hover:bg-white/10 text-white"
                }`}
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
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#E5E5E7]">
                <span className="text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
                  itech<span className="text-[#D4AF37]">peru</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7]"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
                {[
                  { href: "/", label: "Inicio" },
                  { href: "/coleccion", label: "Catálogo" },
                  { href: "/nosotros", label: "Nosotros" },
                  { href: "/garantia", label: "Garantía" },
                  { href: "/envios", label: "Envíos" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/contacto", label: "Contacto" },
                  ...(mounted && session?.user ? [{ href: "/cuenta", label: "Mi Cuenta" }] : []),
                  ...(mounted && session?.user ? [{ href: "/auth/login", label: "Iniciar Sesión" }] : []),
                  ...(mounted && isAdmin ? [{ href: "/admin", label: "Panel Admin" }] : []),
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-2xl text-[16px] font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-5 border-t border-[#E5E5E7]">
                <a
                  href="https://wa.me/51987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-4 py-3 text-[14px] font-semibold text-white"
                >
                  WhatsApp VIP
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlayDeluxe
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={STATIC_PRODUCTS}
      />
    </>
  );
}

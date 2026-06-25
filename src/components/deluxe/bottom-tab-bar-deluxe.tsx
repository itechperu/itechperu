"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, User, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * BottomTabBarDeluxe — Tab bar flotante mobile (solo < lg).
 *
 * 5 tabs con rutas reales:
 *  - Inicio → /
 *  - Catálogo → /catalogo
 *  - WhatsApp (centro, destacado oro)
 *  - Favoritos → /cuenta/favoritos
 *  - Perfil → /cuenta o /auth/login
 *
 * Área táctil mínima 48px. Animación de indicador activo.
 */
const TABS = [
  { id: "home", label: "Inicio", icon: Home, href: "/" },
  { id: "catalog", label: "Catálogo", icon: LayoutGrid, href: "/catalogo" },
  { id: "whatsapp", label: "VIP", icon: MessageCircle, href: "https://wa.me/51987654321?text=Hola%20iTECH%20Peru", external: true, highlight: true },
  { id: "favorites", label: "Favoritos", icon: Heart, href: "/cuenta/favoritos" },
  { id: "profile", label: "Perfil", icon: User, href: "/auth/login" },
] as const;

export function BottomTabBarDeluxe() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/catalogo") return pathname === "/catalogo" || pathname.startsWith("/producto") || pathname.startsWith("/categoria");
    if (href === "/cuenta/favoritos") return pathname === "/cuenta/favoritos";
    if (href === "/auth/login") return pathname === "/auth/login" || pathname.startsWith("/cuenta");
    return false;
  };

  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-[440px] px-4 pb-safe">
      <div className="flex items-center justify-center gap-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-xl px-2 py-2 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.18)]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = !("external" in tab && tab.external) && isActive(tab.href);

          if ("highlight" in tab && tab.highlight) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                target={"external" in tab && tab.external ? "_blank" : undefined}
                rel={"external" in tab && tab.external ? "noopener noreferrer" : undefined}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] shadow-[0_4px_16px_-2px_rgba(212,175,55,0.5)] transition-all hover:scale-105 active:scale-95 -mx-1"
                aria-label={tab.label}
              >
                <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.5} />
              </Link>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="group relative flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-full transition-all"
              aria-label={tab.label}
            >
              <Icon
                className={`h-[20px] w-[20px] transition-colors ${
                  active ? "text-[#D4AF37]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                }`}
                strokeWidth={1.5}
              />
              <span
                className={`text-[8.5px] font-medium leading-none transition-colors ${
                  active ? "text-[#D4AF37]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[#D4AF37]"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

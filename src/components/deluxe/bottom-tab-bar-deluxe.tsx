"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, MessageCircle, SlidersHorizontal } from "lucide-react";

/**
 * Tab Bar Flotante Deluxe — itechperu.shop
 * - Flota a ~16px del borde inferior
 * - Esquinas rounded-full
 * - Sombra difuminada tipo hardware premium
 * - 5 botones con micro-animaciones
 * - El botón central (WhatsApp VIP) destacado en Oro Champagne
 */
const TABS = [
  { id: "home", label: "Inicio", icon: Home, href: "/", highlight: false },
  { id: "catalog", label: "Catálogo", icon: LayoutGrid, href: "/", highlight: false },
  { id: "whatsapp", label: "VIP", icon: MessageCircle, href: "https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20quiero%20info%20VIP", highlight: true, external: true },
  { id: "favorites", label: "Favoritos", icon: Heart, href: "/", highlight: false },
  { id: "filters", label: "Filtros", icon: SlidersHorizontal, href: "/", highlight: false },
] as const;

export function BottomTabBarDeluxe() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-safe">
      <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/80 backdrop-blur-xl px-2 py-2 shadow-[0_12px_40px_-8px_rgb(0_0_0/0.18)]">
        {TABS.map((tab, idx) => {
          const Icon = tab.icon;
          // El tab central (WhatsApp VIP) va al medio del array
          const isCenter = tab.highlight;
          const isActive = pathname === tab.href && !("external" in tab && tab.external);

          if (isCenter) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                target={"external" in tab && tab.external ? "_blank" : undefined}
                rel={"external" in tab && tab.external ? "noopener noreferrer" : undefined}
                aria-label={tab.label}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] shadow-[0_6px_20px_-2px_rgb(212_175_55/0.5)] transition-all duration-300 hover:scale-105 active:scale-95 -mx-1"
              >
                <Icon
                  className="h-[22px] w-[22px] text-white transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <span className="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-[#1D1D1F] px-2 py-0.5 text-[9px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  WhatsApp VIP
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-label={tab.label}
              className="group relative flex h-11 w-11 flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-300 tap-scale"
            >
              <Icon
                className={`h-[20px] w-[20px] transition-colors duration-200 ${
                  isActive ? "text-[#1D1D1F]" : "text-[#86868B] group-hover:text-[#1D1D1F]"
                }`}
                strokeWidth={1.5}
              />
              <span
                className={`text-[8.5px] font-medium leading-none transition-colors duration-200 ${
                  isActive ? "text-[#1D1D1F]" : "text-[#86868B] group-hover:text-[#1D1D1F]"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-[#D4AF37]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

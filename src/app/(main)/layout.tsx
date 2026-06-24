import { HeaderDeluxe } from "@/components/deluxe/header-deluxe";
import { BottomTabBarDeluxe } from "@/components/deluxe/bottom-tab-bar-deluxe";
import { CartDrawerDeluxe } from "@/components/deluxe/cart-drawer-deluxe";
import { FooterDeluxe } from "@/components/deluxe/footer-deluxe";
import { Toaster as SonnerToaster } from "sonner";

/**
 * Layout para el route group (main) — itechperu.shop
 *
 * Incluye el Header sticky translúcido y la Tab Bar flotante inferior.
 * Aplica a: home (/), detalle de producto (/productos/[id]).
 * NO aplica a las páginas de auth que están en (auth) y tienen su propio layout.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFFFFF] bg-frost">
      {/* Header full-bleed inmersivo */}
      <HeaderDeluxe />

      {/* Contenido principal — padding-top mínimo porque el hero compensa */}
      <main className="flex-1 w-full pb-[120px] lg:pb-[80px]">
        {children}
      </main>

      {/* Tab Bar flotante inferior (oculta en desktop) */}
      <BottomTabBarDeluxe />

      {/* Cart Drawer lateral */}
      <CartDrawerDeluxe />

      {/* Footer profesional */}
      <FooterDeluxe />

      {/* Toaster para notificaciones (sonner) */}
      <SonnerToaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1D1D1F",
            color: "white",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "16px",
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
}

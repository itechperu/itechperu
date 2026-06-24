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
      {/* Header translúcido sticky con Scroll Spy */}
      <HeaderDeluxe />

      {/* Contenido principal — padding responsivo:
          - Mobile/tablet (con tab bar flotante): pt-[120px] pb-[120px]
          - Desktop (sin tab bar, header más alto): pt-[160px] pb-[60px]
          - Max width: 440px móvil → 768px tablet → 1280px desktop
          - flex-1 para que el footer quede al fondo en páginas cortas
      */}
      <main className="flex-1 mx-auto w-full max-w-[440px] sm:max-w-3xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 pt-[120px] sm:pt-[130px] lg:pt-[160px] pb-[120px] lg:pb-[60px]">
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

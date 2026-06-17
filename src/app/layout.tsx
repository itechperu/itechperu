import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { HeaderDeluxe } from "@/components/deluxe/header-deluxe";
import { BottomTabBarDeluxe } from "@/components/deluxe/bottom-tab-bar-deluxe";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "itechperu.shop — Tecnología Premium Reacondicionada",
  description:
    "iPads, MacBooks y Laptops corporativas reacondicionadas con garantía. Confianza absoluta, transparencia total y experiencia Deluxe. Envíos a todo Perú.",
  keywords: [
    "iPad reacondicionado Perú",
    "MacBook segunda mano Lima",
    "laptops corporativas",
    "ropa americana Perú",
    "itech peru",
    "tecnología premium usada",
  ],
  authors: [{ name: "itechperu.shop" }],
  metadataBase: new URL("https://itechperu.shop"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "itechperu.shop — Tecnología Premium Reacondicionada",
    description:
      "iPads, MacBooks y Laptops corporativas reacondicionadas con garantía. Experiencia Deluxe en Lima, Perú.",
    url: "https://itechperu.shop",
    siteName: "itechperu.shop",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "itechperu.shop",
    description: "Tecnología premium reacondicionada con experiencia Deluxe en Perú.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF] text-[#1D1D1F] min-h-screen`}
      >
        {/* Envoltura Deluxe: aplicamos fondo frost texturizado y respetamos safe-areas */}
        <div className="relative min-h-screen bg-[#FFFFFF] bg-frost">
          {/* Header translúcido sticky */}
          <HeaderDeluxe />

          {/* Contenido principal — padding responsivo:
              - Mobile/tablet (con tab bar flotante): pt-[120px] pb-[120px]
              - Desktop (sin tab bar, header más alto): pt-[140px] pb-[40px]
              - Max width crece por breakpoint: 440px móvil → 768px tablet → 1280px desktop
          */}
          <main className="mx-auto w-full max-w-[440px] sm:max-w-3xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 pt-[120px] sm:pt-[130px] lg:pt-[160px] pb-[120px] lg:pb-[60px] min-h-screen">
            {children}
          </main>

          {/* Tab Bar flotante inferior (oculta en desktop) */}
          <BottomTabBarDeluxe />
        </div>

        <Toaster />
      </body>
    </html>
  );
}

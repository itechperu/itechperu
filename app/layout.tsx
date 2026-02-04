import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// Aquí importamos el archivo que creaste en el Paso 2
import { Providers } from "./components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iTech Peru Store",
  description: "Tecnología de segunda mano con garantía",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Aquí envolvemos tu app con el puente de diseño */}
        <Providers>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
          </div>
        </Providers>

        {/* WhatsApp Widget Configuration */}
        <Script id="leadwidget-config" strategy="afterInteractive">
          {`window.LEADWIDGET_CLIENT_ID = '2IenFbHNA7SnJ20EmgSiOrGdcuA2';`}
        </Script>
        {/* WhatsApp Widget Script */}
        <Script
          src="https://whatsapp-leads-peru.vercel.app/widget-embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
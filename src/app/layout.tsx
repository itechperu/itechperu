import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://itechperu.shop";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "itechperu.shop — Tecnología Premium Reacondicionada",
    template: "%s — itechperu.shop",
  },
  description:
    "iPads, MacBooks y Laptops corporativas reacondicionadas con garantía. Confianza absoluta, transparencia total y experiencia Deluxe. Envíos a todo Perú.",
  keywords: [
    "iPad reacondicionado Perú",
    "MacBook segunda mano Lima",
    "laptops corporativas",
    "ropa americana Perú",
    "itech peru",
    "tecnología premium usada",
    "iPad Pro Lima",
    "MacBook Air Perú",
    "reacondicionado Apple Perú",
    "laptops usadas Lima",
  ],
  authors: [{ name: "itechperu.shop", url: siteUrl }],
  creator: "itechperu.shop",
  publisher: "itechperu.shop",
  applicationName: "itechperu.shop",
  category: "Tecnología",
  alternates: {
    canonical: "/",
    languages: {
      "es-PE": "/",
    },
  },
  openGraph: {
    title: "itechperu.shop — Tecnología Premium Reacondicionada",
    description:
      "iPads, MacBooks y Laptops corporativas reacondicionadas con garantía. Experiencia Deluxe en Lima, Perú.",
    url: siteUrl,
    siteName: "itechperu.shop",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "itechperu.shop — Tecnología Premium Reacondicionada en Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "itechperu.shop — Tecnología Premium Reacondicionada",
    description: "Tecnología premium reacondicionada con experiencia Deluxe en Perú.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "PE-LIM",
    "geo.placename": "Lima, Perú",
    "geo.position": "-12.046374;-77.042793",
    "ICBM": "-12.046374, -77.042793",
    "language": "Spanish",
    "rating": "general",
    "distribution": "global",
    "revisit-after": "1 day",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1D1D1F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // permitir zoom para accesibilidad
  userScalable: true,
  viewportFit: "cover",
};

// JSON-LD para LocalBusiness (GEO SEO local)
const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": `${siteUrl}#organization`,
  name: "itechperu.shop",
  alternateName: "iTECH Peru",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "Tecnología premium reacondicionada en Lima, Perú. iPads, MacBooks y Laptops corporativas verificadas con garantía real.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressRegion: "LIMA",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.046374,
    longitude: -77.042793,
  },
  areaServed: {
    "@type": "Country",
    name: "Perú",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51-987-654-321",
    contactType: "customer service",
    areaServed: "PE",
    availableLanguage: ["Spanish"],
  },
  priceRange: "S/ 2,000 - S/ 9,000",
  paymentAccepted: ["Mercado Pago", "Contraentrega", "Yape", "PLIN"],
  currenciesAccepted: "PEN",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
  },
  sameAs: [
    "https://wa.me/51987654321",
  ],
};

// WebSite schema (para Google Sitelinks Search)
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  url: siteUrl,
  name: "itechperu.shop",
  description: "Tecnología Premium Reacondicionada en Perú",
  publisher: {
    "@id": `${siteUrl}#organization`,
  },
  inLanguage: "es-PE",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFF] text-[#1D1D1F] min-h-screen`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

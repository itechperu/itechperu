import type { MetadataRoute } from "next";
import { STATIC_PRODUCTS } from "@/data/products";

/**
 * sitemap.ts — itechperu.shop
 *
 * Genera /sitemap.xml dinámicamente con todas las URLs indexables.
 * Google Search Console lo detecta automáticamente.
 *
 * Incluye:
 *  - Página principal
 *  - Todos los productos (URLs limpias con slug)
 *  - Categorías
 *  - Páginas estáticas (auth)
 *
 * No incluye:
 *  - /admin/* (protegido)
 *  - /cuenta/* (protegido)
 *  - /checkout/* (transaccional, no indexar)
 *  - /api/* (no HTML)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";
  const now = new Date();

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/coleccion`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/garantia`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/envios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contacto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/auth/login`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/auth/register`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Categorías (scroll anchors en la home)
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/coleccion?cat=IPAD`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/coleccion?cat=MACBOOK`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/coleccion?cat=LAPTOP`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Productos — URLs limpias con slug
  const productPages: MetadataRoute.Sitemap = STATIC_PRODUCTS.map((p) => ({
    url: `${siteUrl}/productos/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
    images: p.images.slice(0, 3).map((url) => url),
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}

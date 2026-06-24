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

  // Categorías (scroll anchors en la home, pero con URLs dedicadas)
  const categories = ["iPads", "MacBooks", "Laptops", "Ropa USA", "Accesorios"];
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/#catalogo`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

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

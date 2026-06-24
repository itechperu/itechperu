import type { MetadataRoute } from "next";
import { STATIC_PRODUCTS } from "@/data/products";
import { CATEGORIES_SEO, COLLECTIONS_SEO, BLOG_POSTS, LANDING_PAGES } from "@/data/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/coleccion`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/garantia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/envios`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/preguntas-frecuentes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/terminos`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteUrl}/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES_SEO.map((c) => ({
    url: `${siteUrl}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const collectionPages: MetadataRoute.Sitemap = COLLECTIONS_SEO.map((c) => ({
    url: `${siteUrl}/coleccion/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = STATIC_PRODUCTS.map((p) => ({
    url: `${siteUrl}/producto/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
    images: p.images.slice(0, 3).map((url) => ({ url })),
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const landingPages: MetadataRoute.Sitemap = LANDING_PAGES.map((p) => ({
    url: `${siteUrl}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...collectionPages, ...productPages, ...blogPages, ...landingPages];
}

import type { MetadataRoute } from "next";

/**
 * robots.ts — itechperu.shop
 *
 * Genera /robots.txt automáticamente.
 * Permite a Google y otros crawlers indexar todo el contenido público.
 * Bloquea rutas privadas (admin, cuenta, api, checkout).
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://itechperu.shop";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/productos/", "/auth/"],
        disallow: [
          "/admin/",
          "/cuenta/",
          "/checkout/",
          "/api/",
          "/_next/",
          "/static/",
          "/*.json$",
          "/*?callbackUrl*",
        ],
      },
      // Google bot específico — permite todo lo público
      {
        userAgent: "Googlebot",
        allow: ["/", "/productos/", "/auth/"],
        disallow: ["/admin/", "/cuenta/", "/checkout/", "/api/"],
      },
      // GPTBot (OpenAI) — permite indexar para AI search
      {
        userAgent: "GPTBot",
        allow: ["/", "/productos/"],
        disallow: ["/admin/", "/cuenta/", "/checkout/", "/api/"],
      },
      // ClaudeBot (Anthropic) — permite indexar para AI search
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/productos/"],
        disallow: ["/admin/", "/cuenta/", "/checkout/", "/api/"],
      },
      // Bingbot
      {
        userAgent: "Bingbot",
        allow: ["/", "/productos/", "/auth/"],
        disallow: ["/admin/", "/cuenta/", "/checkout/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

/**
 * Cliente Sanity — itechperu.shop
 *
 * Sanity se usa SOLO para almacenar y servir imágenes de productos.
 * Los datos del producto (título, precio, stock) siguen en Google Sheets + Postgres.
 *
 * Beneficios de Sanity para imágenes:
 *  - 100 GB gratis (vs 1 GB de Supabase Storage)
 *  - CDN global con edge en Perú (~30ms latencia)
 *  - Optimización automática: WebP/AVIF + resize on-the-fly
 *  - Studio visual para editar imágenes (recortar, rotar)
 *  - API GraphQL + GROQ
 *
 * Setup:
 *  1. Crea cuenta en https://www.sanity.io/manage (gratis)
 *  2. Crea un proyecto nuevo → obtén PROJECT_ID y DATASET (default: production)
 *  3. Crea un token de API (Read+Write) → cópialo
 *  4. Configura env vars:
 *     - NEXT_PUBLIC_SANITY_PROJECT_ID
 *     - NEXT_PUBLIC_SANITY_DATASET (default: "production")
 *     - SANITY_API_WRITE_TOKEN (solo server-side, para subir imágenes)
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiToken = process.env.SANITY_API_WRITE_TOKEN || "";

/**
 * Cliente Sanity para lecturas (CDN, sin token).
 * Lazy initialization para evitar errores en build time cuando
 * las env vars no están disponibles.
 */
let _readClient: ReturnType<typeof createClient> | null = null;
export function getSanityReadClient() {
  if (!_readClient) {
    _readClient = createClient({
      projectId,
      dataset,
      apiVersion: "2024-10-01",
      useCdn: true,
      perspective: "published",
    });
  }
  return _readClient;
}

/**
 * Cliente Sanity para escritura (subir imágenes, requiere token).
 * Solo usar server-side. Lazy initialization.
 */
let _writeClient: ReturnType<typeof createClient> | null = null;
export function getSanityWriteClient() {
  if (!_writeClient) {
    if (!apiToken) {
      throw new Error("SANITY_API_WRITE_TOKEN no configurado");
    }
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion: "2024-10-01",
      useCdn: false,
      token: apiToken,
    });
  }
  return _writeClient;
}

// Backwards compatibility
export const sanityReadClient = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getSanityReadClient() as never)[prop];
  },
});

export const sanityWriteClient = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getSanityWriteClient() as never)[prop];
  },
});

/**
 * Builder de URLs de imagen optimizadas.
 * Permite generar URLs con resize, formato, calidad on-the-fly.
 */
const builder = createImageUrlBuilder(sanityReadClient);

export function urlForImage(source: string | { _ref?: string; _id?: string }) {
  if (typeof source === "string") {
    // Si es un string, es una URL externa o ID ya resuelto
    return source;
  }
  return builder.image(source).auto("format").fit("max");
}

/**
 * Genera una URL optimizada de una imagen de Sanity.
 *
 * @param sanityImageId - El _id o _ref del asset en Sanity
 * @param options - { width, height, quality, format }
 * @returns URL completa del CDN de Sanity
 *
 * Ejemplo:
 *   getSanityImageUrl("image-abc123", { width: 800, quality: 80 })
 *   → https://cdn.sanity.io/images/[projectId]/production/abc123-800x800.webp?q=80
 */
export function getSanityImageUrl(
  sanityImageId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "avif" | "jpg" | "png";
  } = {}
): string {
  if (!sanityImageId) return "";
  if (sanityImageId.startsWith("http")) return sanityImageId;

  const { width = 800, height, quality = 80, format } = options;
  const params = new URLSearchParams();
  params.set("q", String(quality));
  if (format) params.set("fm", format);

  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${sanityImageId}`;
  const dimensions = height ? `${width}x${height}` : `${width}`;
  return `${baseUrl.replace(/\.[^.]+$/, "")}-${dimensions}.${format || "webp"}?${params}`;
}

/**
 * Verifica si Sanity está configurado (env vars presentes).
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId && apiToken);
}

/**
 * Información de configuración (sin secretos) para mostrar en admin.
 */
export function getSanityConfigInfo() {
  if (!projectId) return null;
  return {
    projectId,
    dataset,
    isConfigured: Boolean(projectId && apiToken),
    studioUrl: `https://${projectId}.sanity.studio`,
    manageUrl: `https://www.sanity.io/manage/project/${projectId}`,
    hasWriteToken: Boolean(apiToken),
  };
}

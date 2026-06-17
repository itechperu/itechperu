import type { NextConfig } from "next";

/**
 * Configuración Next.js optimizada para Vercel.
 *
 * Notas:
 *  - Vercel maneja el build automáticamente; `output: "standalone"` se conserva
 *    para compatibilidad con Docker/self-hosting pero no afecta el deploy en Vercel.
 *  - `images.remotePatterns` permite imágenes de Unsplash (las usamos en el catálogo demo).
 *  - `reactStrictMode: false` para evitar doble-render en desarrollo con efectos complejos.
 */
const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Vercel ignora `output: standalone` en su plataforma; lo dejamos para
  // compatibilidad con self-hosting / Docker.
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;

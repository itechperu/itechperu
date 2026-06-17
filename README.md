# itechperu.shop — Tecnología Premium Reacondicionada 🇵🇪

> iPads, MacBooks y Laptops corporativas reacondicionadas con garantía. Experiencia Deluxe, confianza absoluta.

Aplicación web construida con **Next.js 16 + TypeScript + Tailwind CSS 4**, optimizada mobile-first y 100% responsiva (mobile, tablet y desktop).

---

## 🚀 Deploy en Vercel (automático)

Este repositorio está configurado para deploy automático en Vercel.

### Pasos para conectar:

1. Entra a [vercel.com/new](https://vercel.com/new) e **importa el repo** `itechperu/itechperu`.
2. Framework Preset: **Next.js** (autodetectado).
3. Build Command: `next build` (autodetectado).
4. Install Command: `bun install` (configurado en `vercel.json`).
5. **Environment Variables** (Settings → Environment Variables):
   - Copia todas las variables de [`.env.example`](./.env.example)
   - Cambia `DATABASE_URL` por PostgreSQL (recomendado [Neon](https://neon.tech) o [Supabase](https://supabase.com))
   - Genera `NEXTAUTH_SECRET` con: `openssl rand -base64 32`
   - Configura `NEXTAUTH_URL=https://itechperu.shop` (o tu dominio Vercel)
6. Click en **Deploy**. Cada push a `main` desplegará automáticamente.

### Configuración incluida:
- ✅ `vercel.json` con headers de seguridad, caching de assets y regiones
- ✅ `next.config.ts` con `images.remotePatterns` para Unsplash
- ✅ `.env.example` con todas las variables documentadas
- ✅ `.gitignore` completo para Next.js + Vercel + sandbox

---

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
bun install

# Modo desarrollo
bun run dev

# Lint
bun run lint

# Base de datos (Prisma)
bun run db:push
bun run db:generate
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🧱 Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 + utilidades Deluxe custom |
| UI | shadcn/ui + Lucide icons + Framer Motion |
| ORM | Prisma (SQLite en dev, Postgres en prod) |
| Auth | NextAuth.js v4 (Google + Email) |
| Estado | Zustand + TanStack Query |
| Pasarela | Mercado Pago (Sprint 2) |

---

## 🎨 Sistema de Diseño Deluxe

- **Fondo Principal:** Blanco Puro `#FFFFFF` / Gris ultra sutil `#F5F5F7`
- **Texto:** Negro Obsidiana `#1D1D1F`
- **Acento:** Oro Champagne `#D4AF37` (solo para detalles de alta gama)
- **Efecto Cristal:** `backdrop-blur-md bg-white/75 border border-white/20`
- **Bordes:** `rounded-2xl` / `rounded-3xl`
- **Sombras:** `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`

---

## 📁 Estructura

```
src/
├── app/
│   ├── layout.tsx                    # Doble menú Deluxe (header + tab bar)
│   ├── page.tsx                      # Home / catálogo
│   └── productos/[id]/page.tsx       # Detalle de producto (SSR + JSON-LD)
├── components/
│   ├── deluxe/                       # Componentes Deluxe custom
│   │   ├── header-deluxe.tsx
│   │   ├── bottom-tab-bar-deluxe.tsx
│   │   ├── lightbox-deluxe.tsx
│   │   ├── grade-selector-deluxe.tsx
│   │   ├── product-gallery-deluxe.tsx
│   │   └── product-detail-client.tsx
│   └── ui/                           # shadcn/ui base
├── data/products.ts                  # Mock data catálogo
└── app/globals.css                   # Sistema Deluxe de utilidades
```

---

## 🗺️ Roadmap

- [x] **Sprint 1:** Layout Deluxe + Detalle de producto + Lightbox + Selector de grados
- [ ] **Sprint 2:** Checkout (Google Sign-In + Mercado Pago + Contraentrega Lima)
- [ ] **Sprint 3:** Integración Prisma/Postgres + admin de inventario
- [ ] **Sprint 4:** Favoritos persistentes + carrito real con Zustand

---

## 📄 Licencia

© 2026 itechperu.shop. Todos los derechos reservados.

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

# Tests E2E con Playwright
bun run test                 # todos los tests (mobile + tablet + desktop)
bun run test:mobile          # solo mobile
bun run test:tablet          # solo tablet
bun run test:desktop         # solo desktop
bun run test:ui              # modo interactivo
bun run test:headed          # ver el browser
bun run test:report          # ver reporte HTML

# Base de datos (Prisma)
bun run db:push
bun run db:generate
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 🧪 Tests E2E con Playwright

Los tests cubren **84 escenarios** en mobile + desktop:

| Archivo | Tests | Cobertura |
|---------|-------|-----------|
| `tests/home-scroll-spy.spec.ts` | 9 | Home, Scroll Spy, Deep Linking, Responsividad |
| `tests/product-detail.spec.ts` | 9 | Galería, Lightbox, Selector de grado, Cantidad, Favoritos |
| `tests/auth.spec.ts` | 24 | Login, Register, Forgot, Reset, OTP, Layout responsivo |

---

## 🧱 Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 + utilidades Deluxe custom |
| UI | shadcn/ui + Lucide icons + Framer Motion |
| DB | Prisma + SQLite (dev) / PostgreSQL (prod en Vercel) |
| Auth | NextAuth.js v4 (Google + Credentials email/password con bcrypt) |
| Estado | Zustand (carrito persistente) + TanStack Query |
| Pasarela | Mercado Pago (Preferencias + Webhooks + IPN) |
| Tests | Playwright (84+ tests E2E en mobile + desktop) |

### ¿Por qué NO Firebase?

| Criterio | Firebase | Prisma + Postgres + NextAuth |
|----------|----------|------------------------------|
| Costo en Perú | Caro: cobra por lectura/escritura | Gratis: Neon/Vercel tier gratuito |
| Vendor lock-in | Total | Bajo (Postgres estándar) |
| SEO | Client-side, malo para e-commerce | Server Components, SEO perfecto |
| Mercado Pago | Sin integración nativa | Webhooks serverless nativos |
| TypeScript | Tipos frágiles | Tipos 100% seguros desde schema |

Para este e-commerce, **Prisma + Postgres + NextAuth es objetivamente superior**.

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
- [x] **Sprint 1.5:** Layout 100% responsivo (mobile/tablet/desktop) + Vercel
- [x] **Sprint 1.6:** Deep Linking + Scroll Spy + Auth Deluxe (Login/Register/Forgot/Reset/OTP) + Tests Playwright
- [x] **Sprint 2:** ✅ DB Prisma + NextAuth real (Google + Credentials) + Mercado Pago (Preferencias + Webhooks) + Checkout Deluxe (Carrito + MP + Contraentrega Lima)
- [ ] **Sprint 3:** Panel admin de inventario + gestión de pedidos
- [ ] **Sprint 4:** Favoritos persistentes + wishlist + sistema de reviews

## 💳 Mercado Pago — Configuración

1. Crea una app en [Mercado Pago Developers](https://www.mercadopago.com.pe/developers/panel/app)
2. Copia `MERCADO_PAGO_ACCESS_TOKEN` y `MERCADO_PAGO_PUBLIC_KEY` (usa credenciales TEST para sandbox)
3. Configura el webhook URL: `https://itechperu.shop/api/mercadopago/webhook`
4. Eventos a suscribir: `payment`
5. Para producción, verifica tu cuenta con RUC

**Flujo:**
1. Usuario agrega al carrito → Cart Drawer Deluxe
2. Click "Finalizar compra" → `/checkout`
3. Selecciona Mercado Pago o Contraentrega
4. **MP:** redirige a `init_point` de MP → paga → vuelve a `/checkout/success`
5. **COD:** crea orden directamente → va a `/checkout/success?cod=1`
6. Webhook de MP actualiza el estado del pedido en DB

## 🔐 NextAuth.js — Configuración

1. **Google OAuth:** Crea OAuth 2.0 Client ID en [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` y `https://itechperu.shop/api/auth/callback/google`
2. **NEXTAUTH_SECRET:** Genera con `openssl rand -base64 32`
3. **Credenciales demo:** `demo@itechperu.shop` / `admin123` (seed automático con `bun run db:seed`)

## 🗄️ Base de datos

### ¿Por qué Supabase?

| Criterio | Supabase ✅ | Neon | Turso |
|----------|------------|------|-------|
| Latencia Perú | **~80ms (São Paulo)** | 140ms (US) | 40ms (edge) |
| Prisma | ✅ Perfecto | ✅ Perfecto | ⚠️ Experimental |
| Storage imágenes | ✅ 1GB gratis | ❌ | ❌ |
| Backups diarios | ✅ | ✅ PITR | ❌ Manual |
| Realtime | ✅ | ❌ | ⚠️ Parcial |
| Auth (opcional) | ✅ Coexiste con NextAuth | ❌ | ❌ |

**Supabase gana** por latencia desde Perú, storage de imágenes incluido y experiencia previa del equipo.

### Setup desarrollo (SQLite — automático)

```bash
# El script detecta SQLite automáticamente si DATABASE_URL empieza con "file:"
bun run db:push     # Crea/migra tablas
bun run db:seed     # Puebla con 4 productos + admin user
```

### Setup producción (Supabase PostgreSQL — automático)

```bash
# 1. Crea cuenta en https://supabase.com (región São Paulo)
# 2. Project Settings → Database → Connection string → URI
# 3. En Vercel, configura DATABASE_URL con esa URL (postgres://...)
# 4. El script detecta Postgres automáticamente y cambia el provider
# 5. Ejecuta una sola vez (localmente, con DATABASE_URL apuntando a Supabase):
DATABASE_URL="postgresql://..." bun run db:push
DATABASE_URL="postgresql://..." bun run db:seed
```

**Cómo funciona la detección automática:**
- `scripts/select-prisma-provider.js` se ejecuta antes de cada `prisma generate`, `db:push`, `next build`
- Lee `DATABASE_URL` y modifica `prisma/schema.prisma` con el provider correcto (`sqlite` o `postgresql`)
- En Vercel build, el `postinstall` + `build` scripts ya lo ejecutan automáticamente
- **No necesitas cambiar manualmente nada** entre dev y prod

**Modelos:**
- `User` + `Account` + `Session` (NextAuth)
- `Product` + `Spec` + `Grade` (catálogo)
- `CartItem` + `Favorite` (usuario)
- `Order` + `OrderItem` + `PaymentLog` (pedidos y pagos)
- `Address` (direcciones de envío)

## 🔗 Deep Linking + Scroll Spy

Cada sección de la home tiene un ID único y URL navegable:
- `/#inicio` → Hero
- `/#ofertas` → Ofertas Deluxe
- `/#catalogo` → Productos destacados
- `/#categorias` → Categorías
- `/#confianza` → Sello de confianza

**Características:**
- Al hacer scroll, la URL se actualiza automáticamente via History API (sin recargar)
- Al cargar una URL con `#seccion`, hace smooth scroll con offset de header
- En desktop, el header resalta la sección activa con un indicador dorado
- Hook reutilizable: `useScrollSpy({ sectionIds: [...] })` en `src/hooks/use-scroll-spy.ts`

## 🔐 Sistema de Auth Deluxe

Páginas disponibles (URLs directas):

| URL | Descripción |
|-----|-------------|
| `/auth/login` | Login con email + Google + Recordarme |
| `/auth/register` | Registro con medidor de fortaleza de contraseña |
| `/auth/forgot-password` | Recuperar contraseña (estado de éxito animado) |
| `/auth/reset-password` | Crear nueva contraseña |
| `/auth/verify-email` | Verificación OTP 6 dígitos con auto-submit |

**Features:**
- Layout split 2 columnas en desktop (panel brand + formulario)
- Mobile: solo formulario centrado
- Animaciones Framer Motion (entrada, transiciones, micro-interacciones)
- Validación en tiempo real con feedback visual (rojo error, verde success)
- Toggle de visibilidad de password
- Medidor de fortaleza animado (0-100%)
- OTP con auto-advance y navegación por teclado
- Google Sign-In con logo oficial multi-color

---

## 📄 Licencia

© 2026 itechperu.shop. Todos los derechos reservados.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";
import { isSanityConfigured, getSanityConfigInfo } from "@/lib/sanity/client";

/**
 * GET /api/health
 *
 * Endpoint público de verificación de salud del sistema.
 * Verifica que todas las variables de entorno y servicios estén configurados.
 *
 * Útil para:
 *  - Debug rápido en producción (sin exponer secretos)
 *  - Vercel uptime monitoring
 *  - Verificar que el deploy quedó bien configurado
 */
export async function GET() {
  const checks: Array<{
    name: string;
    status: "ok" | "error" | "warning";
    message: string;
    required?: boolean;
  }> = [];

  // 1. NextAuth — NEXTAUTH_SECRET
  const nextauthSecret = process.env.NEXTAUTH_SECRET;
  if (!nextauthSecret) {
    checks.push({
      name: "NextAuth Secret",
      status: "error",
      message: "NEXTAUTH_SECRET no configurado. Genera con: openssl rand -base64 32",
      required: true,
    });
  } else if (nextauthSecret.includes("cambia-esto") || nextauthSecret.length < 20) {
    checks.push({
      name: "NextAuth Secret",
      status: "warning",
      message: "NEXTAUTH_SECRET parece ser el valor por defecto o muy corto. Usa uno real en producción.",
    });
  } else {
    checks.push({
      name: "NextAuth Secret",
      status: "ok",
      message: "Configurado correctamente",
    });
  }

  // 2. NextAuth — NEXTAUTH_URL
  const nextauthUrl = process.env.NEXTAUTH_URL;
  if (!nextauthUrl) {
    checks.push({
      name: "NextAuth URL",
      status: "error",
      message: "NEXTAUTH_URL no configurado. Debe ser la URL de tu app (ej: https://itechperu.shop)",
      required: true,
    });
  } else if (nextauthUrl.includes("localhost") && process.env.NODE_ENV === "production") {
    checks.push({
      name: "NextAuth URL",
      status: "error",
      message: `NEXTAUTH_URL es localhost en producción: ${nextauthUrl}. Cámbialo a tu dominio de Vercel.`,
      required: true,
    });
  } else {
    checks.push({
      name: "NextAuth URL",
      status: "ok",
      message: nextauthUrl,
    });
  }

  // 3. Google OAuth (opcional)
  const googleId = process.env.GOOGLE_CLIENT_ID;
  const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!googleId || !googleSecret) {
    checks.push({
      name: "Google OAuth",
      status: "warning",
      message: "No configurado. Login con Google deshabilitado (solo email+password).",
    });
  } else {
    checks.push({
      name: "Google OAuth",
      status: "ok",
      message: "Configurado",
    });
  }

  // 4. Mercado Pago (opcional para que arranque, requerido para cobrar)
  const mpToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
  if (!mpToken) {
    checks.push({
      name: "Mercado Pago",
      status: "warning",
      message: "No configurado. Checkout con MP no disponible (contraentrega sí funciona).",
    });
  } else {
    checks.push({
      name: "Mercado Pago",
      status: "ok",
      message: "Configurado",
    });
  }

  // 5. Base de datos
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    checks.push({
      name: "Database",
      status: "error",
      message: "DATABASE_URL no configurado",
      required: true,
    });
  } else if (dbUrl.startsWith("file:") && process.env.NODE_ENV === "production") {
    checks.push({
      name: "Database",
      status: "error",
      message: "DATABASE_URL es SQLite (file:). En producción usa PostgreSQL de Supabase.",
      required: true,
    });
  } else {
    checks.push({
      name: "Database",
      status: "ok",
      message: dbUrl.startsWith("file:") ? "SQLite (dev)" : "PostgreSQL (prod)",
    });
  }

  // 6. Sanity (imágenes)
  if (!isSanityConfigured()) {
    checks.push({
      name: "Sanity (imágenes)",
      status: "warning",
      message: "No configurado. Upload de imágenes deshabilitado.",
    });
  } else {
    const info = getSanityConfigInfo();
    checks.push({
      name: "Sanity (imágenes)",
      status: "ok",
      message: `Project: ${info?.projectId} · Studio: ${info?.studioUrl}`,
    });
  }

  // 7. Google Sheets Sync (opcional)
  if (!isGoogleSheetsConfigured()) {
    checks.push({
      name: "Google Sheets Sync",
      status: "warning",
      message: "No configurado. Sync automático de catálogo deshabilitado.",
    });
  } else {
    checks.push({
      name: "Google Sheets Sync",
      status: "ok",
      message: "Configurado",
    });
  }

  // 8. CRON_SECRET
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    checks.push({
      name: "Cron Secret",
      status: "warning",
      message: "No configurado. Cron job de sync no funcionará.",
    });
  } else {
    checks.push({
      name: "Cron Secret",
      status: "ok",
      message: "Configurado",
    });
  }

  // 9. Test de conexión a DB (solo si DATABASE_URL está configurado)
  if (dbUrl && !dbUrl.startsWith("file:") ) {
    try {
      await db.$queryRaw`SELECT 1`;
      checks.push({
        name: "DB Connection",
        status: "ok",
        message: "Conexión exitosa",
      });
    } catch {
      checks.push({
        name: "DB Connection",
        status: "error",
        message: "No se pudo conectar a la base de datos. Verifica DATABASE_URL.",
        required: true,
      });
    }
  }

  // Resumen
  const errors = checks.filter((c) => c.status === "error");
  const warnings = checks.filter((c) => c.status === "warning");
  const allOk = errors.length === 0;

  return NextResponse.json(
    {
      status: allOk ? "healthy" : "unhealthy",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      summary: {
        total: checks.length,
        ok: checks.filter((c) => c.status === "ok").length,
        warnings: warnings.length,
        errors: errors.length,
      },
      checks,
      nextSteps: errors.length > 0
        ? "Configura las variables marcadas como 'error' en Vercel → Project Settings → Environment Variables"
        : warnings.length > 0
          ? "Algunas funciones opcionales no están configuradas. Ver 'checks' para detalles."
          : "Todo configurado correctamente. ¡Listo para producción!",
    },
    { status: allOk ? 200 : 503 }
  );
}

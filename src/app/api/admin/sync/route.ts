import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { syncCatalogFromSheets } from "@/lib/sync";
import { isGoogleSheetsConfigured, getSheetsConfigInfo } from "@/lib/google-sheets";

/**
 * GET /api/admin/sync
 * Retorna la configuración actual de Google Sheets + último sync.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    const configInfo = getSheetsConfigInfo();
    const isConfigured = isGoogleSheetsConfigured();

    // Últimos 10 syncs desde PaymentLog
    const recentSyncs = await db.paymentLog.findMany({
      where: { orderId: "sync-log", event: "catalog_sync" },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        createdAt: true,
        payload: true,
      },
    });

    const syncHistory = recentSyncs.map((s) => {
      try {
        const data = JSON.parse(s.payload);
        return {
          id: s.id,
          date: s.createdAt,
          ...data,
        };
      } catch {
        return { id: s.id, date: s.createdAt, error: "parse error" };
      }
    });

    return NextResponse.json({
      isConfigured,
      config: configInfo,
      history: syncHistory,
    });
  } catch (error) {
    console.error("❌ /api/admin/sync GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/**
 * POST /api/admin/sync
 * Ejecuta la sincronización manualmente (admin la dispara).
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    if (!isGoogleSheetsConfigured()) {
      return NextResponse.json(
        {
          error:
            "Google Sheets no configurado. Configura GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY y GOOGLE_SHEETS_ID en variables de entorno.",
        },
        { status: 400 }
      );
    }

    console.log(`🔄 [Sync] Iniciado por ${session.user.email}...`);
    const result = await syncCatalogFromSheets();
    console.log(`✅ [Sync] Completado: ${result.created} creados, ${result.updated} actualizados, ${result.deactivated} desactivados`);

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ /api/admin/sync POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error interno",
      },
      { status: 500 }
    );
  }
}

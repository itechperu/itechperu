import { NextResponse } from "next/server";
import { syncCatalogFromSheets } from "@/lib/sync";
import { isGoogleSheetsConfigured } from "@/lib/google-sheets";

/**
 * GET /api/cron/sync
 *
 * Cron job automático de Vercel que sincroniza el catálogo desde Google Sheets.
 * Se ejecuta cada hora (configurado en vercel.json).
 *
 * Protegido por CRON_SECRET: Vercel envía ?secret=<CRON_SECRET> en cada ejecución.
 * Sin el secret correcto, retorna 401.
 *
 * También se puede llamar manualmente:
 *   curl "https://itechperu.shop/api/cron/sync?secret=<CRON_SECRET>"
 */
export async function GET(req: Request) {
  try {
    // Verificar autorización
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    const expectedSecret = process.env.CRON_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        { error: "CRON_SECRET no configurado en env vars" },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar que Google Sheets esté configurado
    if (!isGoogleSheetsConfigured()) {
      return NextResponse.json(
        { error: "Google Sheets no configurado, sync omitido" },
        { status: 200 }
      );
    }

    console.log("🔄 [Cron] Iniciando sync automático...");
    const result = await syncCatalogFromSheets();
    console.log(`✅ [Cron] Sync completado: ${result.created}+${result.updated} productos`);

    return NextResponse.json({
      ...result,
      source: "cron",
    });
  } catch (error) {
    console.error("❌ /api/cron/sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error interno",
      },
      { status: 500 }
    );
  }
}

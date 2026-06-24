import { google } from "googleapis";

/**
 * Cliente Google Sheets — itechperu.shop
 *
 * Usa una Service Account (no OAuth de usuario) para leer el catálogo
 * desde un Google Sheet compartido.
 *
 * Setup (ver README sección "Google Sheets Sync"):
 *  1. Crear Service Account en Google Cloud Console
 *  2. Descargar JSON de credenciales
 *  3. Copiar el email de la service account (xxx@yyy.iam.gserviceaccount.com)
 *  4. Compartir el Google Sheet con ese email (permiso "Lector")
 *  5. Configurar env vars:
 *     - GOOGLE_SERVICE_ACCOUNT_EMAIL
 *     - GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *     - GOOGLE_SHEETS_ID (se extrae de la URL del sheet)
 */

export interface SheetProduct {
  slug: string;
  title: string;
  brand: string;
  model: string;
  category: string;
  basePrice: number; // en soles (no centavos — el sync convierte)
  condition: string;
  storage: string;
  color: string;
  description: string;
  images: string; // URLs separadas por "|"
  highlights: string; // Items separados por "|"
  includes: string; // Items separados por "|"
  stock: number;
  isActive: string; // "TRUE" o "FALSE"
  gradeA_PriceModifier: number; // en soles
  gradeB_PriceModifier: number;
  gradeC_PriceModifier: number;
}

interface SheetsConfig {
  serviceAccountEmail: string;
  serviceAccountPrivateKey: string;
  sheetId: string;
  range?: string;
}

function getConfig(): SheetsConfig | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEETS_ID;

  if (!email || !key || !sheetId) {
    return null;
  }

  return {
    serviceAccountEmail: email,
    // El private key viene con \n escapados en env vars; restaurarlos
    serviceAccountPrivateKey: key.replace(/\\n/g, "\n"),
    sheetId,
    range: process.env.GOOGLE_SHEETS_RANGE || "Catalogo!A:T",
  };
}

function createAuthClient(config: SheetsConfig) {
  const jwt = new google.auth.JWT({
    email: config.serviceAccountEmail,
    key: config.serviceAccountPrivateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return jwt;
}

/**
 * Verifica si Google Sheets está configurado (env vars presentes).
 */
export function isGoogleSheetsConfigured(): boolean {
  return getConfig() !== null;
}

/**
 * Lee el catálogo desde Google Sheets.
 *
 * Estructura esperada del sheet (fila 1 = headers):
 *   A: slug | B: title | C: brand | D: model | E: category |
 *   F: basePrice | G: condition | H: storage | I: color |
 *   J: description | K: images | L: highlights | M: includes |
 *   N: stock | O: isActive | P: gradeA_PriceModifier |
 *   Q: gradeB_PriceModifier | R: gradeC_PriceModifier
 *
 * @returns Array de productos parseados
 */
export async function readCatalogFromSheets(): Promise<{
  products: SheetProduct[];
  rowCount: number;
  sheetTitle: string;
}> {
  const config = getConfig();
  if (!config) {
    throw new Error(
      "Google Sheets no configurado. Faltan env vars: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_SHEETS_ID"
    );
  }

  const auth = createAuthClient(config);
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.sheetId,
    range: config.range || "Catalogo!A:T",
  });

  const rows = response.data.values || [];
  if (rows.length < 2) {
    return { products: [], rowCount: 0, sheetTitle: "Vacío" };
  }

  // Obtener metadata del sheet (título)
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: config.sheetId,
    fields: "properties.title",
  });

  // Fila 1 = headers, filas 2+ = datos
  const headers = rows[0].map((h) => String(h).trim().toLowerCase());
  const dataRows = rows.slice(1);

  const products: SheetProduct[] = [];

  for (const row of dataRows) {
    // Helper para obtener valor por nombre de columna
    const get = (name: string, fallback = ""): string => {
      const idx = headers.indexOf(name.toLowerCase());
      return idx >= 0 ? String(row[idx] || fallback).trim() : fallback;
    };

    const slug = get("slug");
    if (!slug) continue; // Saltar filas vacías

    products.push({
      slug,
      title: get("title", slug),
      brand: get("brand", "Apple"),
      model: get("model", get("title")),
      category: get("category", "IPAD").toUpperCase(),
      basePrice: parseFloat(get("baseprice", "0")) || 0,
      condition: get("condition", "Reacondicionado Certificado"),
      storage: get("storage"),
      color: get("color"),
      description: get("description"),
      images: get("images"),
      highlights: get("highlights"),
      includes: get("includes"),
      stock: parseInt(get("stock", "10"), 10) || 10,
      isActive: get("isactive", "TRUE").toUpperCase(),
      gradeA_PriceModifier: parseFloat(get("gradea_pricemodifier", "0")) || 0,
      gradeB_PriceModifier: parseFloat(get("gradeb_pricemodifier", "-250")) || 0,
      gradeC_PriceModifier: parseFloat(get("gradec_pricemodifier", "-500")) || 0,
    });
  }

  return {
    products,
    rowCount: dataRows.length,
    sheetTitle: meta.data.properties?.title || "Google Sheet",
  };
}

/**
 * Información de configuración para mostrar en el admin (sin secretos).
 */
export function getSheetsConfigInfo() {
  const config = getConfig();
  if (!config) return null;

  return {
    sheetId: config.sheetId,
    sheetUrl: `https://docs.google.com/spreadsheets/d/${config.sheetId}/edit`,
    range: config.range || "Catalogo!A:T",
    serviceAccountEmail: config.serviceAccountEmail,
    isConfigured: true,
  };
}

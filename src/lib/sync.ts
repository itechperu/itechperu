import { db } from "@/lib/db";
import { readCatalogFromSheets, type SheetProduct } from "@/lib/google-sheets";
import { solesToCents } from "@/lib/format";

/**
 * Lógica de sincronización Google Sheets → Database — itechperu.shop
 *
 * Estrategia: UPSERT
 *  - Si el producto existe (por slug) → actualizar
 *  - Si no existe → crear
 *  - Productos en DB que NO están en el sheet → marcar como inactivos (no borrar)
 *
 * Preserva: IDs existentes, relaciones con pedidos/ordenes, favoritos
 */

export interface SyncResult {
  success: boolean;
  total: number;
  created: number;
  updated: number;
  deactivated: number;
  errors: string[];
  sheetTitle: string;
  syncedAt: string;
  duration: number;
}

/**
 * Ejecuta la sincronización completa del catálogo desde Google Sheets.
 *
 * @returns Resultado detallado del sync
 */
export async function syncCatalogFromSheets(): Promise<SyncResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  let created = 0;
  let updated = 0;
  let deactivated = 0;

  try {
    // 1. Leer el sheet
    const { products, rowCount, sheetTitle } = await readCatalogFromSheets();

    if (products.length === 0) {
      return {
        success: false,
        total: 0,
        created: 0,
        updated: 0,
        deactivated: 0,
        errors: ["El sheet está vacío o no tiene productos válidos"],
        sheetTitle,
        syncedAt: new Date().toISOString(),
        duration: Date.now() - startTime,
      };
    }

    // 2. Obtener slugs actuales para saber cuáles desactivar
    const existingProducts = await db.product.findMany({
      select: { id: true, slug: true, isActive: true },
    });
    const sheetSlugs = new Set(products.map((p) => p.slug));
    const slugsToDeactivate = existingProducts.filter(
      (p) => !sheetSlugs.has(p.slug) && p.isActive
    );

    // 3. Upsert cada producto
    for (const sheetProduct of products) {
      try {
        await upsertProduct(sheetProduct);
        // Verificar si fue creado o actualizado
        const exists = existingProducts.some((p) => p.slug === sheetProduct.slug);
        if (exists) {
          updated++;
        } else {
          created++;
        }
      } catch (error) {
        errors.push(
          `Error en "${sheetProduct.slug}": ${error instanceof Error ? error.message : "desconocido"}`
        );
      }
    }

    // 4. Desactivar productos que ya no están en el sheet
    for (const product of slugsToDeactivate) {
      try {
        await db.product.update({
          where: { id: product.id },
          data: { isActive: false },
        });
        deactivated++;
      } catch {
        errors.push(`No se pudo desactivar producto ${product.slug}`);
      }
    }

    // 5. Guardar log del sync en PaymentLog (reusamos como log general)
    await db.paymentLog.create({
      data: {
        orderId: "sync-log",
        event: "catalog_sync",
        payload: JSON.stringify({
          total: products.length,
          created,
          updated,
          deactivated,
          errors: errors.slice(0, 10),
          sheetTitle,
          rowCount,
        }),
      },
    });

    return {
      success: errors.length === 0,
      total: products.length,
      created,
      updated,
      deactivated,
      errors,
      sheetTitle,
      syncedAt: new Date().toISOString(),
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      success: false,
      total: 0,
      created: 0,
      updated: 0,
      deactivated: 0,
      errors: [
        `Error fatal: ${error instanceof Error ? error.message : "desconocido"}`,
      ],
      sheetTitle: "Error",
      syncedAt: new Date().toISOString(),
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Hace upsert de un producto individual (busca por slug).
 */
async function upsertProduct(sheet: SheetProduct) {
  const basePriceCents = solesToCents(sheet.basePrice);
  const isActive = sheet.isActive === "TRUE" || sheet.isActive === "1" || sheet.isActive === "SI";

  // Parsear arrays separados por "|"
  const images = sheet.images
    ? sheet.images.split("|").map((s) => s.trim()).filter(Boolean)
    : [];
  const highlights = sheet.highlights
    ? sheet.highlights.split("|").map((s) => s.trim()).filter(Boolean)
    : [];
  const includes = sheet.includes
    ? sheet.includes.split("|").map((s) => s.trim()).filter(Boolean)
    : [];

  // Mapear categoría
  const categoryMap: Record<string, "IPAD" | "MACBOOK" | "LAPTOP" | "ROPA" | "ACCESORIO"> = {
    IPAD: "IPAD",
    IPADS: "IPAD",
    MACBOOK: "MACBOOK",
    MACBOOKS: "MACBOOK",
    LAPTOP: "LAPTOP",
    LAPTOPS: "LAPTOP",
    ROPA: "ROPA",
    ACCESORIO: "ACCESORIO",
    ACCESORIOS: "ACCESORIO",
  };
  const category = categoryMap[sheet.category.toUpperCase()] || "IPAD";

  // Datos del producto
  const productData = {
    title: sheet.title,
    brand: sheet.brand,
    model: sheet.model,
    category,
    basePrice: basePriceCents,
    condition: sheet.condition,
    storage: sheet.storage || null,
    color: sheet.color || null,
    description: sheet.description || "",
    images: JSON.stringify(images),
    highlights: JSON.stringify(highlights),
    includes: JSON.stringify(includes),
    stock: sheet.stock,
    isActive,
    updatedAt: new Date(),
  };

  // Upsert
  const existing = await db.product.findUnique({
    where: { slug: sheet.slug },
    include: { grades: true },
  });

  if (existing) {
    // Actualizar producto existente
    await db.product.update({
      where: { id: existing.id },
      data: productData,
    });

    // Actualizar grades si existen (3 grades fijos: A+, A, B)
    const gradeMods: Record<string, number> = {
      "A+": solesToCents(sheet.gradeA_PriceModifier),
      "A": solesToCents(sheet.gradeB_PriceModifier),
      "B": solesToCents(sheet.gradeC_PriceModifier),
    };

    for (const grade of existing.grades) {
      if (grade.grade in gradeMods) {
        await db.grade.update({
          where: { id: grade.id },
          data: { priceModifier: gradeMods[grade.grade] },
        });
      }
    }
  } else {
    // Crear producto nuevo con specs y grades por defecto
    await db.product.create({
      data: {
        slug: sheet.slug,
        ...productData,
        specs: {
          create: [
            { icon: "cpu", label: "Procesador", value: "Ver catálogo" },
            { icon: "storage", label: "Almacenamiento", value: sheet.storage || "—" },
            { icon: "battery", label: "Batería", value: "Verificada" },
          ],
        },
        grades: {
          create: [
            {
              grade: "A+",
              label: "Como Nuevo",
              description: "Sin marcas de uso. Batería ≥ 95%.",
              priceModifier: solesToCents(sheet.gradeA_PriceModifier),
              warranty: "6 meses",
            },
            {
              grade: "A",
              label: "Excelente",
              description: "Microdesgaste imperceptible.",
              priceModifier: solesToCents(sheet.gradeB_PriceModifier),
              warranty: "4 meses",
            },
            {
              grade: "B",
              label: "Muy Bueno",
              description: "Uso visible en bordes.",
              priceModifier: solesToCents(sheet.gradeC_PriceModifier),
              warranty: "3 meses",
            },
          ],
        },
      },
    });
  }
}

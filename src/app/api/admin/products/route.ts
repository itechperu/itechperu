import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { error: "No autenticado", status: 401 };
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { role: true, id: true },
  });
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return { error: "Acceso denegado", status: 403 };
  }
  return { userId: user.id };
}

/**
 * GET /api/admin/products
 * Lista todos los productos (incluye inactivos).
 */
export async function GET() {
  try {
    const auth = await checkAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const products = await db.product.findMany({
      include: {
        grades: { select: { grade: true, priceModifier: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("❌ /api/admin/products GET error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/**
 * POST /api/admin/products
 * Crea un nuevo producto.
 */
export async function POST(req: Request) {
  try {
    const auth = await checkAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const {
      slug,
      category,
      brand,
      model,
      title,
      subtitle,
      description,
      basePrice,
      condition,
      storage,
      color,
      images,
      highlights,
      includes,
      specs,
    } = body;

    // Validaciones básicas
    if (!title || !slug || !basePrice) {
      return NextResponse.json(
        { error: "Título, slug y precio son obligatorios" },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        slug,
        category: category || "IPAD",
        brand: brand || "Apple",
        model: model || title,
        title,
        subtitle: subtitle || "",
        description: description || "",
        basePrice: Number(basePrice),
        condition: condition || "Reacondicionado Certificado",
        storage: storage || null,
        color: color || null,
        images: JSON.stringify(images || []),
        highlights: JSON.stringify(highlights || []),
        includes: JSON.stringify(includes || []),
        stock: 10,
        isActive: true,
        // Crear specs y grades por defecto
        specs: {
          create: specs || [],
        },
        grades: {
          create: [
            {
              grade: "A+",
              label: "Como Nuevo",
              description: "Sin marcas de uso. Batería ≥ 95%.",
              priceModifier: 0,
              warranty: "6 meses",
            },
            {
              grade: "A",
              label: "Excelente",
              description: "Microdesgaste imperceptible.",
              priceModifier: -25000,
              warranty: "4 meses",
            },
            {
              grade: "B",
              label: "Muy Bueno",
              description: "Uso visible en bordes.",
              priceModifier: -50000,
              warranty: "3 meses",
            },
          ],
        },
      },
    });

    return NextResponse.json({ ok: true, product });
  } catch (error) {
    console.error("❌ /api/admin/products POST error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/products?id=<productId>
 * Elimina un producto (soft delete poniendo isActive=false, o hard delete).
 */
export async function DELETE(req: Request) {
  try {
    const auth = await checkAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    // Soft delete: marcar como inactivo (preserva historial de pedidos)
    await db.product.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ /api/admin/products DELETE error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

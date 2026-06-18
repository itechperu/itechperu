import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { error: "No autenticado", status: 401 };
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return { error: "Acceso denegado", status: 403 };
  }
  return { ok: true };
}

/**
 * GET /api/admin/orders
 * Lista todos los pedidos con items.
 */
export async function GET() {
  try {
    const auth = await checkAdmin();
    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const orders = await db.order.findMany({
      include: {
        items: {
          select: {
            id: true,
            productTitle: true,
            productImage: true,
            grade: true,
            unitPrice: true,
            quantity: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("❌ /api/admin/orders error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

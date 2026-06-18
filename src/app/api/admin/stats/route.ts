import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/**
 * GET /api/admin/stats
 *
 * Retorna KPIs del dashboard admin:
 *  - totalOrders, pendingOrders, totalRevenue, totalUsers, totalProducts
 *  - recentOrders (5 más recientes)
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    // Verificar rol admin
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { role: true },
    });
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    const [
      totalOrders,
      pendingOrders,
      orders,
      totalUsers,
      totalProducts,
      recentOrders,
    ] = await Promise.all([
      db.order.count(),
      db.order.count({
        where: { status: { in: ["PENDING", "PROCESSING"] } },
      }),
      db.order.findMany({
        where: { status: { in: ["PAID", "DELIVERED", "COD_CONFIRMED"] } },
        select: { total: true },
      }),
      db.user.count(),
      db.product.count(),
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderNumber: true,
          status: true,
          total: true,
          customerName: true,
          createdAt: true,
        },
      }),
    ]);

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    return NextResponse.json({
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalUsers,
      totalProducts,
      recentOrders,
    });
  } catch (error) {
    console.error("❌ /api/admin/stats error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

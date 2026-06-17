import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateOrderNumber } from "@/lib/format";

/**
 * POST /api/orders/cash-on-delivery
 *
 * Crea un pedido con método de pago Contraentrega (sin Mercado Pago).
 * Solo disponible para Lima Metropolitana.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { ok: false, error: "Debes iniciar sesión" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { items, customer, shipping } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Carrito vacío" },
        { status: 400 }
      );
    }

    // Validar que sea Lima para contraentrega
    if (shipping?.city && shipping.city !== "Lima") {
      return NextResponse.json(
        { ok: false, error: "Contraentrega solo disponible en Lima" },
        { status: 400 }
      );
    }

    // Cargar productos y calcular totales
    const dbItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
        include: { grades: true },
      });
      if (!product) continue;

      const grade = product.grades.find((g) => g.grade === item.grade);
      if (!grade) continue;

      const unitPrice = product.basePrice + grade.priceModifier;
      subtotal += unitPrice * item.quantity;

      dbItems.push({
        productId: product.id,
        productTitle: product.title,
        productImage: JSON.parse(product.images)[0] || null,
        grade: item.grade,
        unitPrice,
        quantity: item.quantity,
      });
    }

    const shippingCost = subtotal >= 150000 ? 0 : 1500;
    const total = subtotal + shippingCost;

    // Generar número de orden
    const orderCount = await db.order.count();
    const orderNumber = generateOrderNumber(orderCount + 1);

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: user?.id || "guest",
        status: "COD_CONFIRMED",
        paymentMethod: "CASH_ON_DELIVERY",
        subtotal,
        discount: 0,
        shipping: shippingCost,
        total,
        currency: "PEN",
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || null,
        notes: shipping?.reference || null,
        items: {
          create: dbItems,
        },
      },
      include: { items: true },
    });

    // Log del evento
    await db.paymentLog.create({
      data: {
        orderId: order.id,
        event: "cod_created",
        payload: JSON.stringify({ customer, shipping }),
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: total / 100,
      message: "Pedido creado. Te contactaremos por WhatsApp para coordinar la entrega.",
    });
  } catch (error) {
    console.error("❌ COD order error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error interno",
      },
      { status: 500 }
    );
  }
}

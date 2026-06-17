import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { createPreference } from "@/lib/mercadopago";
import { generateOrderNumber } from "@/lib/format";

/**
 * POST /api/mercadopago/create-preference
 *
 * Crea una preferencia de pago en Mercado Pago para un pedido.
 *
 * Body:
 *   {
 *     items: [{ productId, grade, quantity }],
 *     customer: { name, email, phone },
 *     shipping: { address, district } // o null si es recojo en tienda
 *   }
 *
 * Response:
 *   {
 *     ok: true,
 *     orderId: "ITP-2026-00001",
 *     initPoint: "https://www.mercadopago.com.pe/checkout/...",
 *   }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { ok: false, error: "Debes iniciar sesión para comprar" },
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

    // 1. Cargar productos de la DB y calcular totales
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
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      dbItems.push({
        productId: product.id,
        productTitle: product.title,
        productImage: JSON.parse(product.images)[0] || null,
        grade: item.grade,
        unitPrice,
        quantity: item.quantity,
      });
    }

    if (dbItems.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Productos no encontrados" },
        { status: 400 }
      );
    }

    // 2. Calcular envío (gratis en Lima, S/15 provincias)
    const shippingCost = shipping?.district ? 0 : 1500; // S/15 si no hay dirección (recojo no aplica)
    const total = subtotal + shippingCost;

    // 3. Generar número de orden
    const orderCount = await db.order.count();
    const orderNumber = generateOrderNumber(orderCount + 1);

    // 4. Crear la orden en DB
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: user?.id || "guest",
        status: "PENDING",
        paymentMethod: "MERCADO_PAGO",
        subtotal,
        discount: 0,
        shipping: shippingCost,
        total,
        currency: "PEN",
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || null,
        items: {
          create: dbItems,
        },
      },
    });

    // 5. Crear preferencia en MP
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const preference = await createPreference({
      orderId: order.id,
      items: dbItems.map((item) => ({
        id: item.productId,
        title: item.productTitle,
        description: `Grado ${item.grade} · itechperu.shop`,
        pictureUrl: item.productImage || undefined,
        quantity: item.quantity,
        unitPrice: item.unitPrice / 100, // MP recibe soles, no centavos
      })),
      payer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      },
      backUrls: {
        success: `${siteUrl}/checkout/success?order=${order.id}`,
        failure: `${siteUrl}/checkout/failure?order=${order.id}`,
        pending: `${siteUrl}/checkout/pending?order=${order.id}`,
      },
      total: total / 100,
    });

    // 6. Guardar preference ID en la orden
    await db.order.update({
      where: { id: order.id },
      data: {
        mpPreferenceId: preference.id,
        mpInitPoint: preference.initPoint,
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      initPoint: preference.initPoint,
      sandboxInitPoint: preference.sandboxInitPoint,
      total: total / 100,
    });
  } catch (error) {
    console.error("❌ create-preference error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error interno",
      },
      { status: 500 }
    );
  }
}

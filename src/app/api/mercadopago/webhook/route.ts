import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getPayment } from "@/lib/mercadopago";

/**
 * Webhook de Mercado Pago — itechperu.shop
 *
 * Mercado Pago envía notificaciones (IPN/Webhook) a esta URL cuando el estado
 * de un pago cambia. Tipos de notificación:
 *
 *  - topic: "payment"  → data.id = payment_id
 *  - topic: "merchant_order" → data.id = merchant_order_id
 *  - type: "payment"    (nuevo formato)
 *
 * Flujo:
 *  1. MP notifica payment_id
 *  2. Consultamos el pago a MP con getPayment(id)
 *  3. Buscamos la orden por external_reference (nuestro order_id)
 *  4. Actualizamos el estado de la orden y registramos el log
 */
export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const topic = params.get("topic") || params.get("type");
    const paymentId = params.get("data.id") || params.get("id");

    // MP a veces envía el body en JSON, a veces solo query params
    let body: unknown = null;
    try {
      body = await req.json();
    } catch {
      // ignore parse errors
    }

    console.log("🔔 MP Webhook:", { topic, paymentId, body });

    // Si no es un pago, solo registrar
    if (topic !== "payment" && topic !== "Payment") {
      return NextResponse.json({ ok: true, message: "Ignored topic" });
    }

    if (!paymentId) {
      return NextResponse.json(
        { ok: false, error: "No payment id" },
        { status: 400 }
      );
    }

    // Consultar el pago a MP
    const payment = await getPayment(paymentId);

    if (!payment || !payment.external_reference) {
      return NextResponse.json(
        { ok: false, error: "Payment not found or no external_reference" },
        { status: 404 }
      );
    }

    const orderId = payment.external_reference;
    const status = payment.status || "unknown"; // approved, pending, rejected
    const mpPaymentId = String(payment.id);

    // Buscar la orden
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      console.error("❌ Order not found:", orderId);
      return NextResponse.json(
        { ok: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Registrar el evento en PaymentLog
    await db.paymentLog.create({
      data: {
        orderId: order.id,
        event: `payment_${status}`,
        payload: JSON.stringify({ payment, body, topic, paymentId }),
        mpPaymentId,
        mpStatus: status,
      },
    });

    // Actualizar la orden
    let newStatus: typeof order.status = "PENDING";
    if (status === "approved") newStatus = "PAID";
    else if (status === "rejected") newStatus = "CANCELLED";
    else if (status === "pending" || status === "in_process") newStatus = "PENDING";

    await db.order.update({
      where: { id: order.id },
      data: {
        mpPaymentId,
        mpStatus: status,
        status: newStatus,
      },
    });

    console.log(`✅ Order ${order.orderNumber} updated: ${newStatus}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ MP Webhook error:", error);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint para verificación de webhook (MP hace un GET inicial)
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;
  return NextResponse.json({
    ok: true,
    message: "itechperu.shop MP Webhook endpoint",
    receivedParams: Object.fromEntries(params.entries()),
  });
}

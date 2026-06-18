import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatPEN } from "@/lib/format";
import { CheckCircle2, Truck, MessageCircle, ArrowRight } from "lucide-react";

interface Props {
  searchParams: Promise<{ order?: string; cod?: string }>;
}

/**
 * Página de éxito tras pago en Mercado Pago o pedido contraentrega.
 *
 * URL: /checkout/success?order=<orderId>&cod=1  (contraentrega)
 * URL: /checkout/success?order=<orderId>        (Mercado Pago aprobado)
 */

// Render dinámico: lee la orden de DB en runtime.
export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order: orderId, cod } = await searchParams;

  let order = null;
  if (orderId) {
    try {
      order = await db.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });
    } catch {
      // ignore
    }
  }

  const isCOD = cod === "1";

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="rounded-3xl border border-[#E5E5E7] p-8 lg:p-12 text-center bg-white">
        {/* Check animado */}
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#10B981]/10 mb-4">
          <CheckCircle2 className="h-10 w-10 text-[#10B981]" strokeWidth={1.5} />
        </div>

        <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-[#1D1D1F]">
          {isCOD ? "¡Pedido confirmado!" : "¡Pago aprobado!"}
        </h1>

        <p className="mt-2 text-[14px] text-[#86868B] leading-relaxed max-w-md mx-auto">
          {isCOD
            ? "Recibimos tu pedido. Te contactaremos por WhatsApp para coordinar la entrega y el pago contra entrega."
            : "Tu pago ha sido procesado exitosamente. Recibirás un correo con la confirmación y el seguimiento de tu pedido."}
        </p>

        {/* Datos del pedido */}
        {order && (
          <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-5 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-[#86868B] font-medium">
                N° de pedido
              </span>
              <span className="text-[13px] font-mono font-semibold text-[#1D1D1F]">
                {order.orderNumber}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-[#86868B] font-medium">
                Método
              </span>
              <span className="text-[12px] font-medium text-[#1D1D1F]">
                {order.paymentMethod === "CASH_ON_DELIVERY"
                  ? "Contraentrega (Lima)"
                  : "Mercado Pago"}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider text-[#86868B] font-medium">
                Estado
              </span>
              <span className="inline-flex items-center rounded-full bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">
                {order.status === "COD_CONFIRMED" ? "Confirmado" : "Pagado"}
              </span>
            </div>
            <div className="border-t border-[#E5E5E7] pt-3 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#1D1D1F]">Total</span>
              <span className="text-[18px] font-bold text-[#1D1D1F]">
                {formatPEN(order.total)}
              </span>
            </div>

            {/* Items */}
            <div className="mt-4 pt-4 border-t border-[#E5E5E7] space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#1D1D1F] leading-tight line-clamp-1">
                      {item.productTitle}
                    </p>
                    <p className="text-[10px] text-[#86868B]">
                      Grado {item.grade} · Cantidad {item.quantity}
                    </p>
                  </div>
                  <span className="text-[12px] font-semibold text-[#1D1D1F]">
                    {formatPEN(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximos pasos */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#F5F5F7] p-4 text-center">
            <Truck className="h-5 w-5 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-[#1D1D1F] mt-1.5">
              Preparación
            </p>
            <p className="text-[10px] text-[#86868B]">24h hábiles</p>
          </div>
          <div className="rounded-2xl bg-[#F5F5F7] p-4 text-center">
            <MessageCircle className="h-5 w-5 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-[#1D1D1F] mt-1.5">
              Coordinación
            </p>
            <p className="text-[10px] text-[#86868B]">Vía WhatsApp</p>
          </div>
          <div className="rounded-2xl bg-[#F5F5F7] p-4 text-center">
            <CheckCircle2 className="h-5 w-5 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-[#1D1D1F] mt-1.5">
              Entrega
            </p>
            <p className="text-[10px] text-[#86868B]">24-48h en Lima</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a
            href="https://wa.me/51987654321?text=Hola%2C%20acabo%20de%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E5E5E7] px-6 py-3 text-[13px] font-semibold text-[#1D1D1F] tap-scale"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            WhatsApp VIP
          </a>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { AlertCircle, ArrowRight, RotateCcw } from "lucide-react";

/**
 * Página de fallo tras pago en Mercado Pago.
 */
export default function CheckoutFailurePage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="rounded-3xl border border-[#EF4444]/30 p-8 lg:p-12 text-center bg-white">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#EF4444]/10 mb-4">
          <AlertCircle className="h-10 w-10 text-[#EF4444]" strokeWidth={1.5} />
        </div>

        <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-[#1D1D1F]">
          Pago no completado
        </h1>

        <p className="mt-2 text-[14px] text-[#86868B] leading-relaxed max-w-md mx-auto">
          Tu pago no pudo ser procesado. Esto puede deberse a fondos insuficientes,
          datos incorrectos de la tarjeta o que el banco rechazó la transacción.
        </p>

        <div className="mt-6 rounded-2xl bg-[#F5F5F7] p-4 text-left">
          <p className="text-[11px] uppercase tracking-wider text-[#86868B] font-medium mb-2">
            ¿Qué puedes hacer?
          </p>
          <ul className="space-y-1.5 text-[12px] text-[#1D1D1F]">
            <li>• Verifica los datos de tu tarjeta e intenta de nuevo</li>
            <li>• Prueba con otro método de pago (Yape, PLIN, efectivo)</li>
            <li>• Elige pago contraentrega si estás en Lima</li>
            <li>• Contacta a tu banco para autorizar la transacción</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2} />
            Intentar de nuevo
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#E5E5E7] px-6 py-3 text-[13px] font-semibold text-[#1D1D1F] tap-scale"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

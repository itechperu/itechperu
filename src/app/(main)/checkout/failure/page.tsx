import Link from "next/link";
import { AlertCircle, ArrowRight, RotateCcw } from "lucide-react";

/**
 * Página de fallo tras pago en Mercado Pago.
 */
export default function CheckoutFailurePage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="rounded-3xl border border-[#EF4444]/30 p-8 lg:p-12 text-center bg-[var(--bg-primary)]">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#EF4444]/10 mb-4">
          <AlertCircle className="h-10 w-10 text-[#EF4444]" strokeWidth={1.5} />
        </div>

        <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-[var(--text-primary)]">
          Pago no completado
        </h1>

        <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
          Tu pago no pudo ser procesado. Esto puede deberse a fondos insuficientes,
          datos incorrectos de la tarjeta o que el banco rechazó la transacción.
        </p>

        <div className="mt-6 rounded-2xl bg-[var(--bg-secondary)] p-4 text-left">
          <p className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-medium mb-2">
            ¿Qué puedes hacer?
          </p>
          <ul className="space-y-1.5 text-[12px] text-[var(--text-primary)]">
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
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[var(--border-color)] px-6 py-3 text-[13px] font-semibold text-[var(--text-primary)] tap-scale"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}

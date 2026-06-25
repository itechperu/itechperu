import Link from "next/link";
import { Clock, ArrowRight, MessageCircle } from "lucide-react";

/**
 * Página de pago pendiente (Mercado Pago).
 * Sucede cuando el pago está en proceso (ej. transferencia bancaria).
 */
export default function CheckoutPendingPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="rounded-3xl border border-[#F59E0B]/30 p-8 lg:p-12 text-center bg-[var(--bg-primary)]">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#F59E0B]/10 mb-4">
          <Clock className="h-10 w-10 text-[#F59E0B]" strokeWidth={1.5} />
        </div>

        <h1 className="text-[28px] lg:text-[32px] font-bold tracking-tight text-[var(--text-primary)]">
          Pago en proceso
        </h1>

        <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
          Tu pago está siendo procesado. Esto puede tardar unos minutos (o hasta
          24 horas en transferencias bancarias). Te notificaremos por correo al
          confirmarse.
        </p>

        <div className="mt-6 rounded-2xl bg-[var(--bg-secondary)] p-4 text-left">
          <p className="text-[12px] text-[var(--text-primary)]">
            💡 <span className="font-semibold">Importante:</span> No vuelvas a
            realizar el pago. Si el proceso tarda más de 24 horas, contáctanos
            por WhatsApp con tu número de pedido.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <a
            href="https://wa.me/51987654321?text=Hola%2C%20mi%20pago%20esta%20pendiente"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[var(--border-color)] px-6 py-3 text-[13px] font-semibold text-[var(--text-primary)] tap-scale"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

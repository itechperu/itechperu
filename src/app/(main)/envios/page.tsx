import type { Metadata } from "next";
import { Truck, Clock, MapPin, Package, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Envíos y Cobertura — itechperu.shop",
  description:
    "Envío express 24-48h en Lima Metropolitana. Cobertura nacional a todo Perú. Contraentrega disponible en Lima. Tarifas y tiempos claros.",
  alternates: { canonical: "/envios" },
};

export default function EnviosPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <section className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#3B82F6]/10 px-2.5 py-1 mb-4">
          <Truck className="h-3 w-3 text-[#3B82F6]" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-[#3B82F6] tracking-wide">
            Cobertura nacional
          </span>
        </div>
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">
          Envíos y cobertura
        </h1>
        <p className="mt-3 text-[14px] text-[var(--text-secondary)] max-w-2xl mx-auto">
          Llevamos tu tecnología premium a todo Perú. Envío express en Lima,
          cobertura nacional en 3-5 días hábiles.
        </p>
      </section>

      {/* Tabla de envíos */}
      <section className="rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
          <div className="text-center">
            <MapPin className="h-5 w-5 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-[var(--text-primary)] mt-1">Zona</p>
          </div>
          <div className="text-center">
            <Clock className="h-5 w-5 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-[var(--text-primary)] mt-1">Tiempo</p>
          </div>
          <div className="text-center">
            <Package className="h-5 w-5 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[11px] font-semibold text-[var(--text-primary)] mt-1">Costo</p>
          </div>
        </div>

        {[
          { zona: "Lima Metropolitana", tiempo: "24-48 horas", costo: "Gratis sobre S/1,500" },
          { zona: "Callao", tiempo: "24-48 horas", costo: "S/ 15" },
          { zona: "Arequipa, Trujillo, Chiclayo", tiempo: "3-4 días hábiles", costo: "S/ 25" },
          { zona: "Cusco, Piura, Tacna", tiempo: "4-5 días hábiles", costo: "S/ 35" },
          { zona: "Otros provincias", tiempo: "5-7 días hábiles", costo: "S/ 40" },
        ].map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-3 gap-4 p-4 ${i % 2 === 0 ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-secondary)]/50"}`}
          >
            <p className="text-[12px] font-medium text-[var(--text-primary)] text-center">{row.zona}</p>
            <p className="text-[12px] text-[var(--text-secondary)] text-center">{row.tiempo}</p>
            <p className="text-[12px] font-semibold text-[#D4AF37] text-center">{row.costo}</p>
          </div>
        ))}
      </section>

      {/* Contraentrega */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-8 text-white">
        <div className="flex items-start gap-4">
          <CreditCard className="h-8 w-8 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
          <div>
            <h2 className="text-[18px] font-bold mb-2">Pago contraentrega en Lima</h2>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Solo para Lima Metropolitana. Recibe tu equipo, revísalo con el mensajero,
              y paga en efectivo al recibir. Sin riesgo, sin sorpresas. El mensajero
              espera mientras verificas que todo está perfecto.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 px-3 py-1">
              <span className="text-[11px] font-medium text-[#D4AF37]">
                Disponible solo en Lima Metropolitana
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section>
        <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-4 text-center">
          ¿Cómo funciona?
        </h2>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { num: "1", title: "Compras", desc: "Mercado Pago o contraentrega" },
            { num: "2", title: "Preparamos", desc: "Empaque Deluxe + verificación final" },
            { num: "3", title: "Enviamos", desc: "Te notificamos el tracking" },
            { num: "4", title: "Recibes", desc: "Coordina con el mensajero" },
          ].map((step) => (
            <div key={step.num} className="rounded-2xl bg-[var(--bg-secondary)] p-4 text-center">
              <span className="flex h-8 w-8 mx-auto items-center justify-center rounded-full bg-[#1D1D1F] text-[12px] font-bold text-white">
                {step.num}
              </span>
              <p className="text-[13px] font-semibold text-[var(--text-primary)] mt-2">{step.title}</p>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Link
          href="/coleccion"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
        >
          Comprar ahora
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

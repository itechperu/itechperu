import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Clock, RefreshCw, Award, CheckCircle2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Garantía Deluxe — itechperu.shop",
  description:
    "Garantía real de 3 a 6 meses en todos nuestros equipos. 47 puntos de inspección técnica. 7 días de devolución sin preguntas. Confianza absoluta.",
  alternates: { canonical: "/garantia" },
};

export default function GarantiaPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <section className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/10 px-2.5 py-1 mb-4">
          <ShieldCheck className="h-3 w-3 text-[#10B981]" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-[#10B981] tracking-wide">
            Confianza absoluta
          </span>
        </div>
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[#1D1D1F]">
          Garantía Deluxe
        </h1>
        <p className="mt-3 text-[14px] text-[#86868B] max-w-2xl mx-auto leading-relaxed">
          No vendemos equipos usados. Vendemos equipos verificados con garantía real,
          sin letra pequeña. Así de simple.
        </p>
      </section>

      {/* Sistema de Grados */}
      <section className="rounded-3xl bg-white border border-[#E5E5E7] p-6 lg:p-8">
        <h2 className="text-[18px] font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
          Sistema de Grados
        </h2>
        <div className="space-y-3">
          {[
            {
              grade: "A+",
              label: "Como Nuevo",
              desc: "Sin marcas de uso. Batería ≥ 95%. Caja original.",
              warranty: "6 meses",
              color: "bg-[#D4AF37]",
            },
            {
              grade: "A",
              label: "Excelente",
              desc: "Microdesgaste imperceptible. Batería ≥ 90%.",
              warranty: "4 meses",
              color: "bg-[#1D1D1F]",
            },
            {
              grade: "B",
              label: "Muy Bueno",
              desc: "Uso visible en bordes. Batería ≥ 85%. 100% funcional.",
              warranty: "3 meses",
              color: "bg-[#86868B]",
            },
          ].map((g) => (
            <div
              key={g.grade}
              className="flex items-center gap-4 rounded-2xl bg-[#F5F5F7] p-4"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-[14px] font-bold text-white ${g.color}`}
              >
                {g.grade}
              </span>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#1D1D1F]">
                  Grado {g.grade} — {g.label}
                </p>
                <p className="text-[12px] text-[#86868B]">{g.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-[#86868B]">Garantía</p>
                <p className="text-[14px] font-bold text-[#D4AF37]">{g.warranty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 47 puntos */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-8 text-white">
        <h2 className="text-[18px] font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
          Protocolo de 47 puntos de inspección
        </h2>
        <p className="text-[13px] text-white/70 mb-4">
          Cada equipo pasa por un riguroso check técnico en Lima antes de ser aprobado para la venta:
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Batería (salud ≥ 85%)",
            "Pantalla (píxeles muertos, touch)",
            "Cámara frontal y trasera",
            "Conectividad Wi-Fi y Bluetooth",
            "Puertos USB-C / Lightning",
            "Altavoces y micrófono",
            "Sensores (proximidad, luz)",
            "Botones (volumen, power, home)",
            "Chasis (golpes, rayas, deformaciones)",
            "Software (restaurado de fábrica)",
            "Carga rápida verificada",
            "Pantalla True Tone / ProMotion",
            "Face ID / Touch ID",
            "GPS verificado",
            "Conectividad celular (si aplica)",
          ].map((point) => (
            <div key={point} className="flex items-center gap-2 text-[12px] text-white/80">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] flex-shrink-0" strokeWidth={2} />
              {point}
            </div>
          ))}
        </div>
      </section>

      {/* Devolución */}
      <section className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <RefreshCw className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
          <h3 className="text-[14px] font-semibold text-[#1D1D1F] mt-2">
            7 días de devolución
          </h3>
          <p className="text-[12px] text-[#86868B] mt-1 leading-relaxed">
            Si no quedas satisfecho con tu equipo, tienes 7 días para devolverlo. Sin
            preguntas, sin letra pequeña. Reembolso completo.
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <Clock className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
          <h3 className="text-[14px] font-semibold text-[#1D1D1F] mt-2">
            Atención prioritaria
          </h3>
          <p className="text-[12px] text-[#86868B] mt-1 leading-relaxed">
            ¿Problema con tu equipo? Escríbenos por WhatsApp VIP y te atendemos
            prioritariamente. Soporte real, no chatbots.
          </p>
        </div>
      </section>

      <section className="text-center">
        <Link
          href="/coleccion"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
        >
          Explorar catálogo verificado
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

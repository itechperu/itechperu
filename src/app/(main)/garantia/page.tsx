import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, Clock, RefreshCw, CheckCircle2, ChevronRight, Wrench, Truck, CreditCard, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Garantía Deluxe — Reparación y Garantía en Perú | itechperu.shop",
  description:
    "Garantía real de 3 a 6 meses en todos nuestros equipos. Protocolo de 47 puntos de inspección técnica en Lima. 7 días de devolución. Servicio técnico especializado para MacBook, iPad y laptops.",
  alternates: { canonical: "/garantia" },
  openGraph: {
    title: "Garantía Deluxe — itechperu.shop",
    description: "Garantía real de 3-6 meses. 47 puntos de inspección. 7 días devolución. Servicio técnico especializado en Lima.",
    type: "website",
    locale: "es_PE",
  },
};

const faqs = [
  {
    q: "¿Qué cubre la garantía?",
    a: "La garantía cubre defectos de fábrica y funcionamiento: pantalla, batería, carga, conectividad, botones, cámaras y puertos. No cubre daños por mal uso como caídas, líquidos o modificaciones no autorizadas.",
  },
  {
    q: "¿Cuánto dura la garantía según el grado?",
    a: "El Grado A+ (Como Nuevo) incluye 6 meses de garantía. El Grado A (Excelente) incluye 4 meses. El Grado B (Muy Bueno) incluye 3 meses. Todos con la misma cobertura de defectos de fábrica.",
  },
  {
    q: "¿Qué pasa si el equipo falla durante la garantía?",
    a: "Si el equipo falla dentro del período de garantía por un defecto cubierto, lo reparamos sin costo. Si no se puede reparar, te damos un equipo equivalente. Si no hay stock disponible, reembolsamos el 100% del pago.",
  },
  {
    q: "¿Puedo devolver el equipo si no me gusta?",
    a: "Sí. Tienes 7 días calendario desde la recepción para devolver el equipo sin preguntas. Debe estar en las mismas condiciones recibidas. Reembolso completo del producto (los gastos de envío no son reembolsables).",
  },
  {
    q: "¿El servicio técnico está incluido en la garantía?",
    a: "Sí, el servicio técnico por defectos cubiertos por garantía es completamente gratuito. Si el problema no está cubierto, te damos una cotización transparente antes de proceder.",
  },
  {
    q: "¿Hacen servicio técnico después de que expira la garantía?",
    a: "Sí, ofrecemos servicio técnico de pago para equipos fuera de garantía. Diagnóstico gratuito, repuestos originales y garantía de 90 días sobre la mano de obra.",
  },
];

export default function GarantiaPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "itechperu.shop",
    url: "https://itechperu.shop",
    areaServed: { "@type": "Country", name: "Perú" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-987-654-321",
      contactType: "customer service",
      areaServed: "PE",
    },
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />

      {/* Hero */}
      <section className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/10 px-3 py-1.5 mb-4">
          <ShieldCheck className="h-4 w-4 text-[#10B981]" strokeWidth={1.5} />
          <span className="text-[11px] font-medium text-[#10B981] tracking-wide">Confianza absoluta</span>
        </div>
        <h1 className="text-[28px] lg:text-[44px] font-bold tracking-tight text-[#1D1D1F]">
          Garantía Deluxe
        </h1>
        <p className="mt-4 text-[15px] lg:text-[17px] text-[#86868B] leading-relaxed max-w-xl mx-auto">
          No vendemos equipos usados. Vendemos equipos verificados con garantía real,
          sin letra pequeña. Cada equipo pasa por 47 puntos de inspección técnica en Lima.
          Así de simple.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { icon: ShieldCheck, value: "3-6", label: "Meses de garantía", accent: true },
          { icon: Award, value: "47", label: "Puntos de inspección" },
          { icon: RefreshCw, value: "7", label: "Días de devolución" },
          { icon: Star, value: "4.9/5", label: "+500 calificaciones" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl bg-white border border-[#E5E5E7] p-5 text-center">
            <stat.icon className={`h-6 w-6 mx-auto ${stat.accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"}`} strokeWidth={1.5} />
            <p className={`text-[24px] font-bold mt-2 ${stat.accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"}`}>{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Proceso de inspección */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-10 mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
          <h2 className="text-[18px] lg:text-[22px] font-bold text-white">Protocolo de 47 puntos de inspección</h2>
        </div>
        <p className="text-[14px] text-white/70 mb-6 max-w-2xl">
          Cada equipo pasa por un riguroso check técnico en Lima antes de ser aprobado para la venta.
          Si un punto falla, el equipo se repara o se rechaza. Así de estricto.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { cat: "Batería", items: ["Salud ≥ 85%", "Ciclos verificados", "Carga rápida testeada", "Duración real medida"] },
            { cat: "Pantalla", items: ["Píxeles muertos (0)", "Touch funcional", "True Tone operativo", "Retroiluminación uniforme"] },
            { cat: "Procesador", items: ["Rendimiento CPU", "Thermal throttling", "Stress test 30 min", "Geekbench score"] },
            { cat: "Cámara", items: ["Cámara frontal", "Cámara trasera", "Autoenfoque", "Flash/Flash True Tone"] },
            { cat: "Conectividad", items: ["Wi-Fi 2.4/5GHz", "Bluetooth 5.0+", "GPS verificado", "USB-C/Lightning"] },
            { cat: "Físico", items: ["Chasis sin deformaciones", "Botones responsivos", "Altavoces claros", "Micrófonos funcionales"] },
            { cat: "Software", items: ["Restaurado de fábrica", "Sin iCloud Lock", "Sin MDM", "Última versión OS"] },
            { cat: "Seguridad", items: ["IMEI/Serie limpio (SISATEC)", "Sin reporte de robo", "Face ID/Touch ID", "Find My desactivado"] },
            { cat: "Accesorios", items: ["Cargador original", "Cable verificado", "Caja Deluxe", "Sello de garantía"] },
          ].map((group, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <h3 className="text-[13px] font-bold text-[#D4AF37] mb-2">{group.cat}</h3>
              <ul className="space-y-1">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <CheckCircle2 className="h-3 w-3 text-[#10B981] flex-shrink-0" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Sistema de Grados */}
      <section className="mb-12">
        <h2 className="text-[18px] lg:text-[22px] font-bold text-[#1D1D1F] mb-4 text-center">Sistema de Grados</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { grade: "A+", label: "Como Nuevo", desc: "Sin marcas de uso. Batería ≥ 95%. Caja original.", warranty: "6 meses", color: "bg-[#D4AF37]" },
            { grade: "A", label: "Excelente", desc: "Microdesgaste imperceptible. Batería ≥ 90%.", warranty: "4 meses", color: "bg-[#1D1D1F]" },
            { grade: "B", label: "Muy Bueno", desc: "Uso visible en bordes. Batería ≥ 85%. 100% funcional.", warranty: "3 meses", color: "bg-[#86868B]" },
          ].map((g) => (
            <div key={g.grade} className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
              <span className={`flex h-12 w-12 items-center justify-center rounded-full text-[14px] font-bold text-white ${g.color}`}>{g.grade}</span>
              <h3 className="text-[15px] font-bold text-[#1D1D1F] mt-3">Grado {g.grade} — {g.label}</h3>
              <p className="text-[12px] text-[#86868B] mt-1">{g.desc}</p>
              <p className="text-[14px] font-bold text-[#D4AF37] mt-2">Garantía: {g.warranty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid sm:grid-cols-2 gap-4 mb-12">
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <RefreshCw className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
          <h3 className="text-[15px] font-bold text-[#1D1D1F] mt-3">7 días de devolución</h3>
          <p className="text-[12px] text-[#86868B] mt-1 leading-relaxed">
            Si no quedas satisfecho, tienes 7 días para devolverlo. Sin preguntas, sin letra
            pequeña. Reembolso completo del producto.
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <Headphones className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
          <h3 className="text-[15px] font-bold text-[#1D1D1F] mt-3">Soporte VIP</h3>
          <p className="text-[12px] text-[#86868B] mt-1 leading-relaxed">
            ¿Problema con tu equipo? Escríbenos por WhatsApp VIP y te atendemos
            prioritariamente. Soporte real, no chatbots.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-[18px] lg:text-[22px] font-bold text-[#1D1D1F] mb-4 text-center">Preguntas frecuentes sobre garantía</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white border border-[#E5E5E7] p-4">
              <h3 className="text-[14px] font-semibold text-[#1D1D1F] flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                {faq.q}
              </h3>
              <p className="mt-2 ml-6 text-[13px] text-[#1D1D1F]/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <Link href="/coleccion" className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-6 py-3 text-[14px] font-semibold text-white tap-scale">
          Explorar catálogo verificado <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

function Star({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg className={className} strokeWidth={strokeWidth ?? 1.5} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

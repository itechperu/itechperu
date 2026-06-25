import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, Clock, RefreshCw, CheckCircle2, ChevronRight, Wrench, Headphones } from "lucide-react";
import { BackButton } from "@/components/deluxe/back-button";

export const metadata: Metadata = {
  title: "Garantía Deluxe — Reparación y Garantía en Perú | itechperu.shop",
  description:
    "Garantía real de 3 a 6 meses en todos nuestros equipos. Protocolo de 47 puntos de inspección técnica en Lima. 7 días de devolución. Servicio técnico especializado.",
  alternates: { canonical: "/garantia" },
};

const faqs = [
  { q: "¿Qué cubre la garantía?", a: "La garantía cubre defectos de fábrica y funcionamiento: pantalla, batería, carga, conectividad, botones, cámaras y puertos. No cubre daños por mal uso como caídas, líquidos o modificaciones no autorizadas." },
  { q: "¿Cuánto dura la garantía según el grado?", a: "El Grado A+ (Como Nuevo) incluye 6 meses de garantía. El Grado A (Excelente) incluye 4 meses. El Grado B (Muy Bueno) incluye 3 meses. Todos con la misma cobertura de defectos de fábrica." },
  { q: "¿Qué pasa si el equipo falla durante la garantía?", a: "Si el equipo falla dentro del período de garantía por un defecto cubierto, lo reparamos sin costo. Si no se puede reparar, te damos un equipo equivalente. Si no hay stock disponible, reembolsamos el 100% del pago." },
  { q: "¿Puedo devolver el equipo si no me gusta?", a: "Sí. Tienes 7 días calendario desde la recepción para devolver el equipo sin preguntas. Debe estar en las mismas condiciones recibidas. Reembolso completo del producto." },
  { q: "¿El servicio técnico está incluido en la garantía?", a: "Sí, el servicio técnico por defectos cubiertos por garantía es completamente gratuito. Si el problema no está cubierto, te damos una cotización transparente antes de proceder." },
  { q: "¿Hacen servicio técnico después de que expira la garantía?", a: "Sí, ofrecemos servicio técnico de pago para equipos fuera de garantía. Diagnóstico gratuito, repuestos originales y garantía de 90 días sobre la mano de obra." },
];

const INSPECTION_POINTS = [
  { cat: "Batería", items: ["Salud ≥ 85%", "Ciclos verificados", "Carga rápida testeada", "Duración real medida"] },
  { cat: "Pantalla", items: ["Píxeles muertos (0)", "Touch funcional", "True Tone operativo", "Retroiluminación uniforme"] },
  { cat: "Procesador", items: ["Rendimiento CPU", "Thermal throttling", "Stress test 30 min", "Geekbench score"] },
  { cat: "Cámara", items: ["Cámara frontal", "Cámara trasera", "Autoenfoque", "Flash/Flash True Tone"] },
  { cat: "Conectividad", items: ["Wi-Fi 2.4/5GHz", "Bluetooth 5.0+", "GPS verificado", "USB-C/Lightning"] },
  { cat: "Físico", items: ["Chasis sin deformaciones", "Botones responsivos", "Altavoces claros", "Micrófonos funcionales"] },
  { cat: "Software", items: ["Restaurado de fábrica", "Sin iCloud Lock", "Sin MDM", "Última versión OS"] },
  { cat: "Seguridad", items: ["IMEI/Serie limpio (SISATEC)", "Sin reporte de robo", "Face ID/Touch ID", "Find My desactivado"] },
  { cat: "Accesorios", items: ["Cargador original", "Cable verificado", "Caja Deluxe", "Sello de garantía"] },
];

const GRADES = [
  { grade: "A+", label: "Como Nuevo", desc: "Sin marcas de uso. Batería ≥ 95%. Caja original.", warranty: "6 meses" },
  { grade: "A", label: "Excelente", desc: "Microdesgaste imperceptible. Batería ≥ 90%.", warranty: "4 meses" },
  { grade: "B", label: "Muy Bueno", desc: "Uso visible en bordes. Batería ≥ 85%. 100% funcional.", warranty: "3 meses" },
];

export default function GarantiaPage() {
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10 py-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <BackButton />

      {/* Hero */}
      <section className="mb-20 lg:mb-28">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-3">Garantía Deluxe</p>
        <h1 className="text-[32px] lg:text-[52px] font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          Confianza absoluta,
          <br />
          <span className="text-[#D4AF37]">sin letra pequeña.</span>
        </h1>
        <p className="mt-6 text-[16px] lg:text-[18px] text-[var(--text-secondary)] leading-[1.7]">
          No vendemos equipos usados. Vendemos equipos verificados con garantía real.
          Cada equipo pasa por 47 puntos de inspección técnica en Lima.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-20 lg:mb-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {[{ v: "3-6", l: "Meses de garantía" }, { v: "47", l: "Puntos de inspección" }, { v: "7", l: "Días de devolución" }, { v: "4.9/5", l: "+500 calificaciones" }].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[36px] lg:text-[48px] font-bold tracking-tight text-[var(--text-primary)]">{s.v}</p>
              <p className="text-[12px] uppercase tracking-wider text-[var(--text-secondary)] mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-20 lg:mb-28" />

      {/* 47 puntos — grilla editorial sin cards */}
      <section className="mb-20 lg:mb-28">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">Protocolo de inspección</p>
        <h2 className="text-[24px] lg:text-[36px] font-bold tracking-tight text-[var(--text-primary)] mb-10">
          47 puntos de control
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {INSPECTION_POINTS.map((group, i) => (
            <div key={i}>
              <h3 className="text-[14px] font-bold text-[var(--text-primary)] mb-3">{group.cat}</h3>
              <ul className="space-y-1.5">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#D4AF37] flex-shrink-0" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-20 lg:mb-28" />

      {/* Grados — editorial sin cards */}
      <section className="mb-20 lg:mb-28">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">Sistema de Grados</p>
        <h2 className="text-[24px] lg:text-[36px] font-bold tracking-tight text-[var(--text-primary)] mb-10">
          Tres niveles de condición
        </h2>
        <div className="grid sm:grid-cols-3 gap-x-8">
          {GRADES.map((g, i) => (
            <div key={g.grade} className={i > 0 ? "sm:border-l sm:border-[var(--border-color)] sm:pl-8" : ""}>
              <p className="text-[40px] font-bold text-[#D4AF37]">{g.grade}</p>
              <p className="text-[16px] font-semibold text-[var(--text-primary)] mt-1">{g.label}</p>
              <p className="text-[13px] text-[var(--text-secondary)] mt-2 leading-relaxed">{g.desc}</p>
              <p className="text-[14px] font-bold text-[var(--text-primary)] mt-4">Garantía: {g.warranty}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-20 lg:mb-28" />

      {/* Devolución + Soporte */}
      <section className="mb-20 lg:mb-28">
        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <RefreshCw className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
            <h3 className="text-[18px] font-bold text-[var(--text-primary)] mt-4">7 días de devolución</h3>
            <p className="text-[14px] text-[var(--text-secondary)] mt-2 leading-relaxed">
              Si no quedas satisfecho, tienes 7 días para devolverlo. Sin preguntas, sin letra pequeña. Reembolso completo del producto.
            </p>
          </div>
          <div>
            <Headphones className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
            <h3 className="text-[18px] font-bold text-[var(--text-primary)] mt-4">Soporte VIP</h3>
            <p className="text-[14px] text-[var(--text-secondary)] mt-2 leading-relaxed">
              ¿Problema con tu equipo? Escríbenos por WhatsApp VIP y te atendemos prioritariamente. Soporte real, no chatbots.
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-20 lg:mb-28" />

      {/* FAQ */}
      <section className="mb-20 lg:mb-28">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">Preguntas frecuentes</p>
        <h2 className="text-[24px] lg:text-[36px] font-bold tracking-tight text-[var(--text-primary)] mb-10">
          Todo lo que necesitas saber
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">{faq.q}</h3>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-8">
        <Link href="/catalogo" className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] dark:bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-white dark:text-[#1D1D1F] hover:scale-[1.02] transition-transform">
          Explorar catálogo verificado <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

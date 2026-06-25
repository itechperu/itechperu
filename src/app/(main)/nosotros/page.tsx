import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, Users, Truck, Heart, Target, Eye, Sparkles, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros — itechperu.shop",
  description:
    "Conoce la historia de itechperu.shop: tecnología premium reacondicionada en Lima, Perú. Nuestra misión, valores y compromiso con la calidad y confianza.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <section className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-2.5 py-1 mb-4">
          <Sparkles className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
          <span className="text-[10px] font-medium text-[#D4AF37] tracking-wide">
            Nuestra historia
          </span>
        </div>
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">
          Tecnología premium,<br />
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
            precio inteligente
          </span>
        </h1>
        <p className="mt-4 text-[14px] lg:text-[16px] text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          itechperu.shop nació en Lima con una misión clara: democratizar el acceso a
          tecnología de alta gama en Perú, ofreciendo equipos reacondicionados premium
          con la confianza y transparencia que mereces.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, value: "+500", label: "Clientes felices" },
          { icon: ShieldCheck, value: "47", label: "Puntos de inspección" },
          { icon: Award, value: "4.9/5", label: "Calificación promedio" },
          { icon: Truck, value: "24-48h", label: "Envío en Lima" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-4 text-center"
          >
            <stat.icon className="h-6 w-6 mx-auto text-[#D4AF37]" strokeWidth={1.5} />
            <p className="text-[20px] lg:text-[24px] font-bold text-[var(--text-primary)] mt-2">
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Misión */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 lg:p-10">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
          <h2 className="text-[18px] lg:text-[22px] font-bold text-white">Misión</h2>
        </div>
        <p className="text-[14px] text-white/80 leading-relaxed">
          Democratizar el acceso a tecnología premium en Perú. Creemos que todos merecen
          equipos de alta gama a precios justos, sin sacrificar calidad ni confianza. Cada
          equipo que vendes pasa por nuestro protocolo de 47 puntos de inspección técnica
          en Lima, garantizando desempeño idéntico al de un equipo nuevo.
        </p>
      </section>

      {/* Visión */}
      <section className="rounded-3xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 lg:p-10">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
          <h2 className="text-[18px] lg:text-[22px] font-bold text-[var(--text-primary)]">Visión</h2>
        </div>
        <p className="text-[14px] text-[var(--text-primary)]/80 leading-relaxed">
          Ser la plataforma líder en tecnología reacondicionada premium del Perú, reconocida
          por su transparencia, calidad y experiencia de usuario Deluxe. Aspiramos a que cada
          peruano pueda acceder a tecnología de punta sin pagar precios inflados de marca nueva.
        </p>
      </section>

      {/* Valores */}
      <section>
        <h2 className="text-[18px] lg:text-[22px] font-bold tracking-tight text-[var(--text-primary)] mb-4 text-center">
          Nuestros valores
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: ShieldCheck,
              title: "Confianza absoluta",
              desc: "Transparencia total en el estado del producto. Si decimos que es Grado A+, lo es.",
            },
            {
              icon: Heart,
              title: "Experiencia Deluxe",
              desc: "Cada interacción con nuestro cliente debe sentirse premium, desde la web hasta la entrega.",
            },
            {
              icon: Award,
              title: "Calidad verificada",
              desc: "47 puntos de inspección técnica. Si no queda perfecto, no se vende.",
            },
          ].map((val) => (
            <div
              key={val.title}
              className="rounded-2xl bg-[var(--bg-secondary)] p-5"
            >
              <val.icon className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
              <h3 className="text-[14px] font-semibold text-[var(--text-primary)] mt-3">
                {val.title}
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-[20px] lg:text-[24px] font-bold text-[var(--text-primary)]">
          ¿Listo para la experiencia Deluxe?
        </h2>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
          Explora nuestro catálogo y encuentra tu próximo equipo premium
        </p>
        <Link
          href="/coleccion"
          className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#1D1D1F] px-6 py-3 text-[13px] font-semibold text-white tap-scale"
        >
          Ver catálogo
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BackButton } from "@/components/deluxe/back-button";

export const metadata: Metadata = {
  title: "Sobre Nosotros — itechperu.shop",
  description:
    "Conoce la historia de itechperu.shop: tecnología premium reacondicionada en Lima, Perú. Nuestra misión, valores y compromiso con la calidad y confianza.",
  alternates: { canonical: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-10 py-8 lg:py-16">
      <BackButton />

      {/* Historia */}
      <section className="mb-16 lg:mb-24">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-3">
          Nuestra Historia
        </p>
        <h1 className="text-[32px] lg:text-[52px] font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          Tecnología premium,
          <br />
          <span className="text-[#D4AF37]">precio inteligente.</span>
        </h1>
        <p className="mt-6 text-[16px] lg:text-[18px] text-[var(--text-secondary)] leading-[1.7]">
          itechperu.shop nació en Lima con una misión clara: democratizar el acceso a
          tecnología de alta gama en Perú, ofreciendo equipos reacondicionados premium
          con la confianza y transparencia que mereces. Cada equipo que vendemos pasa
          por nuestro protocolo de 47 puntos de inspección técnica, garantizando
          desempeño idéntico al de un equipo nuevo.
        </p>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-16 lg:mb-24" />

      {/* Misión */}
      <section className="mb-16 lg:mb-24">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
          Misión
        </p>
        <p className="text-[18px] lg:text-[22px] text-[var(--text-primary)] leading-[1.6] font-medium">
          Democratizar el acceso a tecnología premium en Perú. Creemos que todos merecen
          equipos de alta gama a precios justos, sin sacrificar calidad ni confianza.
        </p>
        <p className="mt-4 text-[15px] lg:text-[16px] text-[var(--text-secondary)] leading-[1.7]">
          Cada equipo que vendes pasa por nuestro protocolo de 47 puntos de inspección
          técnica en Lima, garantizando desempeño idéntico al de un equipo nuevo.
        </p>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-16 lg:mb-24" />

      {/* Visión */}
      <section className="mb-16 lg:mb-24">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
          Visión
        </p>
        <p className="text-[18px] lg:text-[22px] text-[var(--text-primary)] leading-[1.6] font-medium">
          Ser la plataforma líder en tecnología reacondicionada premium del Perú,
          reconocida por su transparencia, calidad y experiencia de usuario Deluxe.
        </p>
        <p className="mt-4 text-[15px] lg:text-[16px] text-[var(--text-secondary)] leading-[1.7]">
          Aspiramos a que cada peruano pueda acceder a tecnología de punta sin pagar
          precios inflados de marca nueva.
        </p>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-16 lg:mb-24" />

      {/* Stats */}
      <section className="mb-16 lg:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4">
          {[
            { value: "500+", label: "Clientes felices" },
            { value: "47", label: "Puntos de inspección" },
            { value: "4.9/5", label: "Calificación promedio" },
            { value: "24-48h", label: "Envío en Lima" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-[36px] lg:text-[48px] font-bold tracking-tight text-[var(--text-primary)]">
                {stat.value}
              </p>
              <p className="text-[12px] uppercase tracking-wider text-[var(--text-secondary)] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-16 lg:mb-24" />

      {/* Valores */}
      <section className="mb-16 lg:mb-24">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
          Nuestros Valores
        </p>
        <p className="text-[18px] lg:text-[22px] text-[var(--text-primary)] leading-[1.6] font-medium">
          Confianza absoluta. Experiencia Deluxe. Calidad verificada.
        </p>
        <p className="mt-4 text-[15px] lg:text-[16px] text-[var(--text-secondary)] leading-[1.7]">
          Transparencia total en el estado del producto. Si decimos que es Grado A+, lo es.
          Cada interacción con nuestro cliente debe sentirse premium, desde la web hasta
          la entrega. 47 puntos de inspección técnica. Si no queda perfecto, no se vende.
        </p>
      </section>

      <div className="h-px bg-[var(--border-color)] mb-16 lg:mb-24" />

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-[22px] lg:text-[28px] font-bold text-[var(--text-primary)] tracking-tight">
          ¿Listo para la experiencia Deluxe?
        </h2>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
          Explora nuestro catálogo y encuentra tu próximo equipo premium
        </p>
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1.5 mt-6 rounded-full bg-[#1D1D1F] dark:bg-[#D4AF37] px-6 py-3 text-[14px] font-semibold text-white dark:text-[#1D1D1F] hover:scale-[1.02] transition-transform"
        >
          Ver catálogo
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto — itechperu.shop",
  description:
    "Contáctanos por WhatsApp VIP, email o redes sociales. Atención de lunes a sábado, 9am a 8pm. Lima, Perú.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[#1D1D1F]">
          Hablemos
        </h1>
        <p className="mt-3 text-[14px] text-[#86868B]">
          Estamos aquí para ayudarte. Elige el canal que prefieras.
        </p>
      </section>

      {/* Canales */}
      <div className="grid sm:grid-cols-2 gap-3">
        <a
          href="https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20tengo%20una%20consulta"
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-5 text-white hover:scale-[1.02] transition-transform"
        >
          <MessageCircle className="h-8 w-8" strokeWidth={1.5} />
          <h2 className="text-[16px] font-bold mt-3">WhatsApp VIP</h2>
          <p className="text-[12px] text-white/80 mt-1">+51 987 654 321</p>
          <p className="text-[11px] text-white/60 mt-2">Respuesta en minutos</p>
        </a>

        <a
          href="mailto:hola@itechperu.shop"
          className="group rounded-2xl bg-white border border-[#E5E5E7] p-5 hover:border-[#D4AF37]/30 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5F5F7]">
            <Mail className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
          </div>
          <h2 className="text-[16px] font-bold mt-3 text-[#1D1D1F]">Email</h2>
          <p className="text-[12px] text-[#86868B] mt-1">hola@itechperu.shop</p>
          <p className="text-[11px] text-[#86868B] mt-2">Respuesta en 24h</p>
        </a>
      </div>

      {/* Info */}
      <section className="rounded-2xl bg-white border border-[#E5E5E7] p-5 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-semibold text-[#1D1D1F]">Ubicación</p>
            <p className="text-[12px] text-[#86868B]">Lima, Perú 🇵🇪</p>
            <p className="text-[11px] text-[#86868B] mt-1">
              Atención 100% online (no tenemos tienda física)
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
            <p className="text-[13px] font-semibold text-[#1D1D1F]">Horario de atención</p>
            <p className="text-[12px] text-[#86868B]">Lunes a Sábado: 9:00 AM — 8:00 PM</p>
            <p className="text-[12px] text-[#86868B]">Domingo: Cerrado</p>
          </div>
        </div>
      </section>

      {/* Redes */}
      <section className="text-center">
        <p className="text-[12px] uppercase tracking-wider text-[#86868B] font-semibold mb-3">
          Síguenos
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E1306C] to-[#F77737] text-white hover:scale-105 transition-transform"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white hover:scale-105 transition-transform"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            href="https://wa.me/51987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Mail } from "lucide-react";

const FAQS = [
  {
    q: "¿Qué diferencia hay entre los Grados A+, A y B?",
    a: "El Grado A+ es 'Como Nuevo': sin marcas de uso, batería ≥ 95%, caja original, 6 meses de garantía. El Grado A es 'Excelente': microdesgaste imperceptible, batería ≥ 90%, 4 meses de garantía. El Grado B es 'Muy Bueno': uso visible en bordes, batería ≥ 85%, 100% funcional, 3 meses de garantía. Todos pasan el mismo protocolo de 47 puntos de inspección.",
  },
  {
    q: "¿La garantía es real? ¿Qué cubre?",
    a: "Sí, garantía real sin letra pequeña. Cubre defectos de fábrica y funcionamiento: pantalla, batería, carga, conectividad, botones. NO cubre daños por mal uso (caídas, líquidos). Si el equipo falla dentro del período de garantía, lo reparamos gratis o te damos uno equivalente. Si no hay stock, reembolso completo.",
  },
  {
    q: "¿Puedo devolver el equipo si no me gusta?",
    a: "Sí. Tienes 7 días desde la recepción para devolverlo, sin preguntas. El equipo debe estar en las mismas condiciones en que lo recibiste. Reembolso completo del producto (los gastos de envío no son reembolsables).",
  },
  {
    q: "¿Cómo funciona el pago contraentrega?",
    a: "Solo disponible en Lima Metropolitana. Al hacer el pedido, eliges 'Pago Contraentrega'. El mensajero lleva el equipo, tú lo revisas con él presente, y pagas en efectivo al recibir. Si algo no te gusta, rechazas la entrega sin costo. Solo paga si quedas 100% satisfecho.",
  },
  {
    q: "¿Los equipos vienen con accesorios?",
    a: "Depende del equipo. La mayoría incluye cable de carga y cargador original. Los iPads y MacBooks premium incluyen además caja Deluxe itechperu con sello de garantía. Revisa la sección 'En la caja Deluxe' de cada producto para ver exactamente qué incluye.",
  },
  {
    q: "¿Hacen envíos a provincias?",
    a: "Sí, enviamos a todo Perú. Lima: 24-48h. Provincias: 3-7 días hábiles según región. El envío es gratis en compras sobre S/1,500. Para provincias, el pago es anticipado vía Mercado Pago (no contraentrega).",
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "Sí, con Mercado Pago puedes pagar hasta en 12 cuotas con tarjeta de crédito. El cálculo de cuotas aparece en cada producto. También aceptamos Yape, PLIN y efectivo vía Mercado Pago.",
  },
  {
    q: "¿Los equipos son robados o tienen reporte?",
    a: "Absolutamente no. Todos nuestros equipos son corporativos (comprados a empresas que renuevan su flota) o importados directamente. Verificamos el IMEI/Serie en SISATEC y Rebagliati antes de comprarlos. Garantizamos que ningún equipo tiene reporte de robo o pérdida.",
  },
  {
    q: "¿Puedo ver el equipo antes de comprar?",
    a: "Por ahora operamos 100% online para mantener costos bajos y precios justos. Sin embargo, si estás en Lima y quieres verlo antes, escríbenos por WhatsApp y coordinamos una videollamada donde te mostramos el equipo en tiempo real con todos los detalles.",
  },
  {
    q: "¿Qué pasa si el equipo llega dañado?",
    a: "Imposible, pero si pasa: nos escribes inmediatamente por WhatsApp con fotos/videos. Te enviamos uno nuevo o reembolsamos el 100% + gastos de envío. El riesgo de transporte es nuestro, no tuyo.",
  },
];

export function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <section className="text-center">
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[#1D1D1F]">
          Preguntas frecuentes
        </h1>
        <p className="mt-3 text-[14px] text-[#86868B]">
          Todo lo que necesitas saber antes de comprar
        </p>
      </section>

      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F5F7] transition-colors"
            >
              <span className="text-[13px] lg:text-[14px] font-semibold text-[#1D1D1F] pr-3">
                {faq.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-[#86868B] transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="px-4 pb-4 text-[13px] text-[#1D1D1F]/80 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* CTA contacto */}
      <section className="rounded-3xl bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] p-6 text-center text-white">
        <h2 className="text-[18px] font-bold">¿No encuentras tu respuesta?</h2>
        <p className="text-[13px] text-white/60 mt-1">
          Escríbenos y te respondemos en minutos
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
          <a
            href="https://wa.me/51987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#D4AF37] px-5 py-2.5 text-[13px] font-semibold text-[#1D1D1F]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            WhatsApp VIP
          </a>
          <a
            href="mailto:hola@itechperu.shop"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            hola@itechperu.shop
          </a>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, BadgeCheck, CreditCard, Headphones, Award } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "Garantía real", desc: "3-6 meses" },
  { icon: Truck, title: "Envío nacional", desc: "24-48h Lima" },
  { icon: BadgeCheck, title: "Verificados", desc: "47 puntos" },
  { icon: CreditCard, title: "Pago seguro", desc: "Mercado Pago" },
  { icon: Headphones, title: "Soporte local", desc: "WhatsApp VIP" },
  { icon: Award, title: "Certificación", desc: "Técnicos Apple" },
];

/**
 * TrustSection — Sección de confianza con 6 iconos.
 * Microinteracciones: stagger animation al entrar en viewport.
 */
export function TrustSection() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {TRUST_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ y: -3 }}
          className="flex flex-col items-center text-center gap-1.5 rounded-2xl bg-white border border-[#E5E5E7] p-3 lg:p-4 hover:border-[#D4AF37]/30 transition-colors"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37]/10">
            <item.icon className="h-4 w-4 text-[#D4AF37]" strokeWidth={1.5} />
          </div>
          <p className="text-[11px] font-semibold text-[#1D1D1F]">{item.title}</p>
          <p className="text-[10px] text-[#86868B]">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

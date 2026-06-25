"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode } from "react";
import { ShieldCheck, Sparkles, Star, Truck } from "lucide-react";

interface AuthLayoutDeluxeProps {
  children: ReactNode;
  /** Título del panel lateral izquierdo (desktop) */
  sideTitle?: string;
  /** Subtítulo del panel lateral */
  sideSubtitle?: string;
  /** Lista de beneficios a destacar en el panel lateral */
  benefits?: { icon: "shield" | "sparkles" | "star" | "truck"; title: string; desc: string }[];
}

const BENEFIT_ICONS = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  truck: Truck,
};

/**
 * AuthLayoutDeluxe — Layout premium para pantallas de autenticación.
 *
 * - Desktop: split 2 columnas (panel brand izquierdo + formulario derecho)
 * - Mobile: solo el formulario, panel brand oculto
 * - Animaciones Framer Motion en mount y transitions entre modos
 */
export function AuthLayoutDeluxe({
  children,
  sideTitle = "Experiencia Deluxe",
  sideSubtitle = "Tu tecnología premium, con respaldo absoluto",
  benefits = [
    { icon: "shield", title: "Garantía Real", desc: "3-6 meses en cada equipo verificado" },
    { icon: "sparkles", title: "Calidad A+", desc: "Protocolo de 47 puntos de inspección" },
    { icon: "truck", title: "Envío Express", desc: "24-48h en Lima, Perú" },
    { icon: "star", title: "4.9/5 ⭐", desc: "+500 clientes satisfechos" },
  ],
}: AuthLayoutDeluxeProps) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-[#FFFFFF]">
      {/* ====== Panel izquierdo: Brand + Beneficios (solo desktop) ====== */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#1D1D1F] via-[#2A2A2D] to-[#1D1D1F] p-12 flex-col justify-between">
        {/* Detalles decorativos oro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl"
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-primary)]/10 backdrop-blur-md border border-white/20">
            <span className="text-[14px] font-bold tracking-tight text-[#D4AF37]">iT</span>
          </span>
          <span className="text-[18px] font-semibold tracking-tight text-white">
            itech<span className="text-[#D4AF37]">peru</span>
            <span className="text-[11px] font-normal text-white/50 ml-1">.shop</span>
          </span>
        </motion.div>

        {/* Contenido central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-[40px] font-bold tracking-tight leading-[1.1] text-white">
            {sideTitle}
          </h1>
          <p className="mt-3 text-[15px] text-white/60 leading-relaxed">
            {sideSubtitle}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[b.icon];
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="rounded-2xl bg-[var(--bg-primary)]/5 border border-white/10 backdrop-blur-md p-3.5"
                >
                  <Icon className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
                  <p className="mt-2 text-[12px] font-semibold text-white">{b.title}</p>
                  <p className="text-[10px] text-white/50 mt-0.5 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 flex items-center justify-between text-[11px] text-white/40"
        >
          <span>© 2026 itechperu.shop · Lima, Perú 🇵🇪</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" strokeWidth={1.5} />
            SSL Seguro
          </span>
        </motion.div>
      </div>

      {/* ====== Panel derecho: Formulario (mobile + desktop) ====== */}
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-screen lg:min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[420px]"
          >
            {/* Logo mobile */}
            <div className="lg:hidden flex items-center justify-center mb-6">
              <motion.a
                href="/"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D1D1F]">
                  <span className="text-[14px] font-bold tracking-tight text-[#D4AF37]">iT</span>
                </span>
                <span className="text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                  itech<span className="text-[#D4AF37]">peru</span>
                </span>
              </motion.a>
            </div>

            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

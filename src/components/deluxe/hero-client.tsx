"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, MessageCircle, ShieldCheck, Truck, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/deluxe/animated-counter";
import { formatPEN, type Product } from "@/data/products";

interface HeroClientProps {
  featuredProduct?: Product;
}

/**
 * HeroClient — Hero full-bleed inmersivo con animaciones Framer Motion.
 * Client component porque usa motion.
 */
export function HeroClient({ featuredProduct }: HeroClientProps) {
  return (
    <section
      id="inicio"
      data-section="inicio"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-br from-[#1D1D1F] via-[#2A2A2D] to-[#000000] scroll-mt-0 -mt-16 lg:-mt-20"
    >
      {/* Detalles oro difuminados */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5"
            >
              <Sparkles className="h-3 w-3 text-[#D4AF37]" strokeWidth={1.5} />
              <span className="text-[11px] lg:text-[12px] font-medium text-white/90 tracking-wide">
                Reacondicionado Premium · Lima, Perú 🇵🇪
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-[36px] sm:text-[52px] lg:text-[72px] font-bold tracking-[-0.03em] leading-[1.05] text-white"
            >
              Tecnología de alta gama
              <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5E7A1] to-[#D4AF37] bg-clip-text text-transparent">
                al precio inteligente
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 lg:mt-6 text-[15px] lg:text-[18px] text-white/60 leading-relaxed max-w-xl"
            >
              iPads, MacBooks y Laptops corporativas verificadas con protocolo de
              47 puntos. Garantía real y experiencia Deluxe en cada compra.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href={featuredProduct ? `/productos/${featuredProduct.slug}` : "/#catalogo"}
                className="group flex items-center gap-2 rounded-full bg-white px-6 lg:px-8 py-3 lg:py-4 text-[14px] lg:text-[15px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all hover:scale-[1.02]"
              >
                Ver destacado
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <Link
                href="/coleccion"
                className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-6 lg:px-8 py-3 lg:py-4 text-[14px] lg:text-[15px] font-medium text-white hover:bg-white/10 transition-colors"
              >
                Ver catálogo
              </Link>
              <a
                href="https://wa.me/51987654321?text=Hola%20iTECH%20Peru%2C%20quiero%20info%20VIP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] px-6 lg:px-8 py-3 lg:py-4 text-[14px] lg:text-[15px] font-semibold text-white shadow-[0_8px_30px_-4px_rgba(212,175,55,0.5)] hover:scale-[1.02] transition-transform"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                WhatsApp VIP
              </a>
            </motion.div>
          </div>

          {/* Stats laterales (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden lg:flex flex-col gap-3 lg:w-[320px]"
          >
            {[
              { icon: ShieldCheck, label: "Equipos verificados", num: 500, prefix: "+", accent: false },
              { icon: Star, label: "Calificación promedio", num: 4.9, prefix: "", suffix: "/5", accent: true, decimals: 1 },
              { icon: Truck, label: "Garantía real (meses)", num: 6, prefix: "3-", accent: false },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`rounded-2xl border p-5 backdrop-blur-md ${
                  stat.accent
                    ? "bg-[#D4AF37]/10 border-[#D4AF37]/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <stat.icon className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
                <p className="text-[11px] text-white/60 uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
                <p className={`text-[28px] font-bold mt-1 ${stat.accent ? "text-[#D4AF37]" : "text-white"}`}>
                  <AnimatedCounter
                    value={stat.num}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    format={false}
                  />
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

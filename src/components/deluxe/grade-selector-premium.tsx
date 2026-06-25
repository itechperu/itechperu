"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield } from "lucide-react";
import type { GradeInfo, ProductGrade } from "@/data/products";

interface GradeSelectorPremiumProps {
  grades: GradeInfo[];
  selected: ProductGrade;
  onSelect: (grade: ProductGrade) => void;
}

const gradeStyles: Record<string, { ring: string; bg: string; badge: string; glow: string }> = {
  "A+": {
    ring: "border-[#D4AF37]",
    bg: "from-[#FFFBEB] to-white",
    badge: "bg-gradient-to-br from-[#D4AF37] to-[#B8941F]",
    glow: "shadow-[0_4px_20px_-4px_rgba(212,175,55,0.4)]",
  },
  A: {
    ring: "border-[#1D1D1F]",
    bg: "from-[#1D1D1F] to-[#2A2A2D]",
    badge: "bg-[#1D1D1F]",
    glow: "shadow-[0_4px_20px_-4px_rgba(29,29,31,0.4)]",
  },
  B: {
    ring: "border-[#86868B]",
    bg: "from-[#F5F5F7] to-white",
    badge: "bg-[#86868B]",
    glow: "shadow-[0_4px_20px_-4px_rgba(134,134,139,0.3)]",
  },
};

/**
 * GradeSelectorPremium — Selectable Cards estilo Apple Store.
 *
 * Animaciones: hover lift, check icon spring, price slide.
 * Microinteracciones elegantes, no exageradas.
 */
export function GradeSelectorPremium({ grades, selected, onSelect }: GradeSelectorPremiumProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
          Selecciona el grado
        </h3>
        <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--text-secondary)]">
          <Shield className="h-3 w-3" strokeWidth={1.5} />
          <span>Garantía incluida</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {grades.map((g) => {
          const isSelected = selected === g.grade;
          const style = gradeStyles[g.grade] || gradeStyles["A"];
          const isDark = g.grade === "A";

          return (
            <motion.button
              key={g.grade}
              onClick={() => onSelect(g.grade)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`relative w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 overflow-hidden ${
                isSelected
                  ? `${style.ring} bg-gradient-to-br ${style.bg} ${style.glow}`
                  : "border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[#D4AF37]/30"
              }`}
            >
              {/* Badge del grado */}
              <div className="flex-shrink-0">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-[14px] font-bold text-white ${style.badge} ${isSelected && g.grade === "A+" ? "shimmer-gold" : ""}`}>
                  {g.grade}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-[15px] font-bold ${isDark && isSelected ? "text-white" : "text-[var(--text-primary)]"}`}>
                    Grado {g.grade}
                  </span>
                  <span className={`text-[13px] font-medium ${isDark && isSelected ? "text-white/70" : "text-[var(--text-secondary)]"}`}>
                    {g.label}
                  </span>
                </div>
                <p className={`text-[12px] mt-0.5 leading-snug ${isDark && isSelected ? "text-white/60" : "text-[var(--text-secondary)]"}`}>
                  {g.description}
                </p>
                <div className={`flex items-center gap-3 mt-1.5`}>
                  <span className={`text-[11px] font-medium ${isDark && isSelected ? "text-white/70" : "text-[var(--text-secondary)]"}`}>
                    Garantía: {g.warranty}
                  </span>
                </div>
              </div>

              {/* Precio + check */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`text-[14px] font-bold ${g.grade === "A+" ? "text-[#D4AF37]" : isDark && isSelected ? "text-[#D4AF37]" : "text-[var(--text-primary)]"}`}>
                  {g.priceModifier === 0 ? "Precio base" : `−S/ ${Math.abs(g.priceModifier / 100)}`}
                </span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_2px_8px_rgba(212,175,55,0.5)]"
                    >
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shimmer effect para A+ seleccionado */}
              {isSelected && g.grade === "A+" && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

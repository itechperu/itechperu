"use client";

import { useState } from "react";
import { Check, Shield } from "lucide-react";
import type { GradeInfo, ProductGrade } from "@/data/products";

interface GradeSelectorDeluxeProps {
  grades: GradeInfo[];
  onSelect: (grade: ProductGrade, priceModifier: number) => void;
  initialGrade?: ProductGrade;
}

/**
 * Selector de Grado del Producto — itechperu.shop
 * Diseñado como botones de joyería:
 * - Grado A+: borde dorado milimétrico, shimmer sutil
 * - Grado A: borde gris grafito, elegante
 * - Grado B: borde más sobrio, económico
 */
export function GradeSelectorDeluxe({
  grades,
  onSelect,
  initialGrade = "A+",
}: GradeSelectorDeluxeProps) {
  const [selected, setSelected] = useState<ProductGrade>(initialGrade);

  const handleSelect = (grade: ProductGrade, priceModifier: number) => {
    setSelected(grade);
    onSelect(grade, priceModifier);
  };

  const getGradeStyles = (grade: ProductGrade, isSelected: boolean) => {
    if (grade === "A+") {
      return isSelected
        ? "border-[#D4AF37] bg-gradient-to-br from-[#FFF9E6] to-white shadow-[0_4px_20px_-4px_rgba(212,175,55,0.4)]"
        : "border-[#E5E5E7] bg-white hover:border-[#D4AF37]/40";
    }
    if (grade === "A") {
      return isSelected
        ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-[0_4px_20px_-4px_rgba(29,29,31,0.4)]"
        : "border-[#E5E5E7] bg-white hover:border-[#1D1D1F]/40";
    }
    // Grade B
    return isSelected
      ? "border-[#86868B] bg-[#F5F5F7] text-[#1D1D1F] shadow-[0_4px_20px_-4px_rgba(134,134,139,0.3)]"
      : "border-[#E5E5E7] bg-white hover:border-[#86868B]/40";
  };

  const getBadgeColor = (grade: ProductGrade) => {
    if (grade === "A+") return "bg-[#D4AF37] text-white";
    if (grade === "A") return "bg-[#1D1D1F] text-white";
    return "bg-[#86868B] text-white";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] lg:text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
          Selecciona el Grado
        </h3>
        <div className="flex items-center gap-1 text-[10px] lg:text-[11px] font-medium text-[#86868B]">
          <Shield className="h-3 w-3 lg:h-3.5 lg:w-3.5" strokeWidth={1.5} />
          <span>Garantía incluida</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {grades.map((g) => {
          const isSelected = selected === g.grade;
          return (
            <button
              key={g.grade}
              onClick={() => handleSelect(g.grade, g.priceModifier)}
              className={`relative flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-300 tap-scale ${getGradeStyles(
                g.grade,
                isSelected
              )}`}
              aria-pressed={isSelected}
              aria-label={`Grado ${g.grade} ${g.label}`}
            >
              {/* Badge del grado */}
              <div className="flex flex-col items-center justify-center min-w-[44px]">
                <span
                  className={`flex items-center justify-center rounded-full h-9 w-9 text-[13px] font-bold ${getBadgeColor(
                    g.grade
                  )} ${g.grade === "A+" ? "shimmer-gold" : ""}`}
                >
                  {g.grade}
                </span>
              </div>

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-[14px] font-semibold ${
                      isSelected && g.grade === "A" ? "text-white" : "text-[#1D1D1F]"
                    }`}
                  >
                    Grado {g.grade}
                  </span>
                  <span
                    className={`text-[12px] font-medium ${
                      isSelected && g.grade === "A"
                        ? "text-white/70"
                        : "text-[#86868B]"
                    }`}
                  >
                    {g.label}
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-0.5 leading-snug ${
                    isSelected && g.grade === "A"
                      ? "text-white/60"
                      : "text-[#86868B]"
                  }`}
                >
                  {g.description}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span
                    className={`text-[10px] font-medium ${
                      isSelected && g.grade === "A"
                        ? "text-white/70"
                        : "text-[#86868B]"
                    }`}
                  >
                    Garantía: {g.warranty}
                  </span>
                </div>
              </div>

              {/* Precio + check */}
              <div className="flex flex-col items-end gap-1.5">
                {g.priceModifier === 0 ? (
                  <span
                    className={`text-[12px] font-semibold ${
                      isSelected && g.grade === "A"
                        ? "text-[#D4AF37]"
                        : "text-[#D4AF37]"
                    }`}
                  >
                    Precio base
                  </span>
                ) : (
                  <span
                    className={`text-[12px] font-semibold ${
                      isSelected && g.grade === "A"
                        ? "text-[#D4AF37]"
                        : "text-[#D4AF37]"
                    }`}
                  >
                    − S/ {Math.abs(g.priceModifier)}
                  </span>
                )}
                {isSelected && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] shadow-[0_2px_8px_rgba(212,175,55,0.5)]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

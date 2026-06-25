"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

interface InputDeluxeProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  success?: boolean;
  hint?: string;
  /** Tipo de input. Si es "password", muestra toggle de visibilidad */
  type?: string;
}

/**
 * InputDeluxe — Input premium con animaciones Framer Motion.
 *
 * - Label flotante animada
 * - Icono izquierdo opcional
 * - Estados: error (rojo), success (verde), focus (oro)
 * - Toggle de visibilidad para contraseñas
 * - Hint de ayuda debajo
 */
export const InputDeluxe = forwardRef<HTMLInputElement, InputDeluxeProps>(
  ({ label, icon, error, success, hint, type = "text", className = "", id, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const inputId = id || `input-${label.toLowerCase().replace(/\s/g, "-")}`;
    const isPassword = type === "password";
    const effectiveType = isPassword && showPassword ? "text" : type;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-[12px] font-medium text-[var(--text-primary)]/80"
        >
          {label}
        </label>
        <div className="relative">
          {/* Icono izquierdo */}
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none">
              {icon}
            </div>
          )}

          <motion.input
            ref={ref}
            id={inputId}
            type={effectiveType}
            onFocus={(e) => {
              setFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            animate={{
              borderColor: error
                ? "#EF4444"
                : success
                  ? "#10B981"
                  : focused
                    ? "#D4AF37"
                    : "#E5E5E7",
              backgroundColor: error ? "#FEF2F2" : success ? "#F0FDF4" : focused ? "#FFFFFF" : "#F5F5F7",
            }}
            transition={{ duration: 0.2 }}
            className={`w-full ${icon ? "pl-11" : "pl-4"} ${
              isPassword ? "pr-11" : "pr-4"
            } py-3 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] border-2 rounded-2xl focus:outline-none transition-shadow ${
              focused ? "shadow-[0_4px_20px_-4px_rgba(212,175,55,0.25)]" : ""
            } ${className}`}
            {...rest}
          />

          {/* Toggle password */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.5} />
              ) : (
                <Eye className="h-[18px] w-[18px]" strokeWidth={1.5} />
              )}
            </button>
          )}

          {/* Success icon (si no es password) */}
          {success && !isPassword && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#10B981]"
            >
              <CheckCircle2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </motion.div>
          )}
        </div>

        {/* Error / Hint */}
        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1.5 text-[11px] text-[#EF4444]"
            >
              <AlertCircle className="h-3 w-3 flex-shrink-0" strokeWidth={2} />
              <span>{error}</span>
            </motion.div>
          ) : hint ? (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] text-[var(--text-secondary)]"
            >
              {hint}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

InputDeluxe.displayName = "InputDeluxe";

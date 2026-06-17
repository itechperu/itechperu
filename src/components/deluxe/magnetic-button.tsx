"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  /** Intensidad del efecto magnético (default 0.3 = 30% del movimiento del mouse) */
  strength?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

/**
 * MagneticButton — Botón premium con efecto magnético en desktop.
 *
 * El botón sigue sutilmente al cursor cuando el mouse está cerca.
 * En mobile/tablet (sin hover) se comporta como botón normal con tap-scale.
 * Solo se activa en dispositivos con hover (lg+).
 */
export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    // Solo activar magnético en desktop (lg+)
    if (window.matchMedia("(hover: hover) and (min-width: 1024px)").matches === false) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;
    x.set(dx);
    y.set(dy);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

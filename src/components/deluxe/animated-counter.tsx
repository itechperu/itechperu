"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Valor final del contador */
  value: number;
  /** Duración en ms (default 1500) */
  duration?: number;
  /** Prefijo (ej. "S/ ") */
  prefix?: string;
  /** Sufijo (ej. "+") */
  suffix?: string;
  /** Formatear con separador de miles */
  format?: boolean;
  /** Decimales */
  decimals?: number;
  /** Class personalizada */
  className?: string;
  /** Iniciar cuando entre en viewport (default true) */
  startOnView?: boolean;
}

/**
 * AnimatedCounter — Contador numérico con animación ease-out.
 *
 * Usa IntersectionObserver para iniciar cuando entra en viewport.
 * Fórmula: easeOutExpo = 1 - 2^(-10 * t)
 */
export function AnimatedCounter({
  value,
  duration = 1500,
  prefix = "",
  suffix = "",
  format = true,
  decimals = 0,
  className = "",
  startOnView = true,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(value * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!startOnView) {
      animate();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          animate();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, startOnView, duration]);

  const formatted = format
    ? new Intl.NumberFormat("es-PE", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(display)
    : display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

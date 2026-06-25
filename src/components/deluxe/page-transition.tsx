"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

/**
 * PageTransition — Transición suave entre páginas.
 *
 * Fade + slide up sutil (150ms) al cambiar de ruta.
 * Respeta prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/**
 * RevealOnScroll — Reveal elegante al entrar en viewport.
 *
 * - Framer Motion whileInView
 * - Duración 400ms con easing premium
 * - Respeta prefers-reduced-motion
 * - Stagger via delay prop
 */
export function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}: RevealOnScrollProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

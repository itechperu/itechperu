"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * BackButton — Botón "Volver" universal para subpáginas.
 * Usa router.back() si hay historial, si no va al home.
 * Fallback opcional si no hay historial.
 */
export function BackButton({
  fallback = "/catalogo",
  label = "Volver",
}: {
  fallback?: string;
  label?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    // Si hay historial, volver atrás
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4"
      aria-label={label}
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
      {label}
    </button>
  );
}

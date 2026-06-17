"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface ScrollSpyOptions {
  /** Offset from top of viewport to consider a section active (default 140 for sticky header) */
  offset?: number;
  /** IntersectionObserver rootMargin (overrides offset if provided) */
  rootMargin?: string;
  /** Update URL hash as user scrolls (default true) */
  updateHash?: boolean;
  /** Use smooth scroll behavior when navigating via hash (default true) */
  smoothScroll?: boolean;
}

/**
 * useScrollSpy — Hook premium para Deep Linking + Scroll Spy
 *
 * Estrategia híbrida (scroll listener + rAF throttle):
 *  - En cada scroll (throttled con requestAnimationFrame), calcula qué sección
 *    tiene su borde superior más cercano al "punto de activación" (offset del header)
 *  - Actualiza el estado activo y la URL via History API (sin recargar)
 *  - Soporta navegación por hash (al cargar una URL con #section)
 *  - Smooth scroll nativo con compensación de sticky header
 *  - Compatible con SSR (no rompe en servidor)
 *  - Detección automática de secciones (no requiere IntersectionObserver)
 *
 * Uso:
 *   const { activeId, scrollToId } = useScrollSpy({
 *     sectionIds: ["hero", "ofertas", "catalogo", "categorias", "confianza"],
 *   });
 */
export function useScrollSpy({
  sectionIds,
  offset = 140,
  rootMargin,
  updateHash = true,
  smoothScroll = true,
}: ScrollSpyOptions & { sectionIds: string[] }) {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const hash = window.location.hash.replace("#", "");
    return hash || "";
  });
  const isProgrammaticScroll = useRef(false);
  const programmaticTimeout = useRef<NodeJS.Timeout | null>(null);
  const rafId = useRef<number | null>(null);

  // Smooth scroll a un ID con compensación de header
  const scrollToId = useCallback(
    (id: string) => {
      if (!id || typeof window === "undefined") return;
      const el = document.getElementById(id);
      if (!el) return;

      isProgrammaticScroll.current = true;
      if (programmaticTimeout.current) clearTimeout(programmaticTimeout.current);

      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: smoothScroll ? "smooth" : "auto",
      });

      // Actualizar estado inmediatamente para feedback instantáneo
      setActiveId(id);
      if (updateHash && window.location.hash !== `#${id}`) {
        history.replaceState(null, "", `#${id}`);
      }

      // Liberar el flag después de que termine la animación (aprox 900ms)
      programmaticTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 900);
    },
    [offset, smoothScroll, updateHash]
  );

  // Calcular sección activa basada en posición de scroll
  const computeActiveSection = useCallback(() => {
    if (typeof window === "undefined" || isProgrammaticScroll.current) return;

    // Si estamos muy al inicio, activar la primera sección
    if (window.scrollY < 50) {
      const firstId = sectionIds[0];
      if (firstId && activeId !== firstId) {
        setActiveId(firstId);
        if (updateHash && window.location.hash !== `#${firstId}`) {
          history.replaceState(null, "", `#${firstId}`);
        }
      }
      return;
    }

    // Si estamos al final del documento, activar la última sección
    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= docHeight - 10) {
      const lastId = sectionIds[sectionIds.length - 1];
      if (lastId && activeId !== lastId) {
        setActiveId(lastId);
        if (updateHash && window.location.hash !== `#${lastId}`) {
          history.replaceState(null, "", `#${lastId}`);
        }
      }
      return;
    }

    // Lógica principal: encontrar la sección cuyo top está más cerca del offset
    // (justo debajo del header). Si la sección está completamente pasada,
    // considerar la siguiente.
    let current = "";
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Sección es "activa" si su top está por encima del punto de activación
      // Y su bottom está por debajo del punto de activación
      if (rect.top <= offset + 50 && rect.bottom >= offset + 50) {
        current = id;
        break;
      }
    }

    // Fallback: si ninguna sección cruza el punto de activación, tomar la última
    // cuyo top esté por encima del offset (sección más reciente que pasamos)
    if (!current) {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offset) {
          current = id;
        }
      }
    }

    if (current && current !== activeId) {
      setActiveId(current);
      if (updateHash && window.location.hash !== `#${current}`) {
        history.replaceState(null, "", `#${current}`);
      }
    }
  }, [sectionIds, offset, activeId, updateHash]);

  // Scroll listener con throttle por rAF
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(computeActiveSection);
    };

    // Calcular al montar
    const timer = setTimeout(computeActiveSection, 200);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (programmaticTimeout.current) clearTimeout(programmaticTimeout.current);
    };
  }, [computeActiveSection]);

  // Al montar, si hay hash en la URL, hacer scroll a esa sección
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionIds.includes(hash)) {
      const timer = setTimeout(() => scrollToId(hash), 300);
      return () => clearTimeout(timer);
    }
  }, [sectionIds, scrollToId]);

  return { activeId, scrollToId };
}

/**
 * useHashScroll — Hook complementario para navegación por hash
 *
 * Escucha cambios en window.location.hash (incluyendo clicks en <a href="#...">)
 * y hace smooth scroll a la sección correspondiente.
 */
export function useHashScroll(offset = 140) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;

      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };

    if (window.location.hash) {
      setTimeout(handleHashChange, 300);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [offset]);
}

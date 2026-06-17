"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

interface SectionDeluxeProps extends HTMLAttributes<HTMLElement> {
  /** ID único de la sección — se usa para deep linking (#hero, #catalogo, etc.) */
  id: string;
  /** Etiqueta semántica (default: section) */
  as?: "section" | "article" | "div";
  children: ReactNode;
}

/**
 * SectionDeluxe — Wrapper semántico para secciones con deep linking.
 *
 * - Genera un <section id="..."> con scroll-margin-top para compensar el header sticky
 * - Atributo `data-section` para queries
 * - Aria-labelledby recomendado (pasarlo via props)
 *
 * Uso:
 *   <SectionDeluxe id="catalogo" aria-labelledby="catalogo-heading">
 *     <h2 id="catalogo-heading">Catálogo</h2>
 *     ...
 *   </SectionDeluxe>
 */
export const SectionDeluxe = forwardRef<HTMLElement, SectionDeluxeProps>(
  ({ id, as: Tag = "section", children, className = "", ...rest }, ref) => {
    return (
      <Tag
        ref={ref as never}
        id={id}
        data-section={id}
        className={`scroll-mt-[140px] lg:scroll-mt-[180px] ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

SectionDeluxe.displayName = "SectionDeluxe";

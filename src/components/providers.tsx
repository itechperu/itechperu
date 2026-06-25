"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";

/**
 * Providers — todos los providers globales de la app.
 * - ThemeProvider (next-themes: dark/light/system, persistente, SSR)
 * - SessionProvider (NextAuth)
 * - SmoothScrollProvider (Lenis)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="itechperu-theme"
    >
      <SessionProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

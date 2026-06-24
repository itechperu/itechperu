"use client";

import { SessionProvider } from "next-auth/react";
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";

/**
 * Wrapper client component para todos los providers de la app.
 * - SessionProvider (NextAuth)
 * - SmoothScrollProvider (Lenis — scroll inmersivo)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </SessionProvider>
  );
}

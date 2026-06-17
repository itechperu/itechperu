"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Wrapper client component para SessionProvider de NextAuth.
 * Permite usar useSession() en cualquier client component del árbol.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

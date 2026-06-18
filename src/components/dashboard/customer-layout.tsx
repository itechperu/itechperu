import { type ReactNode } from "react";
import { CustomerLayoutClient } from "./customer-layout-client";

/**
 * Wrapper server-friendly del CustomerLayout.
 * Pasa la sesión inicial como prop para evitar parpadeo de loading.
 */
export function CustomerLayout({
  children,
  session,
}: {
  children: ReactNode;
  session?: { user?: { name?: string | null; email?: string | null; image?: string | null; role?: string } } | null;
}) {
  return <CustomerLayoutClient initialSession={session}>{children}</CustomerLayoutClient>;
}

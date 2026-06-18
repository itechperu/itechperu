import { type ReactNode } from "react";
import { AdminLayoutClient } from "./admin-layout-client";

/**
 * Wrapper server-friendly del AdminLayout.
 * Pasa la sesión inicial como prop.
 */
export function AdminLayout({
  children,
  session,
}: {
  children: ReactNode;
  session?: { user?: { name?: string | null; email?: string | null; image?: string | null; role?: string } } | null;
}) {
  return <AdminLayoutClient initialSession={session}>{children}</AdminLayoutClient>;
}

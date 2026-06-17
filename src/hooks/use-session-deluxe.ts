"use client";

import { useState, useEffect } from "react";

export interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export interface Session {
  user: SessionUser | null;
  expires: string;
}

/**
 * Hook personalizado para obtener la sesión del usuario.
 *
 * Usa fetch directo a /api/auth/session en lugar de useSession() de next-auth/react,
 * porque el hook oficial tiene problemas de compatibilidad con Turbopack en Next.js 16.
 *
 * @returns { data: Session | null, status: "loading" | "authenticated" | "unauthenticated" }
 */
export function useSessionDeluxe(): {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
} {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const res = await fetch("/api/auth/session", {
          cache: "no-store",
        });
        if (!res.ok) {
          if (!cancelled) setStatus("unauthenticated");
          return;
        }
        const data = (await res.json()) as Session;
        if (cancelled) return;
        if (data?.user?.email) {
          setSession(data);
          setStatus("authenticated");
        } else {
          setSession(null);
          setStatus("unauthenticated");
        }
      } catch {
        if (!cancelled) setStatus("unauthenticated");
      }
    }

    loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data: session, status };
}

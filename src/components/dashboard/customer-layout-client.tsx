"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/cuenta", label: "Resumen", icon: LayoutDashboard },
  { href: "/cuenta/pedidos", label: "Mis Pedidos", icon: Package },
  { href: "/cuenta/favoritos", label: "Favoritos", icon: Heart },
  { href: "/cuenta/datos", label: "Mis Datos", icon: User },
];

interface SessionUser {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
}

/**
 * CustomerLayoutClient — Layout del panel de cliente con sidebar responsivo.
 *
 * Desktop: sidebar fija a la izquierda + contenido a la derecha
 * Mobile: navbar superior + drawer hamburguesa
 */
export function CustomerLayoutClient({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession?: SessionUser | null;
}) {
  const pathname = usePathname();
  const { data: session } = useSessionDeluxe();
  // Usar initialSession si está disponible (mejor UX, sin parpadeo)
  const effectiveSession = session || initialSession;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Top bar (mobile) */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#E5E5E7] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7]"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <span className="text-[14px] font-semibold tracking-tight text-[#1D1D1F]">
          Mi Cuenta
        </span>
        <Link href="/" className="text-[12px] font-medium text-[#86868B]">
          Inicio
        </Link>
      </div>

      <div className="lg:flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-[#E5E5E7] p-5 sticky top-0">
          <SidebarContent
            pathname={pathname}
            session={effectiveSession}
            onSignOut={() => signOut({ callbackUrl: "/" })}
          />
        </aside>

        {/* Drawer (mobile) */}
        {sidebarOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-white p-5 flex flex-col"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="self-end flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F5F5F7]"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <SidebarContent
                pathname={pathname}
                session={effectiveSession}
                onSignOut={() => signOut({ callbackUrl: "/" })}
                onNavigate={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}

        {/* Contenido */}
        <main className="flex-1 p-4 lg:p-8 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  session,
  onSignOut,
  onNavigate,
}: {
  pathname: string;
  session: SessionUser | null | undefined;
  onSignOut: () => void;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <Link href="/" onClick={onNavigate} className="flex items-center gap-2 mb-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D1D1F]">
          <span className="text-[12px] font-bold tracking-tight text-[#D4AF37]">iT</span>
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-[#1D1D1F]">
          itech<span className="text-[#D4AF37]">peru</span>
        </span>
      </Link>

      {/* User card */}
      <div className="rounded-2xl bg-[#F5F5F7] p-3 mb-5">
        <div className="flex items-center gap-2.5">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1D1F]">
              <User className="h-5 w-5 text-white" strokeWidth={1.5} />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#1D1D1F] truncate">
              {session?.user?.name || "Cliente"}
            </p>
            <p className="text-[11px] text-[#86868B] truncate">
              {session?.user?.email || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                isActive
                  ? "bg-[#1D1D1F] text-white"
                  : "text-[#1D1D1F]/70 hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {item.label}
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" strokeWidth={2} />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <button
        onClick={onSignOut}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors w-full mt-4"
      >
        <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
        Cerrar sesión
      </button>

      <p className="text-[10px] text-[#86868B] mt-4 text-center">© 2026 itechperu.shop</p>
    </>
  );
}

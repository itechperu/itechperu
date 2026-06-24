"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Box,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Box },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
  { href: "/admin/sincronizar", label: "Sync Sheets", icon: RefreshCw },
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
 * AdminLayoutClient — Layout del panel de administrador.
 * Solo accesible si el usuario tiene rol ADMIN o SUPER_ADMIN.
 * Sidebar oscuro para distinguir visualmente del customer.
 */
export function AdminLayoutClient({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession?: SessionUser | null;
}) {
  const pathname = usePathname();
  const { data: session } = useSessionDeluxe();
  const effectiveSession = session || initialSession;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Top bar (mobile) */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#1D1D1F] text-white px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Abrir menú admin"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <span className="text-[14px] font-semibold tracking-tight flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#D4AF37]">
            <span className="text-[9px] font-bold text-[#1D1D1F]">iT</span>
          </span>
          Admin
        </span>
        <div className="w-9" />
      </div>

      <div className="lg:flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#1D1D1F] text-white p-5 sticky top-0">
          <AdminSidebarContent
            pathname={pathname}
            session={effectiveSession}
            onSignOut={() => signOut({ callbackUrl: "/" })}
          />
        </aside>

        {/* Drawer (mobile) */}
        {sidebarOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#1D1D1F] text-white p-5 flex flex-col"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="self-end flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Cerrar menú admin"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <AdminSidebarContent
                pathname={pathname}
                session={effectiveSession}
                onSignOut={() => signOut({ callbackUrl: "/" })}
                onNavigate={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}

        <main className="flex-1 p-4 lg:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}

function AdminSidebarContent({
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
      <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2 mb-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37]">
          <span className="text-[12px] font-bold tracking-tight text-[#1D1D1F]">iT</span>
        </span>
        <div>
          <span className="block text-[14px] font-semibold tracking-tight">
            itech<span className="text-[#D4AF37]">peru</span>
          </span>
          <span className="block text-[9px] uppercase tracking-widest text-white/40">
            Admin Panel
          </span>
        </div>
      </Link>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-3 mb-5">
        <div className="flex items-center gap-2.5">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]">
              <span className="text-[12px] font-bold text-[#1D1D1F]">
                {(session?.user?.name || "A").charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[13px] font-semibold truncate">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider">
              {session?.user?.role || "ADMIN"}
            </p>
          </div>
        </div>
      </div>

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
                  ? "bg-[#D4AF37] text-[#1D1D1F]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {item.label}
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" strokeWidth={2} />}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/admin/productos?action=new"
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] text-[#1D1D1F] px-3 py-2.5 text-[12px] font-semibold mt-4 hover:bg-[#D4AF37]/90 transition-colors"
      >
        <Plus className="h-4 w-4" strokeWidth={2} />
        Nuevo Producto
      </Link>

      <button
        onClick={onSignOut}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors w-full mt-2"
      >
        <LogOut className="h-[18px] w-[18px]" strokeWidth={1.5} />
        Cerrar sesión
      </button>

      <p className="text-[10px] text-white/30 mt-4 text-center">© 2026 itechperu.shop Admin</p>
    </>
  );
}

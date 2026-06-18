"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  Box,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { formatPEN } from "@/lib/format";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    customerName: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
        Dashboard
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        Resumen general de itechperu.shop
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
        <KpiCard
          icon={DollarSign}
          label="Ingresos totales"
          value={loading ? "—" : formatPEN(stats?.totalRevenue || 0)}
          accent
        />
        <KpiCard
          icon={ShoppingCart}
          label="Pedidos"
          value={loading ? "—" : String(stats?.totalOrders || 0)}
        />
        <KpiCard
          icon={Users}
          label="Usuarios"
          value={loading ? "—" : String(stats?.totalUsers || 0)}
        />
        <KpiCard
          icon={Box}
          label="Productos"
          value={loading ? "—" : String(stats?.totalProducts || 0)}
        />
      </div>

      {/* Pedidos pendientes */}
      <section className="mt-8 grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1D1D1F]">
              <Clock className="h-4 w-4 text-[#F59E0B]" strokeWidth={1.5} />
              Pedidos recientes
            </h2>
            <Link
              href="/admin/pedidos"
              className="text-[12px] font-medium text-[#86868B] hover:text-[#1D1D1F] flex items-center gap-0.5"
            >
              Ver todos <ChevronRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-flex h-6 w-6 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          ) : (stats?.recentOrders || []).length === 0 ? (
            <p className="text-[12px] text-[#86868B] py-8 text-center">
              Aún no hay pedidos
            </p>
          ) : (
            <ul className="space-y-2">
              {(stats?.recentOrders || []).slice(0, 5).map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between rounded-xl bg-[#F5F5F7] p-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono font-semibold text-[#1D1D1F]">
                      {order.orderNumber}
                    </p>
                    <p className="text-[10px] text-[#86868B] truncate">
                      {order.customerName} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString("es-PE")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-[#1D1D1F]">
                      {formatPEN(order.total)}
                    </p>
                    <StatusBadge status={order.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Acciones rápidas */}
        <div className="rounded-2xl bg-white border border-[#E5E5E7] p-5">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[#1D1D1F] mb-3">
            <TrendingUp className="h-4 w-4 text-[#D4AF37]" strokeWidth={1.5} />
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/admin/productos?action=new"
              className="rounded-xl bg-[#F5F5F7] p-3 hover:bg-[#E5E5E7] transition-colors"
            >
              <Box className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
              <p className="text-[12px] font-semibold text-[#1D1D1F] mt-2">
                Nuevo Producto
              </p>
              <p className="text-[10px] text-[#86868B]">Agrega al catálogo</p>
            </Link>
            <Link
              href="/admin/pedidos"
              className="rounded-xl bg-[#F5F5F7] p-3 hover:bg-[#E5E5E7] transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
              <p className="text-[12px] font-semibold text-[#1D1D1F] mt-2">
                Gestionar Pedidos
              </p>
              <p className="text-[10px] text-[#86868B]">
                {stats?.pendingOrders || 0} pendientes
              </p>
            </Link>
            <Link
              href="/admin/usuarios"
              className="rounded-xl bg-[#F5F5F7] p-3 hover:bg-[#E5E5E7] transition-colors"
            >
              <Users className="h-5 w-5 text-[#1D1D1F]" strokeWidth={1.5} />
              <p className="text-[12px] font-semibold text-[#1D1D1F] mt-2">
                Ver Usuarios
              </p>
              <p className="text-[10px] text-[#86868B]">Gestión de clientes</p>
            </Link>
            <div className="rounded-xl bg-gradient-to-br from-[#FFFBEB] to-white border border-[#D4AF37]/30 p-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" strokeWidth={1.5} />
              <p className="text-[12px] font-semibold text-[#1D1D1F] mt-2">
                Sistema OK
              </p>
              <p className="text-[10px] text-[#86868B]">Todo funcionando</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        accent
          ? "bg-gradient-to-br from-[#1D1D1F] to-[#2A2A2D] border-[#1D1D1F] text-white"
          : "bg-white border-[#E5E5E7]"
      }`}
    >
      <Icon
        className={`h-5 w-5 ${accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"}`}
        strokeWidth={1.5}
      />
      <p
        className={`text-[10px] uppercase tracking-wider font-medium mt-2 ${
          accent ? "text-white/60" : "text-[#86868B]"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-[20px] font-bold mt-0.5 ${
          accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-[#F59E0B]/10 text-[#F59E0B]",
    PAID: "bg-[#10B981]/10 text-[#10B981]",
    PROCESSING: "bg-[#3B82F6]/10 text-[#3B82F6]",
    SHIPPED: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
    DELIVERED: "bg-[#10B981]/10 text-[#10B981]",
    CANCELLED: "bg-[#EF4444]/10 text-[#EF4444]",
    COD_CONFIRMED: "bg-[#D4AF37]/10 text-[#D4AF37]",
  };
  const labels: Record<string, string> = {
    PENDING: "Pendiente",
    PAID: "Pagado",
    PROCESSING: "Preparando",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
    COD_CONFIRMED: "Contraentrega",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
        colors[status] || colors.PENDING
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

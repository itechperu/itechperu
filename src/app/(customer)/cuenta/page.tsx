"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Heart, Clock, TrendingUp, ChevronRight, Truck } from "lucide-react";
import { useSessionDeluxe } from "@/hooks/use-session-deluxe";
import { formatPEN } from "@/lib/format";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  items: { productTitle: string; quantity: number; grade: string }[];
}

export default function CustomerDashboard() {
  const { data: session } = useSessionDeluxe();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!session?.user?.email) return;
      try {
        const res = await fetch("/api/customer/orders", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [session]);

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
          Hola, {session?.user?.name?.split(" ")[0] || "Cliente"} 👋
        </h1>
        <p className="text-[13px] text-[#86868B] mt-1">
          Bienvenido a tu cuenta Deluxe. Aquí puedes gestionar tus pedidos y datos.
        </p>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <StatCard
            icon={Package}
            label="Pedidos totales"
            value={String(orders.length)}
            accent={false}
          />
          <StatCard
            icon={Clock}
            label="En proceso"
            value={String(pendingOrders)}
            accent={true}
          />
          <StatCard
            icon={TrendingUp}
            label="Total gastado"
            value={formatPEN(totalSpent)}
            accent={true}
          />
          <StatCard
            icon={Heart}
            label="Favoritos"
            value="—"
            accent={false}
          />
        </div>

        {/* Pedidos recientes */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-semibold tracking-tight text-[#1D1D1F]">
              Pedidos recientes
            </h2>
            <Link
              href="/cuenta/pedidos"
              className="text-[12px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors flex items-center gap-0.5"
            >
              Ver todos <ChevronRight className="h-3 w-3" strokeWidth={2} />
            </Link>
          </div>

          {loading ? (
            <div className="rounded-2xl bg-white border border-[#E5E5E7] p-8 text-center">
              <div className="inline-flex h-8 w-8 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
              <p className="text-[12px] text-[#86868B] mt-2">Cargando pedidos…</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl bg-white border border-[#E5E5E7] p-8 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F7] mb-3">
                <Package className="h-6 w-6 text-[#86868B]" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] font-semibold text-[#1D1D1F]">
                Aún no tienes pedidos
              </p>
              <p className="text-[12px] text-[#86868B] mt-1">
                Explora nuestro catálogo y haz tu primera compra
              </p>
              <Link
                href="/#catalogo"
                className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#1D1D1F] px-5 py-2 text-[12px] font-semibold text-white"
              >
                Ver catálogo <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {orders.slice(0, 3).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>

        {/* Accesos rápidos */}
        <section className="mt-8 grid grid-cols-2 gap-3">
          <QuickLink
            href="/cuenta/favoritos"
            icon={Heart}
            label="Mis Favoritos"
            desc="Productos guardados"
          />
          <QuickLink
            href="/cuenta/datos"
            icon={TrendingUp}
            label="Mis Datos"
            desc="Perfil y direcciones"
          />
        </section>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  accent: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white border border-[#E5E5E7] p-4">
      <Icon
        className={`h-5 w-5 ${accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"}`}
        strokeWidth={1.5}
      />
      <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium mt-2">
        {label}
      </p>
      <p className={`text-[18px] font-bold mt-0.5 ${accent ? "text-[#D4AF37]" : "text-[#1D1D1F]"}`}>
        {value}
      </p>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const statusColors: Record<string, string> = {
    PENDING: "bg-[#F59E0B]/10 text-[#F59E0B]",
    PAID: "bg-[#10B981]/10 text-[#10B981]",
    PROCESSING: "bg-[#3B82F6]/10 text-[#3B82F6]",
    SHIPPED: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
    DELIVERED: "bg-[#10B981]/10 text-[#10B981]",
    CANCELLED: "bg-[#EF4444]/10 text-[#EF4444]",
    COD_CONFIRMED: "bg-[#D4AF37]/10 text-[#D4AF37]",
  };
  const statusLabels: Record<string, string> = {
    PENDING: "Pendiente",
    PAID: "Pagado",
    PROCESSING: "En preparación",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
    COD_CONFIRMED: "Contraentrega",
  };

  return (
    <Link
      href={`/cuenta/pedidos?id=${order.id}`}
      className="block rounded-2xl bg-white border border-[#E5E5E7] p-4 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[12px] font-mono font-semibold text-[#1D1D1F]">
            {order.orderNumber}
          </p>
          <p className="text-[10px] text-[#86868B]">
            {new Date(order.createdAt).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[order.status] || statusColors.PENDING}`}>
          {statusLabels[order.status] || order.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-[#86868B] truncate flex-1">
          {order.items.map((i) => `${i.productTitle} ×${i.quantity}`).join(", ")}
        </p>
        <p className="text-[14px] font-bold text-[#1D1D1F] ml-3">
          {formatPEN(order.total)}
        </p>
      </div>
    </Link>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
  desc,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl bg-white border border-[#E5E5E7] p-4 hover:border-[#D4AF37]/30 transition-all"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F5F7] group-hover:bg-[#D4AF37]/10 transition-colors">
        <Icon className="h-5 w-5 text-[#1D1D1F] group-hover:text-[#D4AF37]" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#1D1D1F]">{label}</p>
        <p className="text-[11px] text-[#86868B]">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" strokeWidth={1.5} />
    </Link>
  );
}

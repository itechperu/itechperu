"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Clock, CheckCircle2, Truck } from "lucide-react";
import { formatPEN } from "@/lib/format";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  createdAt: string;
  items: { productTitle: string; quantity: number; grade: string }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/orders", { cache: "no-store" });
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
    load();
  }, []);

  const filtered = filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
        Pedidos
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        {orders.length} pedidos en total
      </p>

      {/* Filtros */}
      <div className="mt-5 flex flex-wrap gap-2">
        {["ALL", "PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "COD_CONFIRMED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
              filter === f
                ? "bg-[#1D1D1F] text-white"
                : "bg-white border border-[#E5E5E7] text-[#1D1D1F] hover:bg-[#F5F5F7]"
            }`}
          >
            {f === "ALL" ? "Todos" : f === "COD_CONFIRMED" ? "Contraentrega" : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="mt-4 space-y-3">
        {loading ? (
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-8 text-center">
            <div className="inline-flex h-8 w-8 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-8 text-center">
            <ShoppingCart className="h-10 w-10 mx-auto text-[#86868B]" strokeWidth={1.5} />
            <p className="text-[13px] font-semibold text-[#1D1D1F] mt-2">No hay pedidos</p>
            <p className="text-[12px] text-[#86868B]">No se encontraron pedidos con este filtro</p>
          </div>
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </motion.div>
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
    <div className="rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[#E5E5E7] bg-[#F5F5F7]">
        <div>
          <p className="text-[12px] font-mono font-semibold text-[#1D1D1F]">
            {order.orderNumber}
          </p>
          <p className="text-[10px] text-[#86868B]">
            {new Date(order.createdAt).toLocaleString("es-PE")}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${
            statusColors[order.status] || statusColors.PENDING
          }`}
        >
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      <div className="p-4 space-y-3">
        {/* Cliente */}
        <div className="grid sm:grid-cols-3 gap-3 text-[11px]">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-[#86868B] font-semibold">
              Cliente
            </p>
            <p className="text-[12px] font-medium text-[#1D1D1F]">{order.customerName}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-[#86868B] font-semibold">
              Correo
            </p>
            <p className="text-[11px] text-[#1D1D1F] truncate">{order.customerEmail}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-[#86868B] font-semibold">
              Celular
            </p>
            <p className="text-[11px] text-[#1D1D1F]">{order.customerPhone || "—"}</p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-1.5 pt-3 border-t border-[#E5E5E7]">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-[11px]">
              <span className="text-[#1D1D1F]">
                {item.productTitle} <span className="text-[#86868B]">· Grado {item.grade} · ×{item.quantity}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Total + Método */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E7]">
          <span className="text-[10px] text-[#86868B]">
            {order.paymentMethod === "MERCADO_PAGO"
              ? "Mercado Pago"
              : order.paymentMethod === "CASH_ON_DELIVERY"
                ? "Contraentrega"
                : order.paymentMethod}
          </span>
          <div className="text-right">
            <p className="text-[9px] text-[#86868B] uppercase tracking-wider">Total</p>
            <p className="text-[16px] font-bold text-[#1D1D1F]">{formatPEN(order.total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

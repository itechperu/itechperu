"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";
import { formatPEN } from "@/lib/format";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  items: { productTitle: string; quantity: number; grade: string; productImage: string | null }[];
}

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
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
    load();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
        Mis Pedidos
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        Historial completo de tus compras en itechperu.shop
      </p>

      <div className="mt-6 space-y-3">
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
              Cuando hagas tu primera compra, aparecerá aquí
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#1D1D1F] px-5 py-2 text-[12px] font-semibold text-white"
            >
              Ver catálogo <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
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
            {new Date(order.createdAt).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
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

      <div className="p-4 space-y-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {item.productImage && (
              <img
                src={item.productImage}
                alt={item.productTitle}
                className="h-12 w-12 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#1D1D1F] truncate">
                {item.productTitle}
              </p>
              <p className="text-[10px] text-[#86868B]">
                Grado {item.grade} · Cantidad {item.quantity}
              </p>
            </div>
            <span className="text-[12px] font-semibold text-[#1D1D1F]">
              {formatPEN(item.unitPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 border-t border-[#E5E5E7] bg-[#F5F5F7]">
        <span className="text-[11px] text-[#86868B]">
          {order.paymentMethod === "MERCADO_PAGO"
            ? "Mercado Pago"
            : order.paymentMethod === "CASH_ON_DELIVERY"
              ? "Contraentrega"
              : order.paymentMethod}
        </span>
        <div className="text-right">
          <p className="text-[10px] text-[#86868B]">Total</p>
          <p className="text-[16px] font-bold text-[#1D1D1F]">{formatPEN(order.total)}</p>
        </div>
      </div>
    </div>
  );
}

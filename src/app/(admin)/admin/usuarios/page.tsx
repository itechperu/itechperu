"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Shield, Calendar } from "lucide-react";
import { formatPEN } from "@/lib/format";

interface UserRow {
  id: string;
  name: string | null;
  email: string;
  role: string;
  phone: string | null;
  createdAt: string;
  _count: { orders: number };
  orders: { total: number }[];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/users", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
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
        Usuarios
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        {users.length} usuarios registrados
      </p>

      <div className="mt-5 rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex h-8 w-8 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="h-10 w-10 mx-auto text-[#86868B]" strokeWidth={1.5} />
            <p className="text-[13px] font-semibold text-[#1D1D1F] mt-2">No hay usuarios</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F5F7] border-b border-[#E5E5E7]">
                <tr>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                    Usuario
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold hidden sm:table-cell">
                    Rol
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold hidden md:table-cell">
                    Pedidos
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold hidden md:table-cell">
                    Total gastado
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold hidden lg:table-cell">
                    Registro
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const totalSpent = u.orders.reduce((sum, o) => sum + o.total, 0);
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-[#E5E5E7] last:border-0 hover:bg-[#F5F5F7] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D1D1F] text-[11px] font-bold text-white">
                            {(u.name || u.email).charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold text-[#1D1D1F] truncate">
                              {u.name || "Sin nombre"}
                            </p>
                            <p className="text-[10px] text-[#86868B] truncate flex items-center gap-1">
                              <Mail className="h-2.5 w-2.5" strokeWidth={1.5} />
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                            u.role === "ADMIN" || u.role === "SUPER_ADMIN"
                              ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                              : "bg-[#F5F5F7] text-[#86868B]"
                          }`}
                        >
                          <Shield className="h-2.5 w-2.5" strokeWidth={1.5} />
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-[11px] font-semibold text-[#1D1D1F]">
                          {u._count.orders}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-[11px] font-bold text-[#D4AF37]">
                          {formatPEN(totalSpent)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-[10px] text-[#86868B] flex items-center gap-1">
                          <Calendar className="h-2.5 w-2.5" strokeWidth={1.5} />
                          {new Date(u.createdAt).toLocaleDateString("es-PE")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

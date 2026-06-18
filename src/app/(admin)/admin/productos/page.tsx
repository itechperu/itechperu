"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Box, Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { formatPEN } from "@/lib/format";

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  basePrice: number;
  stock: number;
  isActive: boolean;
  images: string;
  soldCount: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/products", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#1D1D1F]">
            Productos
          </h1>
          <p className="text-[13px] text-[#86868B] mt-1">
            {products.length} productos en el catálogo
          </p>
        </div>
        <Link
          href="/admin/productos?action=new"
          className="flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 py-2 text-[12px] font-semibold text-white"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Nuevo
        </Link>
      </div>

      {/* Search */}
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-white border border-[#E5E5E7] px-3 py-2">
        <Search className="h-4 w-4 text-[#86868B]" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Buscar producto…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-[13px] text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
        />
      </div>

      {/* Lista */}
      <div className="mt-4 rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex h-8 w-8 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
            <p className="text-[12px] text-[#86868B] mt-2">Cargando productos…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Box className="h-10 w-10 mx-auto text-[#86868B]" strokeWidth={1.5} />
            <p className="text-[13px] font-semibold text-[#1D1D1F] mt-2">
              No hay productos
            </p>
            <p className="text-[12px] text-[#86868B]">
              {search ? "Prueba con otra búsqueda" : "Crea tu primer producto"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F5F7] border-b border-[#E5E5E7]">
                <tr>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                    Producto
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold hidden sm:table-cell">
                    Categoría
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                    Precio
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold hidden sm:table-cell">
                    Stock
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold">
                    Estado
                  </th>
                  <th className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-[#86868B] font-semibold text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const images = JSON.parse(p.images || "[]") as string[];
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-[#E5E5E7] last:border-0 hover:bg-[#F5F5F7] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          {images[0] && (
                            <img
                              src={images[0]}
                              alt={p.title}
                              className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold text-[#1D1D1F] line-clamp-1">
                              {p.title}
                            </p>
                            <p className="text-[10px] text-[#86868B] font-mono">
                              {p.id.substring(0, 8)}…
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-[11px] text-[#1D1D1F]">{p.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[12px] font-bold text-[#1D1D1F]">
                          {formatPEN(p.basePrice)}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`text-[11px] font-semibold ${p.stock > 5 ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                            p.isActive
                              ? "bg-[#10B981]/10 text-[#10B981]"
                              : "bg-[#EF4444]/10 text-[#EF4444]"
                          }`}
                        >
                          {p.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/productos/${p.slug}`}
                            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#E5E5E7] transition-colors"
                            aria-label="Ver producto"
                          >
                            <Eye className="h-3.5 w-3.5 text-[#86868B]" strokeWidth={1.5} />
                          </Link>
                          <button
                            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#E5E5E7] transition-colors"
                            aria-label="Editar producto"
                          >
                            <Pencil className="h-3.5 w-3.5 text-[#86868B]" strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(`¿Eliminar "${p.title}"?`)) return;
                              await fetch(`/api/admin/products?id=${p.id}`, { method: "DELETE" });
                              setProducts((prev) => prev.filter((x) => x.id !== p.id));
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[#EF4444]/10 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-[#EF4444]" strokeWidth={1.5} />
                          </button>
                        </div>
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

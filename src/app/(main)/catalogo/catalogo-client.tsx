"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star, ChevronDown } from "lucide-react";
import { formatPEN, type Product } from "@/data/products";
import { BreadcrumbsDeluxe } from "@/components/deluxe/breadcrumbs-deluxe";

interface CatalogoClientProps {
  products: Product[];
}

const CATEGORIES = ["Todos", "iPad", "MacBook", "Laptop", "Ropa", "Accesorio"];
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor calificados" },
  { value: "sold", label: "Más vendidos" },
];

export function CatalogoClient({ products }: CatalogoClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevance");

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        `${p.title} ${p.brand} ${p.model} ${p.subtitle}`.toLowerCase().includes(q)
      );
    }

    if (category !== "Todos") {
      result = result.filter((p) => p.category === category);
    }

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.basePrice - b.basePrice); break;
      case "price-desc": result.sort((a, b) => b.basePrice - a.basePrice); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "sold": result.sort((a, b) => b.soldCount - a.soldCount); break;
    }

    return result;
  }, [products, search, category, sortBy]);

  return (
    <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
      <BreadcrumbsDeluxe items={[{ name: "Inicio", href: "/" }, { name: "Catálogo" }]} />

      <div className="max-w-2xl mb-6">
        <h1 className="text-[28px] lg:text-[40px] font-bold tracking-tight text-[var(--text-primary)]">
          Catálogo Deluxe
        </h1>
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"} · Verificados · Garantía real · Envío a todo Perú
        </p>
      </div>

      {/* Buscador + filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-2.5">
          <Search className="h-4 w-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Buscar iPad, MacBook, laptop…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none flex items-center gap-2 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-2.5 text-[13px] font-medium text-[var(--text-primary)] pr-10 focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] pointer-events-none" strokeWidth={1.5} />
        </div>
      </div>

      {/* Pills de categoría */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold transition-colors ${
              category === cat
                ? "bg-[#1D1D1F] text-white dark:bg-[#D4AF37] dark:text-[#1D1D1F]"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]"
            }`}
          >
            {cat === "Todos" ? "Todos" : cat === "iPad" ? "iPads" : cat === "MacBook" ? "MacBooks" : cat + "s"}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[14px] font-semibold text-[var(--text-primary)]">Sin resultados</p>
          <p className="text-[12px] text-[var(--text-secondary)] mt-1">Prueba con otra búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
            >
              <Link
                href={`/producto/${p.slug}`}
                className="group block rounded-3xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-color)] hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
                  <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-2 left-2 rounded-full bg-[#D4AF37] px-2 py-0.5 text-[9px] font-bold text-white">GRADO A+</span>
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-black/50 backdrop-blur-md px-1.5 py-0.5">
                    <Star className="h-2.5 w-2.5 fill-[#D4AF37] text-[#D4AF37]" strokeWidth={1.5} />
                    <span className="text-[9px] font-bold text-white">{p.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="p-3 lg:p-4">
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider font-medium">{p.category}</p>
                  <h2 className="mt-0.5 text-[12px] lg:text-[14px] font-semibold text-[var(--text-primary)] line-clamp-2 min-h-[32px] lg:min-h-[40px]">{p.title}</h2>
                  <p className="mt-1.5 lg:mt-2 text-[14px] lg:text-[18px] font-bold text-[var(--text-primary)]">{formatPEN(p.basePrice)}</p>
                  <p className="text-[9px] lg:text-[10px] text-[var(--text-secondary)] mt-0.5">O 12 cuotas de {formatPEN(Math.round(p.basePrice / 12))}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

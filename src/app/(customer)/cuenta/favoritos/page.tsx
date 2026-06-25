"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ChevronRight } from "lucide-react";
import { formatPEN } from "@/lib/format";

interface Favorite {
  id: string;
  productId: string;
  product: {
    id: string;
    slug: string;
    title: string;
    basePrice: number;
    images: string;
    isActive: boolean;
  };
}

export default function CustomerFavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/customer/favorites", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setFavorites(data.favorites || []);
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
        Mis Favoritos
      </h1>
      <p className="text-[13px] text-[#86868B] mt-1">
        Productos que has guardado para después
      </p>

      <div className="mt-6">
        {loading ? (
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-8 text-center">
            <div className="inline-flex h-8 w-8 border-2 border-[#E5E5E7] border-t-[#D4AF37] rounded-full animate-spin" />
          </div>
        ) : favorites.length === 0 ? (
          <div className="rounded-2xl bg-white border border-[#E5E5E7] p-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F7] mb-3">
              <Heart className="h-6 w-6 text-[#86868B]" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-[#1D1D1F]">
              No tienes favoritos aún
            </p>
            <p className="text-[12px] text-[#86868B] mt-1">
              Toca el corazón en cualquier producto para guardarlo aquí
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 mt-4 rounded-full bg-[#1D1D1F] px-5 py-2 text-[12px] font-semibold text-white"
            >
              Explorar catálogo <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {favorites.map((fav) => {
              const images = JSON.parse(fav.product.images || "[]") as string[];
              return (
                <Link
                  key={fav.id}
                  href={`/productos/${fav.product.slug}`}
                  className="group rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-[#F5F5F7]">
                    {images[0] && (
                      <img
                        src={images[0]}
                        alt={fav.product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[12px] font-semibold text-[#1D1D1F] line-clamp-2 leading-tight">
                      {fav.product.title}
                    </p>
                    <p className="text-[14px] font-bold text-[#D4AF37] mt-1">
                      {formatPEN(fav.product.basePrice)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

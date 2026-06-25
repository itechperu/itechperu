"use client";

import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { formatPEN, type Product, type ProductGrade } from "@/data/products";

interface MobileStickyBarProps {
  product: Product;
  selectedGrade: ProductGrade;
  quantity: number;
  onAddToCart: () => void;
}

/**
 * MobileStickyBar — Barra fija inferior en mobile con precio + CTA.
 * Visible solo en < lg. Se oculta al hacer scroll hacia arriba.
 */
export function MobileStickyBar({ product, selectedGrade, quantity, onAddToCart }: MobileStickyBarProps) {
  const currentGrade = product.grades.find((g) => g.grade === selectedGrade) ?? product.grades[0];
  const price = (product.basePrice + currentGrade.priceModifier) * quantity;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border-color)] shadow-[0_-4px_30px_rgb(0,0,0,0.08)]"
    >
      <div className="flex items-center gap-3 p-3 pb-safe">
        {/* Precio */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-bold text-[var(--text-primary)]">{formatPEN(price)}</span>
            <span className="flex items-center gap-0.5 text-[10px] text-[#10B981] font-medium">
              <CheckCircle2 className="h-3 w-3" strokeWidth={2} /> Stock
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-secondary)]">Grado {selectedGrade} · {currentGrade.warranty}</p>
        </div>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/51987654321?text=Hola%2C%20quiero%20el%20${encodeURIComponent(product.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#25D366]/10 flex-shrink-0"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5 text-[#25D366]" strokeWidth={1.5} />
        </a>

        {/* Agregar */}
        <button
          onClick={onAddToCart}
          className="flex items-center gap-1.5 rounded-2xl bg-[#1D1D1F] px-5 py-3 text-[13px] font-semibold text-white flex-shrink-0"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          Agregar
        </button>
      </div>
    </motion.div>
  );
}

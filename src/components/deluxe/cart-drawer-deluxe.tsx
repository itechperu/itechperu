"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/use-cart";
import { formatPEN } from "@/data/products";

/**
 * CartDrawerDeluxe — Drawer lateral del carrito
 *
 * Se abre automáticamente al agregar productos al carrito.
 * Muestra items, cantidades, subtotal, envío y total.
 * Botón "Finalizar compra" lleva a /checkout.
 */
export function CartDrawerDeluxe() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShipping,
    getTotal,
    getTotalItems,
  } = useCart();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 z-[100] w-full max-w-md bg-[var(--bg-primary)] shadow-[0_0_60px_rgb(0,0,0,0.2)] flex flex-col"
            role="dialog"
            aria-label="Carrito de compras"
          >
            {/* Header */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D1D1F]">
                  <ShoppingBag className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold tracking-tight text-[var(--text-primary)]">
                    Tu Carrito
                  </h2>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    {totalItems} {totalItems === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5 text-[var(--text-primary)]" strokeWidth={1.5} />
              </button>
            </header>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-secondary)] mb-3">
                    <ShoppingBag className="h-7 w-7 text-[var(--text-secondary)]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] font-semibold text-[var(--text-primary)]">
                    Tu carrito está vacío
                  </p>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1 max-w-[200px]">
                    Explora nuestro catálogo de tecnología premium reacondicionada
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-4 rounded-full bg-[#1D1D1F] px-5 py-2 text-[12px] font-semibold text-white tap-scale"
                  >
                    Ver catálogo
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <motion.li
                      key={`${item.productId}-${item.grade}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="flex gap-3 rounded-2xl bg-[var(--bg-secondary)] p-3"
                    >
                      {/* Image */}
                      <div className="flex-shrink-0 h-16 w-16 rounded-xl overflow-hidden bg-[var(--bg-primary)]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[var(--text-primary)] leading-tight line-clamp-2">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center rounded-full bg-[#D4AF37]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#D4AF37]">
                            Grado {item.grade}
                          </span>
                          <span className="text-[11px] text-[var(--text-secondary)]">
                            {formatPEN(item.unitPrice)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 rounded-full bg-[var(--bg-primary)] p-0.5">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.grade, item.quantity - 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
                              aria-label="Disminuir"
                            >
                              <Minus className="h-3 w-3 text-[var(--text-primary)]" strokeWidth={2} />
                            </button>
                            <span className="w-6 text-center text-[12px] font-semibold text-[var(--text-primary)]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.grade, item.quantity + 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
                              aria-label="Aumentar"
                            >
                              <Plus className="h-3 w-3 text-[var(--text-primary)]" strokeWidth={2} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productId, item.grade)}
                            className="text-[var(--text-secondary)] hover:text-[#EF4444] transition-colors p-1"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="flex flex-col items-end justify-between">
                        <span className="text-[13px] font-bold text-[var(--text-primary)]">
                          {formatPEN(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer con totales */}
            {items.length > 0 && (
              <footer className="border-t border-[var(--border-color)] px-5 py-4 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[var(--text-secondary)]">Subtotal</span>
                    <span className="font-medium text-[var(--text-primary)]">{formatPEN(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[var(--text-secondary)]">Envío</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {shipping === 0 ? (
                        <span className="text-[#10B981]">Gratis</span>
                      ) : (
                        formatPEN(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--border-color)]">
                    <span className="text-[14px] font-semibold text-[var(--text-primary)]">Total</span>
                    <span className="text-[18px] font-bold text-[var(--text-primary)]">
                      {formatPEN(total)}
                    </span>
                  </div>
                </div>

                {subtotal < 150000 && subtotal > 0 && (
                  <p className="text-[10px] text-[var(--text-secondary)] text-center bg-[var(--bg-secondary)] rounded-lg py-1.5 px-2">
                    💡 Agrega {formatPEN(150000 - subtotal)} más para envío gratis
                  </p>
                )}

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group flex items-center justify-center gap-2 w-full rounded-2xl bg-[#1D1D1F] px-4 py-3.5 text-[14px] font-semibold text-white tap-scale hover:bg-[#1D1D1F]/90 transition-colors"
                >
                  Finalizar compra
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  image: string;
  grade: "A+" | "A" | "B";
  unitPrice: number; // en centavos
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  // Acciones
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, grade: string) => void;
  updateQuantity: (productId: string, grade: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  // Getters
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.grade === item.grade
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.grade === item.grade
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true, // Abrir el drawer al agregar
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),

      removeItem: (productId, grade) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.grade === grade)
          ),
        })),

      updateQuantity: (productId, grade, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.grade === grade
                ? { ...i, quantity: Math.max(1, Math.min(9, qty)) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),

      getShipping: () => {
        const subtotal = get().getSubtotal();
        // Envío gratis sobre S/ 1,500, sino S/ 15
        if (subtotal === 0) return 0;
        return subtotal >= 150000 ? 0 : 1500;
      },

      getTotal: () => get().getSubtotal() + get().getShipping(),
    }),
    {
      name: "itechperu-cart",
      // No persistir isOpen
      partialize: (state) => ({ items: state.items }),
    }
  )
);

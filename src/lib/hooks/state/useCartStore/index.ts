'use client';

import { create } from 'zustand';
import { ICartState } from '../../../types/cart';
import { persist } from 'zustand/middleware';

export const useCartStore = create<ICartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);

          if (exists)
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };

          return { items: [...state.items, item] };
        }),
      decrement: (id) =>
        set((state) => {
          const exists = state.items.find((i) => i.id === id);

          if (exists) {
            return {
              items: state.items
                .map((i) =>
                  i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
                )
                .filter((i) => i.quantity > 0),
            };
          }

          return state;
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'cart',
    },
  ),
);

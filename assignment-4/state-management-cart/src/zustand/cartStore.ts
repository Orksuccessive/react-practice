import { create } from "zustand";

import type {
  CartItem,
  Product,
} from "../types/cart";

interface CartStore {
  items: CartItem[];

  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
}

export const useCartStore = create<CartStore>(
  (set) => ({
    items: [],

    addItem: (product) =>
      set((state) => {
        const existingItem =
          state.items.find(
            (item) => item.id === product.id
          );

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
            ),
          };
        }

        return {
          items: [
            ...state.items,
            {
              ...product,
              quantity: 1,
            },
          ],
        };
      }),

    removeItem: (id) =>
      set((state) => ({
        items: state.items.filter(
          (item) => item.id !== id
        ),
      })),

    increase: (id) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        ),
      })),

    decrease: (id) =>
      set((state) => ({
        items: state.items
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) => item.quantity > 0
          ),
      })),
  })
);
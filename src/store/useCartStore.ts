import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),
      removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      incrementItem: (productId: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decrementItem: (productId: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // Name of the storage item in local storage
      getStorage: () => localStorage, // Store in local storage
    }
  )
);

export default useCartStore;

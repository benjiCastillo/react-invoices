import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductsStore = create(
  persist(
    (set, get) => ({
      products: [],

      // Setters
      setProducts: (product) => {
        const products = get().products;

        const productExists = products.find((p) => p.id === product.id);
        if (productExists) {
          const updatedProducts = products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          );
          set({ products: updatedProducts });
        } else {
          set({ products: [...products, { ...product, quantity: 1 }] });
        }
      },

      removeProduct: (productId) => {
        set({
          products: get().products.filter((p) => p.id !== productId),
        });
      },

      updateProductNote: (productId, note) => {
        const updated = get().products.map((p) =>
          p.id === productId
            ? {
                ...p,
                additional_data: { ...p.additional_data, note },
              }
            : p
        );
        set({ products: updated });
      },

      updateProductQuantity: (productId, quantity) => {
        const updated = get().products.map((p) =>
          p.id === productId ? { ...p, quantity } : p
        );
        set({ products: updated });
      },

      resetProducts: () =>
        set({
          products: [],
        }),
      // Getters
      getQuantity: () =>
        get().products.reduce((acc, product) => acc + product.quantity, 0),
      getTotal: () =>
        get().products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        ),
    }),
    {
      name: "products-storage",
      partialize: (state) => ({
        products: state.products,
      }),
    }
  )
);

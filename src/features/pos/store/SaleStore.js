import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSaleStore = create(
  persist(
    (set, get) => ({
      sale: {
        exception: false,
        exceptionDisabled: false,
        cash_box_id: null,
      },

      setSale: (sale) => set({ sale }),
      setException: (exception) => set({ sale: { ...sale, exception } }),
      setCashBoxId: (cash_box_id) => set({ sale: { ...sale, cash_box_id } }),
      resetSale: () =>
        set({
          sale: {
            exception: false,
            exceptionDisabled: false,
            cash_box_id: null,
          },
        }),

      getException: () => get().sale.exception,
      getExceptionDisabled: () => get().sale.exceptionDisabled,
      getCashBoxId: () => get().sale.cash_box_id,
    }),
    {
      name: "sale-storage",
      partialize: (state) => ({
        sale: state.sale,
      }),
    }
  )
);

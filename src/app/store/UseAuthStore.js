// src/store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      setUser: (userData, access_token) => set({ user: userData, access_token }),
      logout: () => set({ user: null, access_token: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        access_token: state.access_token,
        user: state.user,
      }),
    }
  )
);

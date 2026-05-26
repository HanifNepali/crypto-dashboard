import { create } from "zustand";

type Theme = "light" | "dark";

interface UIState {
  theme: Theme;
  selectedCoinId: string;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSelectedCoinId: (coinId: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: "dark",
  selectedCoinId: "bitcoin",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
  setSelectedCoinId: (coinId) => set({ selectedCoinId: coinId }),
}));

import { THEME_DARK, THEME_LIGHT } from "@/constants.ts/app";
import { create } from "zustand";

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

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
  toggleTheme: () =>
    set({ theme: get().theme === THEME_DARK ? THEME_LIGHT : THEME_DARK }),
  setSelectedCoinId: (coinId) => set({ selectedCoinId: coinId }),
}));

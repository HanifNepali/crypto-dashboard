import { THEME_DARK, THEME_LIGHT } from "@/lib/constants/app";
import { create } from "zustand";

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

const INITIAL_THEME: Theme = THEME_DARK;
const INITIAL_COIN_ID = "bitcoin";

interface UIState {
  theme: Theme;
  selectedCoinId: string;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSelectedCoinId: (coinId: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: INITIAL_THEME,
  selectedCoinId: INITIAL_COIN_ID,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set({ theme: get().theme === THEME_DARK ? THEME_LIGHT : THEME_DARK }),
  setSelectedCoinId: (coinId) => set({ selectedCoinId: coinId }),
}));

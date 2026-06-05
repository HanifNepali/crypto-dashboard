import { THEME_DARK, THEME_LIGHT } from '@/lib/constants/app';
import { create } from 'zustand';

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

const INITIAL_COIN_ID = 'bitcoin';
const THEME_STORAGE_KEY = 'coingecko-dashboard-theme';

interface UIState {
  theme: Theme;
  selectedCoinId: string;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSelectedCoinId: (coinId: string) => void;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME_LIGHT || stored === THEME_DARK) return stored;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? THEME_DARK : THEME_LIGHT;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: getInitialTheme(),
  selectedCoinId: INITIAL_COIN_ID,
  setTheme: (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    set({ theme });
  },
  toggleTheme: () => {
    const next = get().theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    localStorage.setItem(THEME_STORAGE_KEY, next);
    set({ theme: next });
  },
  setSelectedCoinId: (coinId) => set({ selectedCoinId: coinId }),
}));

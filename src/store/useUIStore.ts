import { THEME_DARK, THEME_LIGHT } from '@/lib/constants/app';
import { create } from 'zustand';

type Theme = typeof THEME_LIGHT | typeof THEME_DARK;

const INITIAL_COIN_ID = 'bitcoin';
const THEME_STORAGE_KEY = 'coingecko-dashboard-theme';
const SIDEBAR_STORAGE_KEY = 'coingecko-dashboard-sidebar-collapsed';

interface UIState {
  theme: Theme;
  selectedCoinId: string;
  sidebarCollapsed: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSelectedCoinId: (coinId: string) => void;
  toggleSidebar: () => void;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME_LIGHT || stored === THEME_DARK) return stored;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? THEME_DARK : THEME_LIGHT;
}

function getInitialSidebarCollapsed(): boolean {
  return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'false';
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: getInitialTheme(),
  selectedCoinId: INITIAL_COIN_ID,
  sidebarCollapsed: getInitialSidebarCollapsed(),
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
  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
    set({ sidebarCollapsed: next });
  },
}));

import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";
import { THEME_DARK } from "@/lib/constants/app";

export function useThemeSync() {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(THEME_DARK, theme === THEME_DARK);
  }, [theme]);
}

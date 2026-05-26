import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";

export function useThemeSync() {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
}

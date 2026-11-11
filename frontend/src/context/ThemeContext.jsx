/* oxlint-disable react/only-export-components */
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const THEME_STORAGE_KEY = "todoflow_theme_mode";

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
    } catch {
      // Fallback
    }
    return "light";
  });

  const isDarkMode = themeMode === "dark";

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignore write errors
    }

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#141414";
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "rgba(0, 0, 0, 0.88)";
    }
  }, [themeMode, isDarkMode]);

  function toggleTheme() {
    setThemeMode((previousMode) =>
      previousMode === "light" ? "dark" : "light"
    );
  }

  function setTheme(mode) {
    if (mode === "dark" || mode === "light") {
      setThemeMode(mode);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDarkMode,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;

"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<IThemeContext | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");
  //load theme and style page
  useEffect(() => {
    if (typeof window !== undefined) {
      const fetchTheme = localStorage.getItem("theme");

      if (fetchTheme) {
        setTheme(fetchTheme);
        document.documentElement.classList.add(fetchTheme);
      }
    } else {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newTheme = isDark ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.classList.add(newTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Context not found");
  return context;
};

export default ThemeProvider;

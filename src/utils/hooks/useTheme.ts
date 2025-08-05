import { useState, useEffect } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("sociogram-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Update document class and localStorage when theme changes
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sociogram-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sociogram-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
}

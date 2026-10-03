"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    const initialTheme = storedTheme ?? (prefersLight ? "light" : "dark");

    setTheme(initialTheme);

    document.documentElement.classList.toggle(
      "light",
      initialTheme === "light",
    );
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"
      }
      className=" inline-flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) bg-(--bg-2) text-(--muted) transition hover:border-(--border-2) hover:text-(--text)"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

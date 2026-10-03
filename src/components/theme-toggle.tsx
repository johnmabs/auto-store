"use client";

import { useEffect, useState } from "react";

import {
  isThemePreference,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === "system") {
    return getSystemTheme();
  }

  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);

  const root = document.documentElement;

  root.classList.remove("light", "dark");

  root.classList.add(resolved);

  root.dataset.theme = resolved;

  root.dataset.themePreference = preference;
}

export function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    const initial = isThemePreference(stored) ? stored : "system";

    setPreference(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    function handleChange() {
      if (preference === "system") {
        applyTheme("system");
      }
    }

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [preference]);

  function setTheme(next: ThemePreference) {
    setPreference(next);

    localStorage.setItem(THEME_STORAGE_KEY, next);

    applyTheme(next);
  }

  return (
    <div
      className="inline-flex items-center rounded-lg border border-(--border) bg-(--bg-2) p-1"
      aria-label="Choisir le thème"
    >
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-pressed={preference === "system"}
        className="rounded-md px-2.5 py-1.5 text-xs text-(--muted) transition aria-pressed:bg-(--surface) aria-pressed:text-(--text)"
      >
        Auto
      </button>

      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={preference === "light"}
        className="rounded-md px-2.5 py-1.5 text-xs text-(--muted) transition aria-pressed:bg-(--surface) aria-pressed:text-(--text)"
      >
        ☀
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={preference === "dark"}
        className="rounded-md px-2.5 py-1.5 text-xs text-(--muted) transition aria-pressed:bg-(--surface) aria-pressed:text-(--text)"
      >
        ☾
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function PublicMobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="rounded-lg border border-dark-700 px-3 py-2 text-xs uppercase tracking-wider text-dark-200"
      >
        {open ? "Fermer" : "Menu"}
      </button>

      {open && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-dark-800 bg-dark-950"
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {[
              ["Accueil", "/"],
              ["Véhicules", "/vehicles"],
              ["Disponibles au Congo", "/vehicles?location=IN_CONGO"],
              ["En transit", "/vehicles?location=IN_TRANSIT"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-dark-800 py-4 text-sm uppercase tracking-wider text-dark-300 last:border-0 hover:text-gold-500"
              >
                {label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      )}
    </div>
  );
}

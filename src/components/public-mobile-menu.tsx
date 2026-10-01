"use client";

import Link from "next/link";
import { useState } from "react";

export function PublicMobileMenu() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="public-mobile-navigation"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="rounded-lg border px-3 py-2 text-sm"
      >
        {open ? "Fermer" : "Menu"}
      </button>

      {open && (
        <div
          id="public-mobile-navigation"
          className="absolute left-0 top-full z-50 w-full border-b bg-white shadow-sm"
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4 text-sm">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-neutral-100"
            >
              Accueil
            </Link>

            <Link
              href="/vehicles"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-neutral-100"
            >
              Véhicules
            </Link>

            <Link
              href="/vehicles?location=IN_CONGO"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-neutral-100"
            >
              Disponibles au Congo
            </Link>

            <Link
              href="/vehicles?location=IN_TRANSIT"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 hover:bg-neutral-100"
            >
              En transit
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

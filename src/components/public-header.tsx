import Link from "next/link";

import { PublicMobileMenu } from "@/components/public-mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.12em] text-(--text)"
        >
          AUTO
          <span className="text-(--gold)">STORE</span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className=" hidden items-center gap-8 lg:flex  text-xs font-medium uppercase tracking-[0.12em] text-(--muted) transition hover:text-(--gold)"
        >
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.12em] text-(--muted) transition hover:text-(--gold)"
          >
            Accueil
          </Link>

          <Link
            href="/vehicles"
            className="text-xs font-medium uppercase tracking-[0.12em] text-(--muted) transition hover:text-(--gold)"
          >
            Véhicules
          </Link>

          <Link
            href="/vehicles?location=IN_CONGO"
            className="text-xs font-medium uppercase tracking-[0.12em] text-(--muted) transition hover:text-(--gold)"
          >
            Au Congo
          </Link>

          <Link
            href="/vehicles?location=IN_TRANSIT"
            className="text-xs font-medium uppercase tracking-[0.12em] text-(--muted) transition hover:text-(--gold)"
          >
            En transit
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/vehicles"
            className="inline-flex items-center rounded-lg border border-(--gold) px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-(--gold) transition hover:bg-(--gold) hover:text-(--bg)"
          >
            Voir le catalogue
          </Link>
        </div>

        <PublicMobileMenu />
      </div>
    </header>
  );
}

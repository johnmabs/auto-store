import Link from "next/link";

import { PublicMobileMenu } from "@/components/public-mobile-menu";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.12em] text-white"
        >
          AUTO
          <span className="text-gold-500">STORE</span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigation principale"
        >
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.12em] text-dark-300 transition hover:text-gold-500"
          >
            Accueil
          </Link>

          <Link
            href="/vehicles"
            className="text-xs font-medium uppercase tracking-[0.12em] text-dark-300 transition hover:text-gold-500"
          >
            Véhicules
          </Link>

          <Link
            href="/vehicles?location=IN_CONGO"
            className="text-xs font-medium uppercase tracking-[0.12em] text-dark-300 transition hover:text-gold-500"
          >
            Au Congo
          </Link>

          <Link
            href="/vehicles?location=IN_TRANSIT"
            className="text-xs font-medium uppercase tracking-[0.12em] text-dark-300 transition hover:text-gold-500"
          >
            En transit
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/vehicles"
            className="inline-flex items-center rounded-lg border border-gold-500/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold-400 transition hover:bg-gold-500 hover:text-dark-950"
          >
            Voir le catalogue
          </Link>
        </div>

        <PublicMobileMenu />
      </div>
    </header>
  );
}

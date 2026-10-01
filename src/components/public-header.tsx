import Link from "next/link";

import { PublicMobileMenu } from "@/components/public-mobile-menu";

export function PublicHeader() {
  return (
    <header className="relative border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Auto Store
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/" className="hover:text-neutral-600">
            Accueil
          </Link>

          <Link href="/vehicles" className="hover:text-neutral-600">
            Véhicules
          </Link>

          <Link
            href="/vehicles?location=IN_CONGO"
            className="hover:text-neutral-600"
          >
            Au Congo
          </Link>

          <Link
            href="/vehicles?location=IN_TRANSIT"
            className="hover:text-neutral-600"
          >
            En transit
          </Link>
        </nav>

        <PublicMobileMenu />
      </div>
    </header>
  );
}
